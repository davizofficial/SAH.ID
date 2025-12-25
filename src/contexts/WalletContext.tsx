import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  network: string;
  hasIDRX: boolean;
  idrxBalance: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  checkIDRXBalance: () => Promise<void>;
  deductIDRX: (amount: string) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [network] = useState('Base');
  const [hasIDRX, setHasIDRX] = useState(false);
  const [idrxBalance, setIdrxBalance] = useState<string>('0');

  const connectWallet = async () => {
    try {
      if (typeof window === 'undefined') return;
      
      const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
      setAddress(mockAddress);
      setIsConnected(true);
      
      localStorage.setItem('sah-wallet-address', mockAddress);
      console.log('Wallet connected:', mockAddress);
      
      setTimeout(() => {
        checkIDRXBalance();
      }, 1000);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnectWallet = () => {
    if (typeof window === 'undefined') return;
    
    setAddress(null);
    setIsConnected(false);
    setHasIDRX(false);
    setIdrxBalance('0');
    localStorage.removeItem('sah-wallet-address');
    localStorage.removeItem('sah-idrx-balance');
    console.log('Wallet disconnected');
    
    // Redirect ke halaman utama
    window.location.href = '/#/';
  };

  const checkIDRXBalance = async () => {
    try {
      if (typeof window === 'undefined') return;
      
      const savedBalance = localStorage.getItem('sah-idrx-balance');
      
      if (savedBalance) {
        const balanceNum = parseFloat(savedBalance);
        setHasIDRX(balanceNum > 0);
        setIdrxBalance(balanceNum.toLocaleString('id-ID'));
        console.log('IDRX Balance:', balanceNum.toLocaleString('id-ID'));
      } else {
        const randomBalance = Math.floor(Math.random() * (10000000 - 1000000) + 1000000);
        setHasIDRX(true);
        setIdrxBalance(randomBalance.toLocaleString('id-ID'));
        localStorage.setItem('sah-idrx-balance', randomBalance.toString());
        console.log('New IDRX Balance:', randomBalance.toLocaleString('id-ID'));
      }
    } catch (error) {
      console.error('Failed to check IDRX balance:', error);
      setHasIDRX(false);
      setIdrxBalance('0');
    }
  };

  const deductIDRX = (amount: string) => {
    if (typeof window === 'undefined') return;
    
    const currentBalance = parseFloat(idrxBalance.replace(/\./g, '').replace(/,/g, ''));
    const deductAmount = parseFloat(amount.replace(/\./g, '').replace(/,/g, ''));
    const newBalance = currentBalance - deductAmount;
    
    setIdrxBalance(newBalance.toLocaleString('id-ID'));
    setHasIDRX(newBalance > 0);
    localStorage.setItem('sah-idrx-balance', newBalance.toString());
    console.log('IDRX Deducted:', deductAmount.toLocaleString('id-ID'), '| New Balance:', newBalance.toLocaleString('id-ID'));
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const savedAddress = localStorage.getItem('sah-wallet-address');
    if (savedAddress) {
      setAddress(savedAddress);
      setIsConnected(true);
      checkIDRXBalance();
      console.log('Restored wallet session');
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        network,
        hasIDRX,
        idrxBalance,
        connectWallet,
        disconnectWallet,
        checkIDRXBalance,
        deductIDRX,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
