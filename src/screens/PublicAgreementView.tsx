import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { extractAgreementFromURL, type AgreementData } from '../utils/agreementEncoder';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAgreements } from '../contexts/AgreementContext';
import { useToast } from '../contexts/ToastContext';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import AlertCircle from 'lucide-react/dist/esm/icons/alert-circle';
import FileText from 'lucide-react/dist/esm/icons/file-text';
import Copy from 'lucide-react/dist/esm/icons/copy';
import ExternalLink from 'lucide-react/dist/esm/icons/external-link';
import Shield from 'lucide-react/dist/esm/icons/shield';
import Clock from 'lucide-react/dist/esm/icons/clock';
import Wallet from 'lucide-react/dist/esm/icons/wallet';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Globe from 'lucide-react/dist/esm/icons/globe';
import Info from 'lucide-react/dist/esm/icons/info';
import Lock from 'lucide-react/dist/esm/icons/lock';

const PublicAgreementView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { getAgreement, approveAgreement } = useAgreements();
  const { showToast } = useToast();

  const [recipientInput, setRecipientInput] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const agreement = useMemo(() => {
    const urlData = extractAgreementFromURL();
    if (urlData) {
      return {
        id: urlData.id,
        title: urlData.title,
        recipientAddress: urlData.recipientAddress,
        amount: urlData.amount,
        description: urlData.description,
        status: 'pending' as const,
        creatorAddress: urlData.creatorAddress,
        createdAt: new Date(urlData.createdAt),
      };
    }
    return getAgreement(id || '');
  }, [id, location.search, getAgreement]);

  if (!agreement) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg bg-white border border-slate-200">
          <CardContent className="pt-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Kesepakatan Tidak Ditemukan</h2>
            <p className="text-slate-600 mb-6">
              Link kesepakatan yang Anda akses tidak valid atau sudah tidak tersedia.
            </p>
            <Button
              onClick={() => window.location.href = '/'}
              className="bg-slate-900 text-white hover:bg-slate-800"
            >
              Kembali ke Beranda
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const shortenAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Berhasil disalin', 'success');
  };

  const validateRecipientAddress = () => {
    if (!recipientInput.trim()) return false;
    return recipientInput.toLowerCase() === agreement.recipientAddress.toLowerCase();
  };

  const handleApprove = async () => {
    if (!validateRecipientAddress()) {
      showToast('Alamat wallet tidak sesuai', 'error');
      return;
    }
    setIsValidating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      approveAgreement(agreement.id);
      showToast('Kesepakatan berhasil disetujui', 'success');
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      showToast('Gagal menyetujui kesepakatan', 'error');
    } finally {
      setIsValidating(false);
    }
  };

  const getStatusBadge = () => {
    switch (agreement.status) {
      case 'pending':
        return (
          <Badge className="bg-amber-100 text-amber-800 border-amber-300 px-3 py-1.5 text-sm font-medium">
            <Clock className="w-3.5 h-3.5 mr-1.5" />
            Menunggu Persetujuan
          </Badge>
        );
      case 'approved':
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-300 px-3 py-1.5 text-sm font-medium">
            <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
            Telah Disetujui
          </Badge>
        );
      case 'paid':
        return (
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 px-3 py-1.5 text-sm font-medium">
            <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
            Pembayaran Selesai
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-slate-900">SAH.ID</h1>
          </div>
          <p className="text-slate-600">Platform Kesepakatan Digital</p>
        </div>

        {/* Main Card */}
        <Card className="bg-white border border-slate-200 mb-6">
          <CardHeader className="border-b border-slate-200 pb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-xl text-slate-900 mb-1">{agreement.title}</CardTitle>
                <CardDescription className="text-slate-500">Detail Kesepakatan Pembayaran</CardDescription>
              </div>
              {getStatusBadge()}
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-4 h-4 text-slate-400" />
                  <Label className="text-xs text-slate-500 uppercase tracking-wider">Nominal Pembayaran</Label>
                </div>
                <p className="text-2xl font-semibold text-slate-900">{agreement.amount} <span className="text-base text-slate-500">IDRX</span></p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <Label className="text-xs text-slate-500 uppercase tracking-wider">Tanggal Dibuat</Label>
                </div>
                <p className="font-medium text-slate-900">
                  {new Date(agreement.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <Label className="text-xs text-slate-500 uppercase tracking-wider">Pembuat Kesepakatan</Label>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-sm text-slate-900">{shortenAddress(agreement.creatorAddress)}</p>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(agreement.creatorAddress)} className="p-1 h-auto">
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <Label className="text-xs text-slate-500 uppercase tracking-wider">Jaringan</Label>
                </div>
                <p className="font-medium text-slate-900">Base Network</p>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <Label className="text-xs text-slate-500 uppercase tracking-wider mb-2 block">Deskripsi</Label>
              <p className="text-slate-700 leading-relaxed">{agreement.description}</p>
            </div>

            <Separator className="bg-slate-200" />

            {/* Pending Status - Approval Form */}
            {agreement.status === 'pending' && (
              <div className="border border-amber-200 bg-amber-50 rounded-lg p-6">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-7 h-7 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Konfirmasi Kesepakatan</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Masukkan alamat wallet Anda untuk menyetujui kesepakatan ini.
                  </p>
                </div>

                <div className="max-w-md mx-auto space-y-4">
                  <div>
                    <Label htmlFor="recipientInput" className="text-slate-700 font-medium mb-2 block">
                      Alamat Wallet Anda
                    </Label>
                    <Input
                      id="recipientInput"
                      value={recipientInput}
                      onChange={(e) => setRecipientInput(e.target.value.trim())}
                      placeholder="0x..."
                      className="h-12 bg-white border-slate-300 font-mono text-sm"
                    />
                    <p className="text-xs text-slate-500 mt-2 flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      Alamat harus sama dengan yang didaftarkan oleh pembuat kesepakatan
                    </p>
                  </div>

                  <Button
                    onClick={handleApprove}
                    disabled={!recipientInput || !validateRecipientAddress() || isValidating}
                    className="w-full h-12 bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50"
                  >
                    {isValidating ? 'Memverifikasi...' : 'Setujui Kesepakatan'}
                  </Button>

                  {recipientInput && !validateRecipientAddress() && (
                    <p className="text-sm text-red-600 text-center">Alamat wallet tidak sesuai</p>
                  )}
                </div>
              </div>
            )}

            {/* Approved Status */}
            {agreement.status === 'approved' && (
              <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-6 text-center">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Kesepakatan Disetujui</h3>
                <p className="text-slate-600 mb-4">
                  Menunggu pembayaran sebesar <span className="font-semibold">{agreement.amount} IDRX</span> dari pembuat kesepakatan.
                </p>
                <p className="text-xs text-slate-500">Halaman akan diperbarui otomatis setelah pembayaran diterima</p>
              </div>
            )}

            {/* Paid Status */}
            {agreement.status === 'paid' && (
              <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-6 text-center">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Pembayaran Selesai</h3>
                <p className="text-slate-600 mb-4">Transaksi telah tercatat di blockchain.</p>
                
                <div className="bg-white p-4 rounded-lg border border-emerald-200 mb-4 text-left max-w-md mx-auto">
                  <div className="mb-3">
                    <Label className="text-xs text-slate-500 uppercase tracking-wider">Nominal</Label>
                    <p className="font-semibold text-slate-900">{agreement.amount} IDRX</p>
                  </div>
                  <div className="mb-3">
                    <Label className="text-xs text-slate-500 uppercase tracking-wider">Tanggal Pembayaran</Label>
                    <p className="font-medium text-slate-900">
                      {agreement.paidAt && new Date(agreement.paidAt).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500 uppercase tracking-wider">Transaction Hash</Label>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-xs text-slate-700 break-all">{agreement.transactionHash}</p>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(agreement.transactionHash || '')} className="p-1 h-auto flex-shrink-0">
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => window.open(`https://basescan.org/tx/${agreement.transactionHash}`, '_blank')}
                  className="bg-slate-900 text-white hover:bg-slate-800"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Verifikasi di BaseScan
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="bg-white border border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-slate-600">
                <p className="font-medium text-slate-700 mb-1">Keamanan & Privasi</p>
                <p>Transaksi tercatat di blockchain Base dan dapat diverifikasi secara independen. SAH.ID tidak menyimpan private key atau dana Anda.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-slate-500">
          <p>SAH.ID - Platform Kesepakatan Digital</p>
          <p className="mt-1"> | Daviz.dev</p>
        </div>
      </div>
    </div>
  );
};

export default PublicAgreementView;
