import React from 'react';

export default function AnimatedLogo({ type }) {
  return (
    <div className="logo">
      <img 
        src={type === 'vehiculo' ? '/pickup.png' : '/report.png'} 
        alt={type} 
        className="rotate"
      />
    </div>
  );
}