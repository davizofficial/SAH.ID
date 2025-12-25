import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { WalletProvider } from './contexts/WalletContext';
import { ToastProvider } from './contexts/ToastContext';
import { AgreementProvider } from './contexts/AgreementContext';
import AppShell from './components/AppShell';
import LandingScreen from './screens/LandingScreen';
import Dashboard from './screens/Dashboard';
import CreateAgreement from './screens/CreateAgreement';
import AgreementCreatedSuccess from './screens/AgreementCreatedSuccess';
import PublicAgreementView from './screens/PublicAgreementView';
import PaymentConfirmation from './screens/PaymentConfirmation';
import PaymentSuccess from './screens/PaymentSuccess';
import Settings from './screens/Settings';
import History from './screens/History';

function App() {
  // Debug: Log when app mounts and on every route change
  React.useEffect(() => {
    console.log('');
    console.log('═══════════════════════════════════════════════════════');
    console.log('🚀 SAH.ID APP INITIALIZED');
    console.log('═══════════════════════════════════════════════════════');
    console.log('');
    console.log('🌐 URL Information:');
    console.log('   - Full URL:', window.location.href);
    console.log('   - Origin:', window.location.origin);
    console.log('   - Pathname:', window.location.pathname);
    console.log('   - Hash:', window.location.hash || '(none - landing page)');
    console.log('');
    
    // Parse hash to get route
    const hash = window.location.hash;
    if (hash) {
      const route = hash.replace('#', '');
      console.log('📌 Current Route:', route);
      console.log('');
      
      // Check if it's an agreement route (PUBLIC ACCESS)
      if (route.includes('/agreement/')) {
        const agreementId = route.split('/agreement/')[1];
        console.log('📄 PUBLIC AGREEMENT ACCESS');
        console.log('   - Agreement ID:', agreementId);
        console.log('   - Access Level: PUBLIC (no wallet required)');
        console.log('');
        
        // Check if agreement exists in localStorage
        const saved = localStorage.getItem('sah-agreements');
        if (saved) {
          try {
            const agreements = JSON.parse(saved);
            const found = agreements.find((a: any) => a.id === agreementId);
            
            if (found) {
              console.log('✅ Agreement Found:');
              console.log('   - Title:', found.title);
              console.log('   - Status:', found.status);
              console.log('   - Amount:', found.amount, 'IDRX');
            } else {
              console.warn('⚠️ Agreement Not Found');
              console.log('   - Requested ID:', agreementId);
              console.log('   - Available IDs:', agreements.map((a: any) => a.id).join(', '));
              console.log('');
              console.log('💡 Possible Solutions:');
              console.log('   1. Use demo agreement IDs: tt1wgjnz1, heeht0dge, irjqrpypd');
              console.log('   2. Create new agreement and use generated link');
              console.log('   3. Make sure URL format is: domain.com/#/agreement/id');
            }
          } catch (e) {
            console.error('❌ Error parsing localStorage:', e);
          }
        } else {
          console.warn('⚠️ No agreements in localStorage');
          console.log('   - Demo agreements will be initialized automatically');
          console.log('   - Try refreshing the page');
        }
      }
    }
    
    console.log('');
    console.log('═══════════════════════════════════════════════════════');
    console.log('');
  }, []);

  return (
    <Router>
      <WalletProvider>
        <AgreementProvider>
          <ToastProvider>
            <Routes>
              <Route path="/" element={<LandingScreen />} />
              {/* Public routes - accessible without wallet/session */}
              <Route path="/agreement/:id" element={<PublicAgreementView />} />
              <Route path="/receipt/:id" element={<PaymentSuccess />} />
              
              <Route path="/app" element={<AppShell />}>
                <Route index element={<Navigate to="/app/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="create" element={<CreateAgreement />} />
                <Route path="agreement-created/:id" element={<AgreementCreatedSuccess />} />
                <Route path="payment/:id" element={<PaymentConfirmation />} />
                <Route path="history" element={<History />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              
              {/* Catch all route */}
              <Route path="*" element={
                <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex items-center justify-center p-4">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-foreground mb-4">404 - Halaman Tidak Ditemukan</h1>
                    <p className="text-muted-foreground mb-6">Path: {window.location.pathname}</p>
                    <Button onClick={() => window.location.href = '/'}>
                      Kembali ke Beranda
                    </Button>
                  </div>
                </div>
              } />
            </Routes>
          </ToastProvider>
        </AgreementProvider>
      </WalletProvider>
    </Router>
  );
}

export default App;
