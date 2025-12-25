import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAgreements } from '../contexts/AgreementContext';
import FileText from 'lucide-react/dist/esm/icons/file-text';
import Clock from 'lucide-react/dist/esm/icons/clock';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';

const History: React.FC = () => {
  const navigate = useNavigate();
  const { agreements } = useAgreements();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning">
            <Clock className="w-4 h-4 mr-1" />
            Menunggu
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="outline" className="bg-info/10 text-info border-info">
            <CheckCircle className="w-4 h-4 mr-1" />
            Disepakati
          </Badge>
        );
      case 'paid':
        return (
          <Badge variant="outline" className="bg-success/10 text-success border-success">
            <CheckCircle className="w-4 h-4 mr-1" />
            Dibayar
          </Badge>
        );
      default:
        return null;
    }
  };

  const sortedAgreements = [...agreements].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="animate-fade-in-up">
      <Card className="shadow-soft-card bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-foreground">Riwayat Kesepakatan</CardTitle>
          <CardDescription className="text-muted-foreground">
            Semua kesepakatan yang pernah Anda buat
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sortedAgreements.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Belum ada riwayat kesepakatan</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedAgreements.map((agreement) => (
                <Card
                  key={agreement.id}
                  className="cursor-pointer hover:shadow-md transition-shadow bg-background border-border"
                  onClick={() => {
                    // Use hash-based navigation
                    window.location.hash = `/agreement/${agreement.id}`;
                  }}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground mb-1">{agreement.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {agreement.description}
                        </p>
                        <div className="flex flex-wrap gap-3 text-sm">
                          <span className="text-muted-foreground">
                            Nominal: <span className="text-foreground font-normal">{agreement.amount} IDRX</span>
                          </span>
                          <span className="text-muted-foreground">
                            Dibuat:{' '}
                            <span className="text-foreground font-normal">
                              {new Date(agreement.createdAt).toLocaleDateString('id-ID')}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">{getStatusBadge(agreement.status)}</div>
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

export default History;
