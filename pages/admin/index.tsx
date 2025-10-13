import { GetServerSideProps } from 'next';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

const SECRET = process.env.JWT_SECRET || 'dev-secret';

interface Service {
  id: number;
  title: string;
  slug: string;
  shortDesc: string;
  longDesc?: string;
  durationMin: number;
  price: number;
  imageUrl?: string;
  published: boolean;
}

export default function AdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDesc: '',
    longDesc: '',
    durationMin: '',
    price: '',
    imageUrl: '',
    published: true
  });

  // Image upload states
  const [uploading, setUploading] = useState(false);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const res = await fetch('/api/admin/services');
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (err) {
      console.error('Error loading services:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout');
    router.push('/admin/login');
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      slug: service.slug,
      shortDesc: service.shortDesc,
      longDesc: service.longDesc || '',
      durationMin: service.durationMin.toString(),
      price: service.price.toString(),
      imageUrl: service.imageUrl || '',
      published: service.published
    });
    setUploadPreview(service.imageUrl || null);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este servicio?')) return;
    
    try {
      const res = await fetch(`/api/admin/services?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        loadServices();
      }
    } catch (err) {
      alert('Error al eliminar');
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen válida');
      return;
    }

    // Validate file size (3MB)
    if (file.size > 3 * 1024 * 1024) {
      alert('La imagen debe ser menor a 3MB');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data?.url) {
        setUploadPreview(data.url);
        setFormData(prev => ({ ...prev, imageUrl: data.url }));
      } else {
        alert(data.error || 'Error al subir la imagen');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Error de conexión al subir la imagen');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const method = editingService ? 'PUT' : 'POST';
    const body = editingService 
      ? { id: editingService.id, ...formData }
      : formData;

    try {
      const res = await fetch('/api/admin/services', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        setShowForm(false);
        setEditingService(null);
        setFormData({
          title: '',
          slug: '',
          shortDesc: '',
          longDesc: '',
          durationMin: '',
          price: '',
          imageUrl: '',
          published: true
        });
        setUploadPreview(null);
        loadServices();
      } else {
        const data = await res.json();
        alert(data.error || 'Error al guardar');
      }
    } catch (err) {
      alert('Error de conexión');
    }
  };

  return (
    <>
      <Head>
        <title>Panel Admin - Consultorio Odontológico</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold" style={{color: "var(--brand-brown)"}}>
              Panel Administrativo
            </h1>
            <button 
              onClick={handleLogout}
              className="px-3 py-1 border rounded hover:bg-gray-50"
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Gestión de Servicios</h2>
            <button
              onClick={() => {
                setEditingService(null);
                setFormData({
                  title: '',
                  slug: '',
                  shortDesc: '',
                  longDesc: '',
                  durationMin: '',
                  price: '',
                  imageUrl: '',
                  published: true
                });
                setUploadPreview(null);
                setShowForm(true);
              }}
              className="px-4 py-2 rounded font-medium"
              style={{background: "var(--brand-yellow)"}}
            >
              + Nuevo Servicio
            </button>
          </div>

          {showForm && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">
                {editingService ? 'Editar Servicio' : 'Nuevo Servicio'}
              </h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Título *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Slug *</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Descripción corta *</label>
                  <input
                    type="text"
                    value={formData.shortDesc}
                    onChange={(e) => setFormData({...formData, shortDesc: e.target.value})}
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Descripción larga</label>
                  <textarea
                    value={formData.longDesc}
                    onChange={(e) => setFormData({...formData, longDesc: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Duración (min) *</label>
                  <input
                    type="number"
                    value={formData.durationMin}
                    onChange={(e) => setFormData({...formData, durationMin: e.target.value})}
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Precio *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Imagen del servicio</label>
                  
                  {/* Image URL input (PRIMARY METHOD) */}
                  <div className="space-y-3">
                    <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm">
                      <p className="font-medium text-blue-900 mb-1">📌 Usa URLs de imágenes externas</p>
                      <p className="text-blue-700 text-xs">
                        Recomendado: <a href="https://unsplash.com" target="_blank" className="underline">Unsplash</a>, 
                        <a href="https://imgur.com" target="_blank" className="underline ml-1">Imgur</a>, o sube a 
                        <a href="https://cloudinary.com" target="_blank" className="underline ml-1">Cloudinary</a>
                      </p>
                    </div>

                    <input
                      type="text"
                      value={formData.imageUrl}
                      onChange={(e) => {
                        setFormData({...formData, imageUrl: e.target.value});
                        setUploadPreview(e.target.value || null);
                      }}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full px-3 py-2 border rounded"
                    />

                    {/* Image preview */}
                    {uploadPreview && (
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Vista previa:</p>
                        <div className="relative w-48 h-32 border rounded overflow-hidden bg-gray-50">
                          <Image 
                            src={uploadPreview} 
                            alt="Preview" 
                            fill
                            style={{ objectFit: 'cover' }}
                            onError={() => {
                              alert('❌ Error al cargar la imagen. Verifica que la URL sea válida y pública.');
                              setUploadPreview(null);
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* File upload (optional, requires Cloudinary) */}
                    <details className="text-sm">
                      <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                        ⚠️ Subir archivo (requiere configurar Cloudinary)
                      </summary>
                      <div className="mt-2 space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            disabled={uploading}
                            className="flex-1 px-3 py-2 border rounded text-sm"
                          />
                          {uploading && (
                            <span className="px-3 py-2 text-sm text-gray-600">Subiendo...</span>
                          )}
                        </div>
                        <p className="text-xs text-red-600">
                          ⚠️ Si no has configurado CLOUDINARY_* en .env.local, el upload fallará
                        </p>
                      </div>
                    </details>
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({...formData, published: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium">Publicado</span>
                  </label>
                </div>
                <div className="col-span-2 flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded font-medium"
                    style={{background: "var(--brand-yellow)"}}
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingService(null);
                      setUploadPreview(null);
                    }}
                    className="px-4 py-2 rounded border"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {loading ? (
            <p>Cargando...</p>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">Título</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Duración</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Precio</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Estado</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {services.map(service => (
                    <tr key={service.id}>
                      <td className="px-4 py-3">
                        <div className="font-medium">{service.title}</div>
                        <div className="text-sm text-gray-500">{service.slug}</div>
                      </td>
                      <td className="px-4 py-3">{service.durationMin} min</td>
                      <td className="px-4 py-3">${service.price.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs ${service.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {service.published ? 'Publicado' : 'Borrador'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleEdit(service)}
                          className="text-blue-600 hover:underline mr-3"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(service.id)}
                          className="text-red-600 hover:underline"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = req.headers.cookie;
  if (!cookies) return { redirect: { destination: '/admin/login', permanent: false } };
  
  try {
    const { token } = parse(cookies || '');
    if (!token) {
      return { redirect: { destination: '/admin/login', permanent: false } };
    }
    jwt.verify(token, SECRET);
    return { props: {} };
  } catch (e) {
    return { redirect: { destination: '/admin/login', permanent: false } };
  }
};

