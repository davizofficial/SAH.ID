import React, { createContext, useContext, useState, ReactNode } from 'react';
import { generatePublicLink, type AgreementData } from '../utils/agreementEncoder';

export interface Agreement {
  id: string;
  title: string;
  recipientAddress: string;
  amount: string;
  description: string;
  status: 'pending' | 'approved' | 'paid';
  creatorAddress: string;
  createdAt: Date;
  approvedAt?: Date;
  paidAt?: Date;
  transactionHash?: string;
}

interface AgreementContextType {
  agreements: Agreement[];
  createAgreement: (agreement: Omit<Agreement, 'id' | 'status' | 'createdAt'>) => string;
  getAgreement: (id: string) => Agreement | undefined;
  approveAgreement: (id: string) => void;
  payAgreement: (id: string, txHash: string) => void;
}

const AgreementContext = createContext<AgreementContextType | undefined>(undefined);

export const useAgreements = () => {
  const context = useContext(AgreementContext);
  if (!context) {
    throw new Error('useAgreements must be used within AgreementProvider');
  }
  return context;
};

interface AgreementProviderProps {
  children: ReactNode;
}

export const AgreementProvider: React.FC<AgreementProviderProps> = ({ children }) => {
  // Initialize with demo data immediately
  const demoAgreements: Agreement[] = [
    {
      id: 'tt1wgjnz1',
      title: 'Pembayaran Jasa Desain Website',
      recipientAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1',
      amount: '5,000,000',
      description: 'Pembayaran untuk jasa pembuatan website company profile dengan fitur responsive design, SEO optimization, dan integrasi payment gateway.',
      status: 'pending',
      creatorAddress: '0x1234567890abcdef1234567890abcdef12345678',
      createdAt: new Date(),
    },
    {
      id: 'heeht0dge',
      title: 'Pembayaran Konsultasi IT',
      recipientAddress: '0x8ba1f109551bD432803012645Hac136c22C57B',
      amount: '2,500,000',
      description: 'Konsultasi pengembangan sistem informasi manajemen untuk perusahaan retail.',
      status: 'approved',
      creatorAddress: '0x9876543210fedcba9876543210fedcba98765432',
      createdAt: new Date(Date.now() - 86400000),
      approvedAt: new Date(Date.now() - 43200000),
    },
    {
      id: 'irjqrpypd',
      title: 'Pembayaran Aplikasi Mobile',
      recipientAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      amount: '15,000,000',
      description: 'Pengembangan aplikasi mobile e-commerce dengan fitur payment gateway dan notifikasi push.',
      status: 'paid',
      creatorAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
      createdAt: new Date(Date.now() - 172800000),
      approvedAt: new Date(Date.now() - 129600000),
      paidAt: new Date(Date.now() - 86400000),
      transactionHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12',
    }
  ];

  const [agreements, setAgreements] = useState<Agreement[]>(() => {
    // CRITICAL: Load agreements from localStorage on init
    // This ensures public agreement links work across different browsers/sessions
    try {
      if (typeof window === 'undefined') return demoAgreements;
      
      const saved = localStorage.getItem('sah-agreements');
      
      if (!saved) {
        // First time: Initialize with demo data
        localStorage.setItem('sah-agreements', JSON.stringify(demoAgreements));
        console.log('');
        console.log('═══════════════════════════════════════════════════════');
        console.log('🎬 FIRST TIME INITIALIZATION');
        console.log('═══════════════════════════════════════════════════════');
        console.log('✅ Demo agreements created:', demoAgreements.length);
        console.log('📋 Available IDs:', demoAgreements.map(a => a.id).join(', '));
        console.log('═══════════════════════════════════════════════════════');
        console.log('');
        return demoAgreements;
      }
      
      // Parse existing agreements
      const parsed = JSON.parse(saved);
      console.log('');
      console.log('═══════════════════════════════════════════════════════');
      console.log('📂 LOADING AGREEMENTS FROM STORAGE');
      console.log('═══════════════════════════════════════════════════════');
      console.log('✅ Total agreements loaded:', parsed.length);
      console.log('📋 Agreement IDs:', parsed.map((a: any) => a.id).join(', '));
      console.log('═══════════════════════════════════════════════════════');
      console.log('');
      
      // Ensure dates are Date objects
      return parsed.map((a: any) => ({
        ...a,
        createdAt: new Date(a.createdAt),
        approvedAt: a.approvedAt ? new Date(a.approvedAt) : undefined,
        paidAt: a.paidAt ? new Date(a.paidAt) : undefined,
      }));
    } catch (error) {
      console.error('');
      console.error('═══════════════════════════════════════════════════════');
      console.error('❌ ERROR LOADING AGREEMENTS');
      console.error('═══════════════════════════════════════════════════════');
      console.error('Error:', error);
      console.error('Falling back to demo data');
      console.error('═══════════════════════════════════════════════════════');
      console.error('');
      return demoAgreements;
    }
  });

  // Save to localStorage whenever agreements change
  React.useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem('sah-agreements', JSON.stringify(agreements));
      console.log('💾 Saved agreements:', agreements.length);
    } catch (error) {
      console.error('❌ Error saving agreements:', error);
    }
  }, [agreements]);

  const createAgreement = (agreement: Omit<Agreement, 'id' | 'status' | 'createdAt'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newAgreement: Agreement = {
      ...agreement,
      id,
      status: 'pending',
      createdAt: new Date(),
    };
    
    console.log('');
    console.log('📝 Creating new agreement...');
    console.log('   - ID:', id);
    console.log('   - Title:', agreement.title);
    console.log('   - Amount:', agreement.amount);
    console.log('');
    
    setAgreements((prev) => {
      const updated = [...prev, newAgreement];
      console.log('✅ Agreement added to state');
      console.log('   - Total agreements:', updated.length);
      return updated;
    });
    
    // Generate public link with embedded data
    const agreementData: AgreementData = {
      id: newAgreement.id,
      title: newAgreement.title,
      recipientAddress: newAgreement.recipientAddress,
      amount: newAgreement.amount,
      description: newAgreement.description,
      creatorAddress: newAgreement.creatorAddress,
      createdAt: newAgreement.createdAt.toISOString(),
    };
    
    const publicLink = generatePublicLink(agreementData);
    
    console.log('');
    console.log('🔗 PUBLIC LINK GENERATED:');
    console.log('   - Link contains embedded data');
    console.log('   - Can be accessed from ANY browser/device');
    console.log('   - No backend required');
    console.log('');
    console.log('%c' + publicLink, 'color: #0EA5E9; font-size: 16px; font-weight: bold; background: #F0F9FF; padding: 10px; border-radius: 8px;');
    console.log('');
    
    return id;
  };

  const getAgreement = React.useCallback((id: string) => {
    if (!id) {
      console.warn('⚠️ getAgreement called with empty ID');
      return undefined;
    }
    
    console.log('🔍 Searching for agreement:', id);
    console.log('📚 Total agreements in context:', agreements.length);
    
    const found = agreements.find((agreement) => agreement.id === id);
    
    if (found) {
      console.log('✅ Agreement found:', found.title);
    } else {
      console.error('❌ Agreement NOT found');
      console.log('   - Requested ID:', id);
      console.log('   - Available IDs:', agreements.map(a => a.id).join(', '));
    }
    
    return found;
  }, [agreements]);

  const approveAgreement = (id: string) => {
    setAgreements((prev) =>
      prev.map((agreement) =>
        agreement.id === id
          ? { ...agreement, status: 'approved' as const, approvedAt: new Date() }
          : agreement
      )
    );
  };

  const payAgreement = (id: string, txHash: string) => {
    setAgreements((prev) =>
      prev.map((agreement) =>
        agreement.id === id
          ? { ...agreement, status: 'paid' as const, paidAt: new Date(), transactionHash: txHash }
          : agreement
      )
    );
  };

  return (
    <AgreementContext.Provider
      value={{
        agreements,
        createAgreement,
        getAgreement,
        approveAgreement,
        payAgreement,
      }}
    >
      {children}
    </AgreementContext.Provider>
  );
};
