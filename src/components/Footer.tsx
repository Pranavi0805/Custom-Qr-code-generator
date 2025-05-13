import React from 'react';
import { Github as GitHub, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">QR</span>
              </div>
              <span className="text-white font-medium">Custom QR Code Generator</span>
            </div>
            <p className="text-slate-400 text-sm">
              ©Custom QR Code Generator. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;