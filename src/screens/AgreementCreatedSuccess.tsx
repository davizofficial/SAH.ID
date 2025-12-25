import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAgreements } from '../contexts/AgreementContext';
import { useToast } from '../contexts/ToastContext';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import Copy from 'lucide-react/dist/esm/icons/copy';
import Share2 from 'lucide-react/dist/esm/icons/share-2';
import Clock from 'lucide-react/dist/esm/icons/clock';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import RefreshCw from 'lucide-react/dist/esm/icons/refresh-cw';
import Home from 'lucide-react/dist/esm/icons/home';
import Link from 'lucide-react/dist/esm/icons/link';

const AgreementCreatedSuccess: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAgreement } = useAgreements();
  const { showToast } = useToast();

  const [agreement, setAgreement] = useState(getAgreement(id || ''));
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = getAgreement(id || '');
      setAgreement(updated);
      if (updated?.status === 'approved') {
        showToast('Kesepakatan telah disetujui', 'success');
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [id, getAgreement, showToast]);

  if (!agreement) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white border border-slate-200">
          <CardContent className="pt-6 text-center">
            <p className="text-slate-600">Kesepakatan tidak ditemukan</p>
            <Button onClick={() => navigate('/app/dashboard')} className="mt-4 bg-slate-900 text-white hover:bg-slate-800">
              Kembali ke Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const shareLink = `${window.location.origin}/#/agreement/${agreement.id}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Link berhasil disalin', 'success');
  };

  const shareViaWhatsApp = () => {
    const message = encodeURIComponent(
      `Saya telah membuat kesepakatan pembayaran untuk "${agreement.title}" senilai ${agreement.amount} IDRX.\n\nSilakan buka link berikut untuk melihat detail dan menyetujui kesepakatan:\n${shareLink}`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    const updated = getAgreement(id || '');
    setAgreement(updated);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast(updated?.status === 'approved' ? 'Kesepakatan telah disetujui' : 'Status diperbarui', 'info');
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Success Header */}
      <Card className="bg-emerald-50 border border-emerald-200">
        <CardContent className="pt-8 text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Kesepakatan Berhasil Dibuat</h2>
          <p className="text-slate-600">
            Bagikan link di bawah ini kepada penerima untuk mendapatkan persetujuan.
          </p>
        </CardContent>
      </Card>

      {/* Agreement Details */}
      <Card className="bg-white border border-slate-200">
        <CardHeader className="border-b border-slate-200 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-slate-900">Detail Kesepakatan</CardTitle>
            <Badge className={`px-3 py-1 text-sm font-medium ${
              agreement.status === 'pending' 
                ? 'bg-amber-100 text-amber-800 border-amber-300'
                : 'bg-emerald-100 text-emerald-800 border-emerald-300'
            }`}>
              {agreement.status === 'pending' ? (
                <><Clock className="w-3.5 h-3.5 mr-1.5" />Menunggu Persetujuan</>
              ) : (
                <><CheckCircle className="w-3.5 h-3.5 mr-1.5" />Telah Disetujui</>
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Judul Kesepakatan</p>
              <p className="font-medium text-slate-900">{agreement.title}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Nominal</p>
              <p className="text-xl font-semibold text-slate-900">{agreement.amount} IDRX</p>
            </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Deskripsi</p>
            <p className="text-slate-700">{agreement.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Share Link */}
      <Card className="bg-white border border-slate-200">
        <CardHeader className="border-b border-slate-200 pb-4">
          <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
            <Link className="w-5 h-5 text-slate-400" />
            Link Kesepakatan
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Link untuk Penerima</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-sm text-slate-900 bg-white px-3 py-2 rounded border border-slate-200 break-all font-mono">
                {shareLink}
              </code>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(shareLink)} className="flex-shrink-0">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <Button onClick={() => copyToClipboard(shareLink)} className="h-11 bg-slate-900 text-white hover:bg-slate-800">
              <Copy className="w-4 h-4 mr-2" />
              Salin Link
            </Button>
            <Button onClick={shareViaWhatsApp} variant="outline" className="h-11 border-slate-300 text-slate-700 hover:bg-slate-50">
              <Share2 className="w-4 h-4 mr-2" />
              Bagikan via WhatsApp
            </Button>
          </div>

          <p className="text-sm text-slate-500">
            Kirim link di atas kepada penerima melalui WhatsApp, Email, atau platform komunikasi lainnya.
          </p>
        </CardContent>
      </Card>

      {/* Status Section */}
      {agreement.status === 'pending' ? (
        <Card className="bg-amber-50 border border-amber-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Menunggu Persetujuan</h3>
              <p className="text-slate-600 max-w-md mx-auto text-sm">
                Setelah penerima membuka link dan menyetujui kesepakatan, Anda dapat melanjutkan ke pembayaran.
              </p>
              <Button onClick={handleRefresh} disabled={isRefreshing} variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                {isRefreshing ? (
                  <><RefreshCw className="w-4 h-4 mr-2 animate-spin" />Memperbarui...</>
                ) : (
                  <><RefreshCw className="w-4 h-4 mr-2" />Refresh Status</>
                )}
              </Button>
              <p className="text-xs text-slate-500">Status diperbarui otomatis setiap 5 detik</p>
            </div>
          </CardContent>
        </Card>
      ) : agreement.status === 'approved' ? (
        <Card className="bg-emerald-50 border border-emerald-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Kedua Belah Pihak Telah Sepakat</h3>
              <p className="text-slate-600 text-sm">Selanjutnya, kirim pembayaran ke wallet penerima.</p>
              <div className="bg-white p-4 rounded-lg border border-emerald-200 max-w-md mx-auto">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Alamat Penerima</p>
                <p className="font-mono text-sm text-slate-900 break-all">{agreement.recipientAddress}</p>
                <p className="text-lg font-semibold text-slate-900 mt-2">{agreement.amount} IDRX</p>
              </div>
              <Button onClick={() => navigate(`/app/payment/${agreement.id}`)} className="h-12 px-6 bg-slate-900 text-white hover:bg-slate-800">
                Lanjut ke Pembayaran
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-emerald-50 border border-emerald-200">
          <CardContent className="pt-6 text-center">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Pembayaran Selesai</h3>
            <p className="text-slate-600 text-sm">Pembayaran telah berhasil dikirim ke wallet penerima.</p>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-center">
        <Button onClick={() => navigate('/app/dashboard')} variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
          <Home className="w-4 h-4 mr-2" />
          Kembali ke Dashboard
        </Button>
      </div>
    </div>
  );
};

export default AgreementCreatedSuccess;
