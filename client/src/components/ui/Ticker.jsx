import React from 'react';

export default function Ticker({ items = [] }) {
  return (
    <div className="flex overflow-hidden relative w-full">
      <div className="flex animate-[ticker_25s_linear_infinite] whitespace-nowrap">
        {items.map((item, i) => (
          <span key={`original-${i}`} className="mx-4">{item}</span>
        ))}
        {items.map((item, i) => (
          <span key={`copy-${i}`} className="mx-4" aria-hidden="true">{item}</span>
        ))}
      </div>
    </div>
  );
}
