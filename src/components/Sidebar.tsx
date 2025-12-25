import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Home from 'lucide-react/dist/esm/icons/home';
import FileText from 'lucide-react/dist/esm/icons/file-text';
import History from 'lucide-react/dist/esm/icons/history';
import Settings from 'lucide-react/dist/esm/icons/settings';
import X from 'lucide-react/dist/esm/icons/x';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = [
    { path: '/app/dashboard', label: 'Dashboard', icon: Home },
    { path: '/app/create', label: 'Buat Kesepakatan', icon: FileText },
    { path: '/app/history', label: 'Riwayat Kesepakatan', icon: History },
    { path: '/app/settings', label: 'Pengaturan', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-card border-r border-border z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 lg:hidden">
            <h2 className="text-lg font-bold text-foreground">Menu</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="bg-transparent text-foreground hover:bg-muted"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <Separator className="lg:hidden" />

          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                    active
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-normal">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
