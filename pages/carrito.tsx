import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import buildWhatsAppUrl from '../lib/buildWhatsAppUrl';

export default function CarritoPage() {
  const { items, remove, clear, total, totalMinutes } = useCart();
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '+573001234567';
  
  const handleWhatsApp = () => {
    const url = buildWhatsAppUrl(phone, items.map(i => ({ 
      title: i.title, 
      price: i.price, 
      durationMin: i.durationMin 
    })));
    window.open(url, '_blank');
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4" style={{color: "var(--brand-brown)"}}>
          Mi selección de servicios
        </h1>
        
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No hay servicios seleccionados.</p>
            <Link href="/servicios" className="text-blue-600 hover:underline">
              Ver catálogo de servicios
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <ul className="space-y-3">
                {items.map(it => (
                  <li key={it.slug} className="flex justify-between items-center border p-4 rounded hover:shadow">
                    <div className="flex items-center gap-4">
                      {it.imageUrl && (
                        <div className="w-20 h-20 relative rounded overflow-hidden">
                          <Image 
                            src={it.imageUrl} 
                            alt={it.title} 
                            fill
                            style={{objectFit: 'cover'}}
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-lg">{it.title}</div>
                        <div className="text-sm text-gray-600">
                          {it.durationMin} min — ${it.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => remove(it.slug)} 
                      className="text-red-500 hover:text-red-700 px-3 py-1 border border-red-500 rounded"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-1">
              <div className="border rounded p-4 sticky top-4">
                <h3 className="font-bold text-lg mb-3">Resumen</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Servicios:</span>
                    <span>{items.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tiempo total:</span>
                    <span>{Math.floor(totalMinutes()/60)}h {totalMinutes()%60}min</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total:</span>
                    <span>${total().toLocaleString()}</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleWhatsApp} 
                  className="w-full px-4 py-3 rounded font-medium mb-2" 
                  style={{background: "var(--brand-yellow)"}}
                >
                  Contactar por WhatsApp
                </button>
                
                <button 
                  onClick={clear} 
                  className="w-full px-3 py-2 rounded border text-sm text-gray-600 hover:bg-gray-50"
                >
                  Limpiar carrito
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

