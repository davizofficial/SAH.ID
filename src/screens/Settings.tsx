import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useWallet } from '../contexts/WalletContext';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Wallet from 'lucide-react/dist/esm/icons/wallet';
import Network from 'lucide-react/dist/esm/icons/network';
import LogOut from 'lucide-react/dist/esm/icons/log-out';

const Settings: React.FC = () => {
  const { address, network, hasIDRX, idrxBalance, disconnectWallet } = useWallet();

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      <Card className="shadow-soft-card bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-foreground">Pengaturan</CardTitle>
          <CardDescription className="text-muted-foreground">
            Kelola akun dan preferensi Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Wallet Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Informasi Wallet
            </h3>

            <div className="space-y-3">
              <div>
                <Label className="text-muted-foreground text-sm">Alamat Wallet</Label>
                <p className="text-foreground font-normal mt-1">
                  {address ? shortenAddress(address) : '-'}
                </p>
              </div>

              <div>
                <Label className="text-muted-foreground text-sm">Jaringan</Label>
                <div className="mt-1">
                  <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
                    <Network className="w-4 h-4 mr-1" />
                    {network}
                  </Badge>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground text-sm">Saldo IDRX</Label>
                <p className="text-foreground font-bold text-xl mt-1">
                  {idrxBalance} IDRX
                </p>
                {!hasIDRX && (
                  <p className="text-sm text-warning mt-1">Token IDRX tidak terdeteksi</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Account Actions */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Aksi Akun</h3>

            <Button
              onClick={disconnectWallet}
              variant="destructive"
              className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Putuskan Koneksi Wallet
            </Button>
          </div>

          <Separator />

          {/* App Information */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-foreground">Tentang Aplikasi</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="text-foreground font-normal">
                <span className="font-bold">SAH.ID</span> adalah platform untuk membuat dan mengelola kesepakatan pembayaran crypto yang transparan dan aman.
              </p>
              <p className="text-foreground font-normal">Versi: 1.0.0</p>
              <p className="text-foreground font-normal">© Daviz.dev</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
