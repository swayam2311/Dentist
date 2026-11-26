import React from 'react';

interface TeamAvatarProps {
  name: string;
  role?: string;
  initials: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// TODO(client-verify): Replace initials placeholder with authentic clinic photograph once provided by Dr. Gangal
export function TeamAvatar({
  name,
  role,
  initials,
  className = '',
  size = 'md',
}: TeamAvatarProps) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-[13px]',
    md: 'w-14 h-14 text-[16px]',
    lg: 'w-20 h-20 text-[22px]',
    xl: 'w-28 h-28 text-[28px]',
  };

  return (
    <div
      className={`rounded-full bg-gradient-to-br from-primary-container via-primary to-secondary flex items-center justify-center font-serif font-medium text-white shadow-sm border-2 border-white/80 shrink-0 select-none ${sizeClasses[size]} ${className}`}
      title={`${name}${role ? ` (${role})` : ''}`}
      aria-label={`Avatar for ${name}`}
      role="img"
    >
      <span>{initials}</span>
    </div>
  );
}

