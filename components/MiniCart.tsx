// components/MiniCart.tsx
import Link from 'next/link';
import React from 'react';
import { useCart } from '../context/CartContext';
import buildWhatsAppUrl from '../lib/buildWhatsAppUrl';

export default function MiniCart({ phone = '+573001234567' }: { phone?: string }) {
  const { items, remove, clear, total, totalMinutes } = useCart();
  
  const handleWhatsApp = () => {
    const url = buildWhatsAppUrl(phone, items.map(i => ({ 
      title: i.title, 
      price: i.price, 
      durationMin: i.durationMin 
    })));
    window.open(url, '_blank');
  };

  return (
    <div className="p-3 border rounded bg-white shadow">
      <h4 className="font-bold">Tu selección ({items.length})</h4>
      {items.length === 0 ? (
        <p className="text-sm mt-2">No hay servicios seleccionados.</p>
      ) : (
        <>
          <ul className="mt-2 space-y-2">
            {items.map(it => (
              <li key={it.slug} className="flex justify-between items-center text-sm">
                <div>
                  <div className="font-medium">{it.title}</div>
                  <div className="text-xs text-gray-600">{it.durationMin} min — ${it.price.toLocaleString()}</div>
                </div>
                <button 
                  onClick={() => remove(it.slug)} 
                  className="text-sm text-red-500 hover:text-red-700 ml-2"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-3 pt-3 border-t">
            <div className="text-sm"><strong>Total:</strong> ${total().toLocaleString()}</div>
            <div className="text-sm"><strong>Tiempo:</strong> {Math.floor(totalMinutes()/60)}h {totalMinutes()%60}min</div>
            <div className="mt-2 flex gap-2">
              <button 
                onClick={handleWhatsApp} 
                className="flex-1 px-3 py-2 rounded text-sm font-medium" 
                style={{background: "var(--brand-yellow)"}}
              >
                WhatsApp
              </button>
              <Link 
                href="/carrito" 
                className="flex-1 px-3 py-2 rounded border text-center text-sm"
              >
                Ver carrito
              </Link>
            </div>
            <div className="mt-2 text-center">
              <button 
                onClick={clear} 
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Limpiar todo
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

