import React from 'react';

export function ClinicLogo({ className = 'h-8 w-8', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Gangal Dental Clinic Monogram"
      {...props}
    >
      <rect width="48" height="48" rx="14" fill="#005255" />
      {/* Elegant dental molar silhouette */}
      <path
        d="M24 10C20.5 10 16 11.8 15 16C14 20.2 15.5 25 16.5 29C17.5 33 19 38 21.5 38C23.2 38 23.5 34 24 32C24.5 34 24.8 38 26.5 38C29 38 30.5 33 31.5 29C32.5 25 34 20.2 33 16C32 11.8 27.5 10 24 10Z"
        fill="#EDFCFF"
      />
      {/* Serene gentle arch */}
      <path
        d="M18.5 21C20.2 23.5 27.8 23.5 29.5 21"
        stroke="#005255"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Warm brass gold sanctuary accent */}
      <circle cx="24" cy="16" r="2.5" fill="#B8935A" />
      <path
        d="M24 25V28"
        stroke="#005255"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

