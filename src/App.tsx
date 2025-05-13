import React from 'react';
import QRCodeGenerator from './components/QRCodeGenerator';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="relative">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] -z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-indigo-100/20 to-purple-100/20 backdrop-blur-3xl -z-10" />
        <Header />
        <main className="container mx-auto px-4 py-12 md:py-16">
          <QRCodeGenerator />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;