import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useWallet } from '../contexts/WalletContext';
import { useToast } from '../contexts/ToastContext';
import Wallet from 'lucide-react/dist/esm/icons/wallet';
import Shield from 'lucide-react/dist/esm/icons/shield';
import FileCheck from 'lucide-react/dist/esm/icons/file-check';
import Zap from 'lucide-react/dist/esm/icons/zap';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import HelpCircle from 'lucide-react/dist/esm/icons/help-circle';

const LandingScreen: React.FC = () => {
  const navigate = useNavigate();
  const { connectWallet, isConnected } = useWallet();
  const { showToast } = useToast();
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const faqData = [
    {
      question: 'Apa latar belakang munculnya SAH.ID?',
      answer: 'SAH.ID lahir dari kebutuhan akan solusi transaksi crypto yang aman di Indonesia. Saat ini, regulasi untuk transaksi cryptocurrency di Indonesia belum sepenuhnya ada atau masih dalam tahap pengembangan. Hal ini menciptakan celah di mana banyak transaksi crypto dilakukan tanpa perlindungan hukum yang jelas. SAH.ID hadir untuk mengisi kekosongan tersebut dengan menyediakan bukti kesepakatan yang tercatat permanen di blockchain, sehingga kedua pihak memiliki bukti yang sah dan tidak bisa dimanipulasi meskipun belum ada regulasi formal.'
    },
    {
      question: 'Apa itu SAH.ID?',
      answer: 'SAH.ID adalah platform kesepakatan crypto yang memungkinkan Anda membuat bukti kesepakatan dan pembayaran yang tercatat di blockchain Base. Setiap transaksi transparan, aman, dan dapat diverifikasi kapan saja.'
    },
    {
      question: 'Apa fungsi utama SAH.ID?',
      answer: 'SAH.ID berfungsi sebagai jembatan kepercayaan antara dua pihak dalam transaksi crypto. Platform ini mencatat kesepakatan, memastikan kedua pihak setuju sebelum pembayaran, dan menyimpan bukti transaksi secara permanen di blockchain.'
    },
    {
      question: 'Mengapa harus menggunakan SAH.ID?',
      answer: 'SAH.ID melindungi Anda dari penipuan dengan sistem persetujuan dua pihak. Tidak ada pembayaran yang bisa dilakukan tanpa persetujuan kedua belah pihak. Semua transaksi tercatat di blockchain sehingga tidak bisa dimanipulasi atau dihapus.'
    },
    {
      question: 'Apa itu IDRX dan mengapa digunakan?',
      answer: 'IDRX adalah stablecoin yang nilainya setara dengan Rupiah Indonesia (1 IDRX = 1 IDR). Dengan IDRX, Anda bisa bertransaksi crypto dengan nilai yang stabil tanpa khawatir fluktuasi harga seperti Bitcoin atau Ethereum.'
    },
    {
      question: 'Apakah SAH.ID aman digunakan?',
      answer: 'Ya, sangat aman. SAH.ID menggunakan teknologi blockchain Base yang terdesentralisasi. Tidak ada pihak ketiga yang bisa mengakses atau mengubah data kesepakatan Anda. Semua transaksi terenkripsi dan terverifikasi secara otomatis.'
    },
    {
      question: 'Bagaimana cara memulai menggunakan SAH.ID?',
      answer: 'Cukup hubungkan wallet crypto Anda (seperti MetaMask), buat kesepakatan baru dengan mengisi detail dan nominal IDRX, bagikan link ke pihak lain untuk disetujui, lalu lakukan pembayaran setelah kedua pihak setuju.'
    },
    {
      question: 'Apakah ada biaya untuk menggunakan SAH.ID?',
      answer: 'SAH.ID mengenakan biaya minimal untuk setiap transaksi yang berhasil. Biaya ini digunakan untuk gas fee blockchain dan pengembangan platform. Tidak ada biaya tersembunyi atau biaya berlangganan.'
    },
    {
      question: 'Bagaimana jika terjadi sengketa?',
      answer: 'Karena semua kesepakatan tercatat di blockchain, bukti transaksi tidak bisa dipalsukan. Kedua pihak bisa melihat detail kesepakatan yang sudah disetujui sebagai bukti yang sah dan tidak bisa diubah.'
    }
  ];

  React.useEffect(() => {
    if (isConnected) {
      navigate('/app/dashboard');
    }
  }, [isConnected, navigate]);

  const handleConnect = async () => {
    try {
      await connectWallet();
      showToast('Wallet berhasil terhubung!', 'success');
      navigate('/app/dashboard');
    } catch (error) {
      showToast('Gagal menghubungkan wallet', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-cyan-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Floating Elements */}
          <div className="absolute top-40 right-20 w-20 h-20 bg-primary/20 rounded-2xl rotate-12 animate-float"></div>
          <div className="absolute bottom-40 left-20 w-16 h-16 bg-cyan-400/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Logo with Animation */}
          <div className="flex justify-center mb-16 animate-fade-in">
            <div className="flex items-center gap-3 group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary via-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-glow transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <span className="text-white font-bold text-2xl">S</span>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-cyan-500 to-blue-600 bg-clip-text text-transparent">SAH.ID</h1>
            </div>
          </div>

          <div className="max-w-5xl mx-auto text-center space-y-10 animate-fade-in-up">
            {/* Main Headline with Gradient Animation */}
            <div className="space-y-8">
              <div className="inline-block">
                <div className="bg-gradient-to-r from-primary/10 to-cyan-500/10 border border-primary/20 rounded-full px-6 py-2 mb-6 animate-fade-in">
                  <span className="text-primary font-semibold text-sm">Platform Kesepakatan Crypto Terpercaya</span>
                </div>
              </div>
              
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                Bukti Kesepakatan &<br />
                Pembayaran Crypto yang{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-primary via-cyan-500 to-blue-600 bg-clip-text text-transparent animate-gradient">
                    Transparan
                  </span>
                  <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                    <path d="M2 10C60 2 140 2 198 10" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0EA5E9" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-light">
                Platform kesepakatan crypto yang <span className="font-semibold text-foreground">aman</span>, <span className="font-semibold text-foreground">jelas</span>, dan <span className="font-semibold text-foreground">anti-scam</span>.<br />
                Tercatat di blockchain Base dengan IDRX.
              </p>
            </div>

            {/* CTA Button with Enhanced Animation */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6">
              <Button
                onClick={handleConnect}
                className="group relative h-20 px-12 bg-gradient-to-r from-primary via-cyan-500 to-blue-600 text-white hover:shadow-2xl text-xl font-bold rounded-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                size="lg"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                <Wallet className="w-7 h-7 mr-3 relative z-10 group-hover:rotate-12 transition-transform" />
                <span className="relative z-10">Hubungkan Wallet & Mulai</span>
              </Button>
              
              <Button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                className="h-20 px-12 border-2 border-primary/30 text-primary hover:bg-primary/5 text-xl font-semibold rounded-2xl transform hover:scale-105 transition-all duration-300"
                size="lg"
              >
                <span>Pelajari Lebih Lanjut</span>
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </div>

            {/* Trust Indicators with Enhanced Design */}
            <div className="flex flex-wrap justify-center gap-6 pt-12">
              {[
                { icon: CheckCircle, text: 'Blockchain Base', color: 'from-green-400 to-emerald-500' },
                { icon: CheckCircle, text: 'Token IDRX', color: 'from-blue-400 to-cyan-500' },
                { icon: CheckCircle, text: '100% Terverifikasi', color: 'from-purple-400 to-pink-500' }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-8 h-8 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-base text-foreground font-semibold">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-white/50 to-blue-50/30 backdrop-blur-sm relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block bg-gradient-to-r from-primary/10 to-cyan-500/10 border border-primary/20 rounded-full px-6 py-2 mb-6">
              <span className="text-primary font-semibold text-sm">🚀 Fitur Unggulan</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Kenapa Memilih <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">SAH.ID</span>?
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Platform kesepakatan crypto yang dirancang untuk keamanan dan transparansi maksimal
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Aman & Terverifikasi',
                desc: 'Setiap kesepakatan tercatat di blockchain Base dan dapat diverifikasi kapan saja',
                gradient: 'from-green-400 to-emerald-500',
                delay: '0s'
              },
              {
                icon: FileCheck,
                title: 'Transparan & Anti-Scam',
                desc: 'Kedua pihak harus menyetujui sebelum pembayaran dilakukan, mencegah penipuan',
                gradient: 'from-blue-400 to-cyan-500',
                delay: '0.1s'
              },
              {
                icon: Zap,
                title: 'Cepat & Mudah',
                desc: 'Buat kesepakatan dalam hitungan menit dengan interface yang sederhana dan intuitif',
                gradient: 'from-purple-400 to-pink-500',
                delay: '0.2s'
              }
            ].map((feature, index) => (
              <Card 
                key={index}
                className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/80 backdrop-blur-sm overflow-hidden relative"
                style={{ animationDelay: feature.delay }}
              >
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <CardContent className="p-10 text-center relative z-10">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cara Kerja
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Proses sederhana dalam 4 langkah
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Hubungkan Wallet', desc: 'Hubungkan wallet crypto Anda dengan SAH.ID' },
              { step: '2', title: 'Buat Kesepakatan', desc: 'Isi detail kesepakatan dan nominal IDRX' },
              { step: '3', title: 'Bagikan ke Penerima', desc: 'Kirim link kesepakatan untuk disetujui' },
              { step: '4', title: 'Bayar & Selesai', desc: 'Setelah disetujui, lakukan pembayaran' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-button text-white text-2xl font-bold">
                  {item.step}
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-cyan-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap Memulai?
          </h3>
          <p className="text-xl text-blue-50 mb-8">
            Buat kesepakatan crypto pertama Anda sekarang
          </p>
          <Button
            onClick={handleConnect}
            className="h-16 px-10 bg-white text-primary hover:bg-blue-50 shadow-glow text-xl font-bold rounded-xl transform hover:scale-105 transition-all"
            size="lg"
          >
            <Wallet className="w-6 h-6 mr-3" />
            Hubungkan Wallet Sekarang
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-gradient-to-b from-blue-50/50 to-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-cyan-400/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-cyan-500/10 border border-primary/20 rounded-full px-6 py-2 mb-6">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold text-sm">Pertanyaan Umum</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Frequently Asked <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">Questions</span>
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Temukan jawaban untuk pertanyaan yang sering diajukan tentang SAH.ID
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left group"
                >
                  <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors pr-4">
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary/10 to-cyan-500/10 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === index ? 'rotate-180 bg-gradient-to-br from-primary to-cyan-500' : ''}`}>
                    <ChevronDown className={`w-5 h-5 transition-colors ${openFaq === index ? 'text-white' : 'text-primary'}`} />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="px-8 pb-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-4"></div>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Help */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Masih punya pertanyaan lain?
            </p>
            <Button
              variant="outline"
              className="border-2 border-primary/30 text-primary hover:bg-primary/5 font-semibold rounded-xl px-8 py-3"
            >
              Hubungi Kami
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-cyan-400 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="text-lg font-bold text-foreground">SAH.ID</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Platform kesepakatan crypto yang transparan dan aman
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-foreground mb-4">Produk</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-primary transition-colors">Fitur</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Harga</a></li>
                <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-foreground mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Kontak</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            <p>Daviz.dev | All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingScreen;
