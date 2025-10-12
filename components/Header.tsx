import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { items } = useCart();
  
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl" style={{color: "var(--brand-brown)"}}>
          Consultorio Odontológico
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/servicios" className="hover:underline">
            Servicios
          </Link>
          <Link href="/carrito" className="relative hover:underline">
            🛒 Carrito
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
          <a 
            href="https://wa.me/573113440504" 
            target="_blank" 
            rel="noreferrer" 
            className="px-3 py-2 rounded" 
            style={{background: "var(--brand-yellow)"}}
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
