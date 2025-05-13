import React from 'react';
import { QRCodeOptions } from './QRCodeGenerator';
import { Image, XCircle, Sliders, Palette } from 'lucide-react';

type CustomizationPanelProps = {
  qrOptions: QRCodeOptions;
  onOptionChange: (name: keyof QRCodeOptions, value: any) => void;
  onLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogoRemove: () => void;
  hasLogo: boolean;
};

const ColorPicker = ({ 
  label, 
  value, 
  onChange 
}: { 
  label: string; 
  value: string; 
  onChange: (value: string) => void;
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <div className="flex items-center space-x-3">
        <div className="color-input-wrapper w-10 h-10 rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="opacity-0"
          />
          <div 
            className="w-full h-full"
            style={{ backgroundColor: value }}
          />
        </div>
        <input
          type="text"
          value={value.toUpperCase()}
          onChange={(e) => onChange(e.target.value)}
          className="input-field w-32"
        />
      </div>
    </div>
  );
};

const CustomizationPanel = ({
  qrOptions,
  onOptionChange,
  onLogoUpload,
  onLogoRemove,
  hasLogo,
}: CustomizationPanelProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2 pb-4 border-b border-slate-200">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
          <Palette className="h-5 w-5 text-blue-500" />
        </div>
        <h3 className="text-lg font-medium text-slate-900">
          Style Your QR Code
        </h3>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ColorPicker
            label="Background Color"
            value={qrOptions.bgColor}
            onChange={(value) => onOptionChange('bgColor', value)}
          />
          
          <ColorPicker
            label="Foreground Color"
            value={qrOptions.fgColor}
            onChange={(value) => onOptionChange('fgColor', value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Error Correction Level
          </label>
          <select
            value={qrOptions.level}
            onChange={(e) => onOptionChange('level', e.target.value)}
            className="input-field"
          >
            <option value="L">Low (L) - 7% recovery</option>
            <option value="M">Medium (M) - 15% recovery</option>
            <option value="Q">Quartile (Q) - 25% recovery</option>
            <option value="H">High (H) - 30% recovery</option>
          </select>
          <p className="mt-2 text-sm text-slate-500">
            Higher correction levels make QR codes more reliable but increase complexity
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            QR Code Size
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="200"
              max="800"
              step="50"
              value={qrOptions.size}
              onChange={(e) => onOptionChange('size', parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <span className="text-sm font-medium text-slate-700 w-20 text-right">
              {qrOptions.size}px
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center h-6">
            <input
              id="include-margin"
              type="checkbox"
              checked={qrOptions.includeMargin}
              onChange={(e) => onOptionChange('includeMargin', e.target.checked)}
              className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-slate-300 rounded"
            />
          </div>
          <label htmlFor="include-margin" className="text-sm text-slate-700">
            Include Margin (Quiet Zone)
          </label>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Logo Image (Optional)
          </label>
          <div className="flex items-center space-x-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onLogoUpload}
              className="hidden"
            />
            {hasLogo ? (
              <button
                type="button"
                onClick={onLogoRemove}
                className="btn-secondary text-red-600 border-red-200 hover:bg-red-50"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Remove Logo
              </button>
            ) : (
              <button
                type="button"
                onClick={triggerFileInput}
                className="btn-secondary"
              >
                <Image className="mr-2 h-4 w-4" />
                Upload Logo
              </button>
            )}
            <span className="text-sm text-slate-500">
              For best results, use a transparent PNG
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;