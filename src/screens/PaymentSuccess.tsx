import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAgreements } from '../contexts/AgreementContext';
import { useToast } from '../contexts/ToastContext';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import ExternalLink from 'lucide-react/dist/esm/icons/external-link';
import Shield from 'lucide-react/dist/esm/icons/shield';
import Download from 'lucide-react/dist/esm/icons/download';
import Loader2 from 'lucide-react/dist/esm/icons/loader-2';

const PaymentSuccess: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAgreement } = useAgreements();
  const { showToast } = useToast();
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const agreement = getAgreement(id || '');

  if (!agreement || agreement.status !== 'paid') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="bg-white border border-slate-200 max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <p className="text-slate-600">Bukti pembayaran tidak ditemukan</p>
            <Button onClick={() => navigate('/')} className="mt-4 bg-primary text-white hover:bg-primary/90">Kembali ke Beranda</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleDownloadPDF = async () => {
    if (!receiptRef.current) return;
    setIsDownloading(true);
    showToast('Membuat PDF...', 'info');
    try {
      const canvas = await html2canvas(receiptRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Bukti-Pembayaran-SAH-' + agreement.id.toUpperCase() + '.pdf');
      showToast('PDF berhasil diunduh', 'success');
    } catch (error) {
      showToast('Gagal membuat PDF', 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  const formatDate = (date: Date) => new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const formatTime = (date: Date) => new Date(date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const receiptNumber = 'SAH/' + new Date(agreement.paidAt || new Date()).getFullYear() + '/' + agreement.id.toUpperCase();

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div ref={receiptRef}>
          <Card className="bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-cyan-500 text-white px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-white/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-white">SAH.ID</h1>
                    <p className="text-white/80 text-sm">Platform Kesepakatan Digital</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-white" />
                  <span className="text-white font-medium text-sm">Terverifikasi</span>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Bukti Pembayaran</h2>
                <p className="text-slate-500 text-sm">Payment Receipt</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase">No. Dokumen</p>
                <p className="font-mono text-sm font-medium text-slate-900">{receiptNumber}</p>
              </div>
            </div>
            <CardContent className="p-6 space-y-5">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase mb-1">Tanggal</p>
                  <p className="font-medium text-slate-900 text-sm">{agreement.paidAt && formatDate(agreement.paidAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase mb-1">Waktu</p>
                  <p className="font-medium text-slate-900 text-sm">{agreement.paidAt && formatTime(agreement.paidAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase mb-1">Jaringan</p>
                  <p className="font-medium text-slate-900 text-sm">Base Network</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase mb-1">Mata Uang</p>
                  <p className="font-medium text-slate-900 text-sm">IDRX</p>
                </div>
              </div>
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-primary uppercase font-medium mb-1">Nominal Pembayaran</p>
                    <p className="text-sm text-slate-600">Total amount transferred</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-slate-900">{agreement.amount}</p>
                    <p className="text-primary text-sm font-medium">IDRX</p>
                  </div>
                </div>
              </div>
              <Separator className="bg-slate-200" />
              <div>
                <p className="text-xs text-slate-500 uppercase mb-2">Detail Kesepakatan</p>
                <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Judul</p>
                    <p className="font-medium text-slate-900">{agreement.title}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Deskripsi</p>
                    <p className="text-slate-700 text-sm">{agreement.description}</p>
                  </div>
                </div>
              </div>
              <Separator className="bg-slate-200" />
              <div>
                <p className="text-xs text-slate-500 uppercase mb-2">Pihak Terkait</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-xs text-slate-500 mb-1">Pengirim</p>
                    <p className="font-mono text-xs text-slate-900 break-all">{agreement.creatorAddress}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-xs text-slate-500 mb-1">Penerima</p>
                    <p className="font-mono text-xs text-slate-900 break-all">{agreement.recipientAddress}</p>
                  </div>
                </div>
              </div>
              <Separator className="bg-slate-200" />
              <div>
                <p className="text-xs text-slate-500 uppercase mb-2">Verifikasi Blockchain</p>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs text-slate-500 mb-1">Transaction Hash</p>
                  <p className="font-mono text-xs text-slate-900 break-all">{agreement.transactionHash}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <div>
                  <p className="font-medium text-slate-700">SAH.ID</p>

                </div>
                <div className="text-right">
                  <p>Dokumen dihasilkan otomatis</p>
                  <p>Sah tanpa tanda tangan</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex gap-3 mt-6">
          <Button onClick={handleDownloadPDF} disabled={isDownloading} className="flex-1 h-11 bg-gradient-to-r from-primary to-cyan-500 text-white hover:from-primary/90 hover:to-cyan-400 rounded-lg font-medium">
            {isDownloading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Membuat PDF...</> : <><Download className="w-4 h-4 mr-2" />Download PDF</>}
          </Button>
          <Button onClick={() => window.open('https://basescan.org/tx/' + agreement.transactionHash, '_blank')} variant="outline" className="flex-1 h-11 border-primary/30 text-primary hover:bg-primary/5 rounded-lg font-medium"><ExternalLink className="w-4 h-4 mr-2" />Verifikasi di BaseScan</Button>
        </div>
        <p className="text-center text-xs text-slate-400 mt-6">Powered by SAH.ID - Platform Kesepakatan Digital</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
