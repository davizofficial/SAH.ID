import React from 'react';
import { Link } from 'react-router-dom';
import Menu from 'lucide-react/dist/esm/icons/menu';
import Settings from 'lucide-react/dist/esm/icons/settings';
import LogOut from 'lucide-react/dist/esm/icons/log-out';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWallet } from '../contexts/WalletContext';
import { Badge } from '@/components/ui/badge';

interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const { address, network, disconnectWallet } = useWallet();

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-navbar">
      <div className="flex items-center justify-between h-16 px-4 md:px-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden bg-transparent text-foreground hover:bg-muted"
          >
            <Menu className="w-6 h-6" />
          </Button>
          <Link to="/app/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-cyan-400 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-button transition-shadow">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">SAH.ID</h1>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {address && (
            <div className="hidden md:flex items-center gap-3">
              <Badge variant="outline" className="bg-secondary text-secondary-foreground border-primary/20 px-3 py-1">
                {network}
              </Badge>
              <span className="text-sm text-foreground font-medium bg-secondary/50 px-3 py-1.5 rounded-lg">{shortenAddress(address)}</span>
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="bg-transparent text-foreground hover:bg-muted">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {address ? address.slice(2, 4).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-popover text-popover-foreground">
              <DropdownMenuItem asChild>
                <Link to="/app/settings" className="flex items-center gap-2 cursor-pointer text-foreground">
                  <Settings className="w-4 h-4" />
                  <span>Pengaturan</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={disconnectWallet}
                className="flex items-center gap-2 cursor-pointer text-foreground"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
