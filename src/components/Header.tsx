import React from 'react';
import { QrCode } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-slate-900/10 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <QrCode className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Custom QR Code Generator
            </h1>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;