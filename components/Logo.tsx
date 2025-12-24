import React from 'react';

export const VeloIcon = ({ className = "w-16 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 120 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="blue_grad" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0F4C81" />
        <stop offset="1" stopColor="#1a5f9e" />
      </linearGradient>
      <linearGradient id="orange_grad" x1="60" y1="0" x2="120" y2="60" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F2943F" />
        <stop offset="1" stopColor="#fbbf24" />
      </linearGradient>
    </defs>
    
    {/* Left Loop (Blue) */}
    <path 
      d="M60 30 C 45 30 35 10 20 10 C 5 10 5 50 20 50 C 35 50 45 30 60 30" 
      stroke="url(#blue_grad)" 
      strokeWidth="12" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    
    {/* Right Loop (Orange) */}
    <path 
      d="M60 30 C 75 30 85 50 100 50 C 115 50 115 10 100 10 C 85 10 75 30 60 30" 
      stroke="url(#orange_grad)" 
      strokeWidth="12" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

interface LogoProps {
    className?: string;
    variant?: 'default' | 'white';
}

export const Logo: React.FC<LogoProps> = ({ className = "", variant = 'default' }) => {
    const textColor = variant === 'white' ? 'text-white' : 'text-velo-dark dark:text-white';
    const subTextColor = variant === 'white' ? 'text-white/80' : 'text-velo-dark/70 dark:text-slate-300';

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <VeloIcon className="h-8 w-16" />
            <div className="flex flex-col justify-center leading-none">
                <span className={`font-bold text-lg tracking-wide uppercase ${textColor}`}>Velo</span>
                <span className={`text-[10px] font-medium tracking-[0.2em] uppercase ${subTextColor}`}>Rechnungen</span>
            </div>
        </div>
    );
};
