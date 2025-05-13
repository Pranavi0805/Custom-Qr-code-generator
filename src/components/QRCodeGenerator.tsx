import React, { useState, useRef, useCallback } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { 
  Link, 
  Download, 
  Check, 
  AlertCircle, 
  Upload,
  Info,
  Sparkles
} from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import CustomizationPanel from './CustomizationPanel';
import { validateUrl } from '../utils/urlValidator';

export type QRCodeOptions = {
  value: string;
  size: number;
  bgColor: string;
  fgColor: string;
  level: 'L' | 'M' | 'Q' | 'H';
  includeMargin: boolean;
  imageSettings?: {
    src: string;
    height: number;
    width: number;
    excavate: boolean;
  };
};

const QRCodeGenerator = () => {
  const [url, setUrl] = useState('');
  const [urlStatus, setUrlStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [urlMessage, setUrlMessage] = useState('');
  const [exportFormat, setExportFormat] = useState<'png' | 'svg' | 'jpeg'>('png');
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [qrOptions, setQrOptions] = useState<QRCodeOptions>({
    value: '',
    size: 300,
    bgColor: '#FFFFFF',
    fgColor: '#000000',
    level: 'M',
    includeMargin: true,
  });
  
  const qrRef = useRef<HTMLDivElement>(null);
  
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    
    if (!newUrl) {
      setUrlStatus('idle');
      setUrlMessage('');
      setQrOptions(prev => ({ ...prev, value: '' }));
      setShowPreview(false);
      return;
    }
    
    const validationResult = validateUrl(newUrl);
    setUrlStatus(validationResult.isValid ? 'valid' : 'invalid');
    setUrlMessage(validationResult.message);
    
    if (validationResult.isValid) {
      setQrOptions(prev => ({ ...prev, value: newUrl }));
    }
  };
  
  const handleOptionChange = (name: keyof QRCodeOptions, value: any) => {
    setQrOptions(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setQrOptions(prev => ({
        ...prev,
        imageSettings: {
          src,
          height: 50,
          width: 50,
          excavate: true,
        }
      }));
    };
    reader.readAsDataURL(file);
  };
  
  const handleRemoveLogo = () => {
    setQrOptions(prev => {
      const newOptions = { ...prev };
      delete newOptions.imageSettings;
      return newOptions;
    });
  };
  
  const generateQrCode = () => {
    if (urlStatus !== 'valid') return;
    setShowPreview(true);
  };
  
  const downloadQrCode = useCallback(async () => {
    if (!qrRef.current || urlStatus !== 'valid') return;
    
    setLoading(true);
    
    try {
      let dataUrl;
      
      switch (exportFormat) {
        case 'png':
          dataUrl = await htmlToImage.toPng(qrRef.current);
          break;
        case 'jpeg':
          dataUrl = await htmlToImage.toJpeg(qrRef.current);
          break;
        case 'svg':
          dataUrl = await htmlToImage.toSvg(qrRef.current);
          break;
        default:
          dataUrl = await htmlToImage.toPng(qrRef.current);
      }
      
      const link = document.createElement('a');
      link.download = `qrcode.${exportFormat}`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setLoading(false);
    }
  }, [qrRef, urlStatus, exportFormat]);
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
          Create Your Custom QR Code
        </h2>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Transform your links into beautifully designed QR codes with our advanced customization options.
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden">
        <div className="p-8">
          <div className="space-y-8">
            <div className="relative">
              <label htmlFor="url" className="block text-sm font-medium text-slate-700 mb-2">
                Enter your URL
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Link className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  id="url"
                  value={url}
                  onChange={handleUrlChange}
                  className={`input-field pl-11 ${
                    urlStatus === 'valid' 
                      ? 'border-green-200 focus:ring-green-500' 
                      : urlStatus === 'invalid' 
                        ? 'border-red-200 focus:ring-red-500' 
                        : 'border-slate-200'
                  }`}
                  placeholder="https://example.com"
                />
                {urlStatus === 'valid' && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                )}
                {urlStatus === 'invalid' && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {urlMessage && (
                <p className={`mt-2 text-sm flex items-center ${
                  urlStatus === 'valid' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {urlStatus === 'valid' ? <Check className="h-4 w-4 mr-1" /> : <AlertCircle className="h-4 w-4 mr-1" />}
                  {urlMessage}
                </p>
              )}
            </div>
            
            <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
              <div className="w-full lg:w-1/2">
                <CustomizationPanel 
                  qrOptions={qrOptions}
                  onOptionChange={handleOptionChange}
                  onLogoUpload={handleImageUpload}
                  onLogoRemove={handleRemoveLogo}
                  hasLogo={!!qrOptions.imageSettings}
                />
                
                <div className="mt-6">
                  <label htmlFor="export-format" className="block text-sm font-medium text-slate-700 mb-2">
                    Export Format
                  </label>
                  <select
                    id="export-format"
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value as 'png' | 'svg' | 'jpeg')}
                    className="input-field"
                  >
                    <option value="png">PNG</option>
                    <option value="svg">SVG</option>
                    <option value="jpeg">JPEG</option>
                  </select>
                </div>
                
                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={generateQrCode}
                    disabled={urlStatus !== 'valid'}
                    className="btn-primary"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Preview
                  </button>
                  <button
                    onClick={downloadQrCode}
                    disabled={!showPreview || loading}
                    className="btn-primary"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {loading ? 'Processing...' : 'Download'}
                  </button>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2">
                <div className="bg-slate-50/50 backdrop-blur-sm p-8 rounded-xl border border-slate-200/50">
                  <h3 className="text-lg font-medium text-slate-900 mb-6 flex items-center">
                    <Info className="h-5 w-5 mr-2 text-blue-500" />
                    QR Code Preview
                  </h3>
                  {showPreview ? (
                    <div className="flex justify-center">
                      <div 
                        ref={qrRef} 
                        className="p-8 bg-white rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
                        style={{ width: qrOptions.size, height: qrOptions.size }}
                      >
                        <QRCodeCanvas
                          value={qrOptions.value}
                          size={qrOptions.size - 64}
                          bgColor={qrOptions.bgColor}
                          fgColor={qrOptions.fgColor}
                          level={qrOptions.level}
                          includeMargin={qrOptions.includeMargin}
                          imageSettings={qrOptions.imageSettings}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-80 bg-white/50 rounded-xl border-2 border-dashed border-slate-200">
                      <div className="text-center p-6">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                          <Upload className="h-8 w-8 text-blue-500" />
                        </div>
                        <p className="text-slate-600">
                          Enter a valid URL and click "Generate Preview"<br />to create your custom QR code
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;