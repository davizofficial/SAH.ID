import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAgreements } from '../contexts/AgreementContext';
import { useWallet } from '../contexts/WalletContext';
import { useToast } from '../contexts/ToastContext';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import Loader2 from 'lucide-react/dist/esm/icons/loader-2';
import AlertCircle from 'lucide-react/dist/esm/icons/alert-circle';
import { Separator } from '@/components/ui/separator';

const PaymentConfirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAgreement, payAgreement } = useAgreements();
  const { idrxBalance, deductIDRX } = useWallet();
  const { showToast } = useToast();

  const [isProcessing, setIsProcessing] = useState(false);

  const agreement = getAgreement(id || '');

  if (!agreement) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in-up">
        <Card className="shadow-soft-card bg-card text-card-foreground">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">Kesepakatan tidak ditemukan</p>
            <Button
              onClick={() => navigate('/app/dashboard')}
              className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Kembali ke Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (agreement.status !== 'approved') {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in-up">
        <Card className="shadow-soft-card bg-card text-card-foreground">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="w-12 h-12 text-warning mx-auto mb-3" />
            <p className="text-foreground font-bold mb-2">Kesepakatan Belum Disetujui</p>
            <p className="text-muted-foreground mb-4">
              Kesepakatan harus disetujui oleh kedua pihak sebelum pembayaran dapat dilakukan
            </p>
            <Button
              onClick={() => navigate(`/agreement/${agreement.id}`)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Kembali ke Detail
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handlePayment = async () => {
    // Validate balance
    const balanceNum = parseFloat(idrxBalance.replace(/\./g, '').replace(/,/g, ''));
    const amountNum = parseFloat(agreement.amount.replace(/\./g, '').replace(/,/g, ''));
    
    if (balanceNum < amountNum) {
      showToast('Saldo IDRX tidak mencukupi', 'error');
      return;
    }

    setIsProcessing(true);

    try {
      // Show wallet confirmation message
      showToast('Membuka wallet untuk konfirmasi...', 'info');
      
      // Simulate wallet popup (2 seconds)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      showToast('Mengirim transaksi ke blockchain...', 'info');
      
      // Simulate blockchain transaction (3 seconds)
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Generate mock transaction hash
      const mockTxHash = '0x' + Math.random().toString(16).substr(2, 64);
      
      // Deduct IDRX from wallet
      deductIDRX(agreement.amount);
      
      // Mark agreement as paid
      payAgreement(agreement.id, mockTxHash);

      showToast('Pembayaran berhasil dikirim!', 'success');
      navigate(`/receipt/${agreement.id}`);
    } catch (error) {
      showToast('Pembayaran gagal', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      <Button
        variant="ghost"
        onClick={() => navigate(`/agreement/${agreement.id}`)}
        className="mb-6 bg-transparent text-foreground hover:bg-muted"
        disabled={isProcessing}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali
      </Button>

      <Card className="shadow-glow bg-card text-card-foreground border-0">
        <CardHeader className="border-b border-border/50 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-cyan-400 rounded-xl flex items-center justify-center shadow-button">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl text-foreground">Konfirmasi Pembayaran</CardTitle>
          </div>
          <CardDescription className="text-muted-foreground text-base">
            Periksa kembali detail kesepakatan sebelum melakukan pembayaran
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-8">
          <div className="space-y-4">
            <div className="bg-secondary/30 p-4 rounded-xl">
              <Label className="text-muted-foreground text-sm font-semibold">Judul Kesepakatan</Label>
              <p className="text-foreground font-bold text-lg mt-2">{agreement.title}</p>
            </div>

            <Separator />

            <div className="bg-secondary/30 p-4 rounded-xl">
              <Label className="text-muted-foreground text-sm font-semibold">Penerima</Label>
              <p className="text-foreground font-mono text-base mt-2">{shortenAddress(agreement.recipientAddress)}</p>
            </div>

            <div className="bg-gradient-to-r from-primary/5 to-cyan-50 border border-primary/20 p-6 rounded-xl">
              <Label className="text-muted-foreground text-sm font-semibold">Nominal Pembayaran</Label>
              <p className="text-foreground font-bold text-3xl mt-2">{agreement.amount} IDRX</p>
            </div>

            <div className="bg-secondary/30 p-4 rounded-xl">
              <Label className="text-muted-foreground text-sm font-semibold">Saldo Anda Saat Ini</Label>
              <p className="text-foreground font-bold text-2xl mt-2">{idrxBalance} IDRX</p>
              {parseFloat(idrxBalance.replace(/\./g, '').replace(/,/g, '')) < parseFloat(agreement.amount.replace(/\./g, '').replace(/,/g, '')) && (
                <p className="text-destructive text-sm mt-2 font-semibold">Saldo tidak mencukupi</p>
              )}
            </div>

            <div className="bg-secondary/30 p-4 rounded-xl">
              <Label className="text-muted-foreground text-sm font-semibold">Deskripsi</Label>
              <p className="text-foreground font-normal mt-2 leading-relaxed">{agreement.description}</p>
            </div>
          </div>

          <Separator />

          <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-base text-foreground font-bold mb-2">Perhatian Penting</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Setelah pembayaran dikonfirmasi, transaksi akan tercatat di blockchain Base dan tidak dapat dibatalkan.
                  Pastikan semua detail sudah benar sebelum melanjutkan.
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={handlePayment}
            disabled={isProcessing || parseFloat(idrxBalance.replace(/\./g, '').replace(/,/g, '')) < parseFloat(agreement.amount.replace(/\./g, '').replace(/,/g, ''))}
            className="w-full h-14 bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground hover:from-primary/90 hover:to-cyan-400 disabled:opacity-50 shadow-button rounded-xl font-bold text-lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                Memproses Pembayaran...
              </>
            ) : (
              'Konfirmasi & Bayar Sekarang'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentConfirmation;
