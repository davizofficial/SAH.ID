import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWallet } from '../contexts/WalletContext';
import { useAgreements } from '../contexts/AgreementContext';
import AlertCircle from 'lucide-react/dist/esm/icons/alert-circle';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import FileText from 'lucide-react/dist/esm/icons/file-text';
import ExternalLink from 'lucide-react/dist/esm/icons/external-link';
import Plus from 'lucide-react/dist/esm/icons/plus';
import Wallet from 'lucide-react/dist/esm/icons/wallet';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { address, network, hasIDRX, idrxBalance } = useWallet();
  const { agreements } = useAgreements();

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning">Menunggu Persetujuan</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-info/10 text-info border-info">Disepakati</Badge>;
      case 'paid':
        return <Badge variant="outline" className="bg-success/10 text-success border-success">Dibayar</Badge>;
      default:
        return null;
    }
  };

  const recentAgreements = agreements.slice(-3).reverse();

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary to-cyan-500 rounded-2xl p-6 md:p-8 text-white shadow-glow">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">Selamat Datang di SAH.ID</h2>
        <p className="text-white/90 text-lg">Platform kesepakatan crypto yang transparan dan aman</p>
      </div>

      {/* Wallet Status Card */}
      <Card className="shadow-soft-card bg-card text-card-foreground border-0">
        <CardHeader className="border-b border-border/50 pb-4">
          <CardTitle className="text-xl text-foreground flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            Status Wallet
          </CardTitle>
          <CardDescription className="text-muted-foreground">Informasi wallet dan token Anda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-secondary/30 p-4 rounded-xl">
              <p className="text-sm text-muted-foreground mb-2">Alamat Wallet</p>
              <p className="font-mono text-foreground text-sm break-all">{address || '-'}</p>
            </div>
            <div className="bg-secondary/30 p-4 rounded-xl">
              <p className="text-sm text-muted-foreground mb-2">Jaringan</p>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-3 py-1">{network}</Badge>
            </div>
            <div className="bg-secondary/30 p-4 rounded-xl">
              <p className="text-sm text-muted-foreground mb-2">Saldo IDRX</p>
              <p className="font-bold text-foreground text-xl">{idrxBalance}</p>
            </div>
          </div>

          {!hasIDRX ? (
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-orange-900 mb-2">
                    Token IDRX tidak ditemukan di wallet Anda.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('https://app.uniswap.org', '_blank')}
                    className="bg-white text-orange-700 border-orange-300 hover:bg-orange-50"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Tukar ke IDRX
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
              <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <span className="text-base text-success font-semibold">IDRX Tersedia</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Section */}
      <Card className="shadow-soft-card bg-card text-card-foreground border-0">
        <CardHeader className="border-b border-border/50 pb-4">
          <CardTitle className="text-xl text-foreground flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-primary" />
            </div>
            Buat Kesepakatan Baru
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Mulai kesepakatan baru dengan pihak lain
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Button
            onClick={() => navigate('/app/create')}
            disabled={!hasIDRX}
            className="w-full md:w-auto h-12 bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground hover:from-primary/90 hover:to-cyan-400 disabled:opacity-50 shadow-button rounded-xl font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" />
            Buat Kesepakatan
          </Button>
          {!hasIDRX && (
            <p className="text-sm text-muted-foreground mt-3">
              Anda memerlukan token IDRX untuk membuat kesepakatan
            </p>
          )}
        </CardContent>
      </Card>

      {/* Recent Agreements */}
      <Card className="shadow-soft-card bg-card text-card-foreground border-0">
        <CardHeader className="border-b border-border/50 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-xl text-foreground">Kesepakatan Terbaru</CardTitle>
              <CardDescription className="text-muted-foreground">
                Riwayat kesepakatan Anda
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/app/history')}
              className="bg-secondary text-secondary-foreground border-primary/20 hover:bg-secondary/80"
            >
              Lihat Semua
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {recentAgreements.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-primary" />
              </div>
              <p className="text-muted-foreground mb-6 text-lg">Belum ada kesepakatan.</p>
              <Button
                onClick={() => navigate('/app/create')}
                disabled={!hasIDRX}
                className="bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground hover:from-primary/90 hover:to-cyan-400 disabled:opacity-50 shadow-button h-12 px-6 rounded-xl font-semibold"
              >
                <Plus className="w-5 h-5 mr-2" />
                Buat Kesepakatan Pertama
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentAgreements.map((agreement) => (
                <Card
                  key={agreement.id}
                  className="cursor-pointer hover:shadow-button transition-all bg-secondary/30 border-0 hover:bg-secondary/50 transform hover:-translate-y-1"
                  onClick={() => {
                    // Use hash-based navigation
                    window.location.hash = `/agreement/${agreement.id}`;
                  }}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground mb-1">{agreement.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {agreement.description}
                        </p>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <span className="text-muted-foreground">
                            Nominal: <span className="text-foreground font-normal">{agreement.amount} IDRX</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {getStatusBadge(agreement.status)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
