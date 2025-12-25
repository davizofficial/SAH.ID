import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useWallet } from '../contexts/WalletContext';
import { useAgreements } from '../contexts/AgreementContext';
import { useToast } from '../contexts/ToastContext';
import { generatePublicLink, type AgreementData } from '../utils/agreementEncoder';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import Loader2 from 'lucide-react/dist/esm/icons/loader-2';
import FileText from 'lucide-react/dist/esm/icons/file-text';

const CreateAgreement: React.FC = () => {
  const navigate = useNavigate();
  const { address, idrxBalance } = useWallet();
  const { createAgreement } = useAgreements();
  const { showToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    recipientAddress: '',
    amount: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    recipientAddress: '',
    amount: '',
    description: '',
  });

  const validateForm = () => {
    const newErrors = {
      title: '',
      recipientAddress: '',
      amount: '',
      description: '',
    };

    if (!formData.title.trim()) {
      newErrors.title = 'Judul kesepakatan wajib diisi';
    }

    if (!formData.recipientAddress.trim()) {
      newErrors.recipientAddress = 'Alamat wallet penerima wajib diisi';
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(formData.recipientAddress)) {
      newErrors.recipientAddress = 'Format alamat wallet tidak valid (harus 0x diikuti 40 karakter hex)';
    } else if (formData.recipientAddress.toLowerCase() === address?.toLowerCase()) {
      newErrors.recipientAddress = 'Alamat penerima tidak boleh sama dengan alamat Anda';
    }

    if (!formData.amount.trim()) {
      newErrors.amount = 'Nominal IDRX wajib diisi';
    } else {
      const amountNum = parseFloat(formData.amount.replace(/\./g, '').replace(/,/g, ''));
      const balanceNum = parseFloat(idrxBalance.replace(/\./g, '').replace(/,/g, ''));
      
      if (isNaN(amountNum) || amountNum <= 0) {
        newErrors.amount = 'Nominal harus berupa angka positif';
      } else if (amountNum > balanceNum) {
        newErrors.amount = `Saldo tidak mencukupi. Saldo Anda: ${idrxBalance} IDRX`;
      }
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi wajib diisi';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const agreementId = createAgreement({
        title: formData.title,
        recipientAddress: formData.recipientAddress,
        amount: formData.amount,
        description: formData.description,
        creatorAddress: address || '',
      });

      // Generate PUBLIC shareable link with embedded data
      const agreementData: AgreementData = {
        id: agreementId,
        title: formData.title,
        recipientAddress: formData.recipientAddress,
        amount: formData.amount,
        description: formData.description,
        creatorAddress: address || '',
        createdAt: new Date().toISOString(),
      };
      
      const shareLink = generatePublicLink(agreementData);
      
      // Show success message with link
      showToast('Kesepakatan berhasil dibuat!', 'success');
      
      // CRITICAL: Log share link with proper format
      console.log('');
      console.log('===== KESEPAKATAN BERHASIL DIBUAT =====');
      console.log('Agreement ID:', agreementId);
      console.log('Link:', shareLink);
      console.log('=======================================');
      console.log('');
      
      // Navigate to success page with share link (User A view)
      navigate(`/app/agreement-created/${agreementId}`);
    } catch (error) {
      showToast('Gagal membuat kesepakatan', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in-up">
      <Button
        variant="ghost"
        onClick={() => navigate('/app/dashboard')}
        className="mb-6 bg-secondary/50 text-foreground hover:bg-secondary rounded-xl"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali ke Dashboard
      </Button>

      <Card className="shadow-glow bg-card text-card-foreground border-0">
        <CardHeader className="border-b border-border/50 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-cyan-400 rounded-xl flex items-center justify-center shadow-button">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl text-foreground">Buat Kesepakatan Baru</CardTitle>
          </div>
          <CardDescription className="text-muted-foreground text-base">
            Isi detail kesepakatan yang akan dibuat dengan lengkap
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-foreground font-semibold text-base">
                Judul Kesepakatan
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Contoh: Pembayaran Jasa Desain Website"
                className={`h-12 bg-secondary/30 text-foreground border-input rounded-xl ${
                  errors.title ? 'border-destructive' : 'focus:border-primary'
                }`}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="recipientAddress" className="text-foreground font-semibold text-base">
                Alamat Wallet Penerima
              </Label>
              <Input
                id="recipientAddress"
                value={formData.recipientAddress}
                onChange={(e) => handleChange('recipientAddress', e.target.value.trim())}
                placeholder="0x1234567890abcdef1234567890abcdef12345678"
                className={`h-12 bg-secondary/30 text-foreground border-input rounded-xl font-mono text-sm ${
                  errors.recipientAddress ? 'border-destructive' : 'focus:border-primary'
                }`}
              />
              {errors.recipientAddress && (
                <p className="text-sm text-destructive">{errors.recipientAddress}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Format: 0x diikuti 40 karakter hexadecimal (0-9, a-f)
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="amount" className="text-foreground font-semibold text-base">
                Nominal IDRX
              </Label>
              <div className="relative">
                <Input
                  id="amount"
                  type="text"
                  value={formData.amount}
                  onChange={(e) => {
                    // Allow only numbers and commas
                    const value = e.target.value.replace(/[^\d,]/g, '');
                    handleChange('amount', value);
                  }}
                  placeholder="1,000,000"
                  className={`h-12 bg-secondary/30 text-foreground border-input rounded-xl ${
                    errors.amount ? 'border-destructive' : 'focus:border-primary'
                  }`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  IDRX
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                {errors.amount ? (
                  <p className="text-destructive">{errors.amount}</p>
                ) : (
                  <p className="text-muted-foreground">Saldo Anda: {idrxBalance} IDRX</p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="description" className="text-foreground font-semibold text-base">
                Deskripsi Singkat
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Jelaskan detail kesepakatan..."
                rows={5}
                className={`bg-secondary/30 text-foreground border-input rounded-xl ${
                  errors.description ? 'border-destructive' : 'focus:border-primary'
                }`}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground hover:from-primary/90 hover:to-cyan-400 disabled:opacity-50 shadow-button rounded-xl text-lg font-semibold mt-8"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                  Membuat Kesepakatan...
                </>
              ) : (
                'Buat Kesepakatan'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAgreement;
