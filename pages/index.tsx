import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-white to-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{color: "var(--brand-brown)"}}>
                Consultorio Odontológico
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Cuidado dental integral y de alta calidad con tecnología avanzada 
                en un ambiente acogedor y profesional que genera confianza y tranquilidad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/servicios" 
                  className="px-8 py-4 rounded-lg text-center font-semibold transition-all hover:shadow-lg"
                  style={{background: "var(--brand-yellow)", color: "var(--brand-brown)"}}
                >
                  Ver Nuestros Servicios
                </Link>
                <a 
                  href="https://wa.me/573113440504?text=Buenos%20días.%20Me%20gustaría%20agendar%20una%20cita%20para%20consulta%20odontológica.%20¿Cuál%20sería%20su%20disponibilidad%20más%20próxima?%20Quedo%20atento%20a%20su%20respuesta.%20Gracias." 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-8 py-4 rounded-lg border-2 text-center font-semibold transition-all hover:shadow-lg"
                  style={{borderColor: "var(--brand-brown)", color: "var(--brand-brown)"}}
                >
                  Agenda tu Cita
                </a>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop&crop=center" 
                alt="Consultorio odontológico moderno" 
                fill 
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Nosotros - Misión y Visión */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: "var(--brand-brown)"}}>
              Sobre Nosotros
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprometidos con la excelencia en el cuidado dental y el bienestar de nuestros pacientes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Misión */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4" style={{background: "var(--brand-yellow)"}}>
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold" style={{color: "var(--brand-brown)"}}>
                  Nuestra Misión
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Proporcionar un cuidado dental integral y de alta calidad que mejore la salud bucal 
                y el bienestar general de los pacientes, ofreciendo tratamientos personalizados con 
                tecnología avanzada y técnicas innovadoras en un ambiente acogedor y profesional 
                que genere confianza y tranquilidad.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4" style={{background: "var(--brand-yellow)"}}>
                  <span className="text-2xl">🌟</span>
                </div>
                <h3 className="text-2xl font-bold" style={{color: "var(--brand-brown)"}}>
                  Nuestra Visión
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Ser reconocidos como líderes en el cuidado dental integral y preventivo en Bogotá D.C., 
                estableciendo un nuevo estándar de excelencia en la atención odontológica mediante la 
                incorporación constante de tecnología de punta, tratamientos innovadores y un enfoque 
                centrado en la experiencia del paciente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores Corporativos */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: "var(--brand-brown)"}}>
              Nuestros Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Los principios que guían nuestro trabajo y definen nuestra filosofía de atención
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Profesionalismo */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto" style={{background: "var(--brand-yellow)"}}>
                <span className="text-2xl">👨‍⚕️</span>
              </div>
              <h3 className="text-xl font-bold text-center mb-4" style={{color: "var(--brand-brown)"}}>
                Profesionalismo
              </h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Atención confiable basada en estándares éticos, científicos y protocolos 
                de calidad internacional.
              </p>
            </div>

            {/* Cuidado */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto" style={{background: "var(--brand-yellow)"}}>
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-bold text-center mb-4" style={{color: "var(--brand-brown)"}}>
                Cuidado
              </h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Compromiso genuino con la salud, el bienestar y la comodidad de cada 
                paciente durante todo su proceso de atención.
              </p>
            </div>

            {/* Innovación */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto" style={{background: "var(--brand-yellow)"}}>
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-center mb-4" style={{color: "var(--brand-brown)"}}>
                Innovación
              </h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Adopción continua de nuevas tecnologías, materiales de última generación 
                y prácticas odontológicas modernas.
              </p>
            </div>

            {/* Confianza */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto" style={{background: "var(--brand-yellow)"}}>
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-center mb-4" style={{color: "var(--brand-brown)"}}>
                Confianza
              </h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Transparencia absoluta en la comunicación, claridad en los procedimientos 
                y calidez en el trato humano.
              </p>
            </div>

            {/* Estética y Armonía */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow lg:col-span-1 md:col-span-2 lg:col-start-2">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto" style={{background: "var(--brand-yellow)"}}>
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-center mb-4" style={{color: "var(--brand-brown)"}}>
                Estética y Armonía
              </h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Búsqueda de la excelencia estética tanto en los tratamientos dentales 
                como en la imagen visual y ambiental de la clínica.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Destacados */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: "var(--brand-brown)"}}>
              Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tratamientos especializados con tecnología de punta para tu salud dental
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Servicio 1 */}
            <div className="text-center group">
              <div className="relative h-48 mb-6 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                <Image 
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop" 
                  alt="Limpieza dental profesional" 
                  fill 
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{color: "var(--brand-brown)"}}>
                Limpieza Dental
              </h3>
              <p className="text-gray-600 mb-4">
                Limpieza profesional completa con pulido y recomendaciones personalizadas.
              </p>
              <p className="font-semibold" style={{color: "var(--brand-brown)"}}>
                45 min • $80,000
              </p>
            </div>

            {/* Servicio 2 */}
            <div className="text-center group">
              <div className="relative h-48 mb-6 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                <Image 
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop" 
                  alt="Blanqueamiento dental" 
                  fill 
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{color: "var(--brand-brown)"}}>
                Blanqueamiento
              </h3>
              <p className="text-gray-600 mb-4">
                Tratamiento de blanqueamiento profesional en consultorio con resultados inmediatos.
              </p>
              <p className="font-semibold" style={{color: "var(--brand-brown)"}}>
                60 min • $200,000
              </p>
            </div>

            {/* Servicio 3 */}
            <div className="text-center group">
              <div className="relative h-48 mb-6 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                <Image 
                  src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=300&fit=crop" 
                  alt="Ortodoncia" 
                  fill 
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{color: "var(--brand-brown)"}}>
                Ortodoncia
              </h3>
              <p className="text-gray-600 mb-4">
                Corrección de la posición dental con brackets tradicionales y estéticos.
              </p>
              <p className="font-semibold" style={{color: "var(--brand-brown)"}}>
                Consulta • $50,000
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/servicios" 
              className="inline-block px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-lg"
              style={{background: "var(--brand-yellow)", color: "var(--brand-brown)"}}
            >
              Ver Todos los Servicios
            </Link>
          </div>
        </div>
      </section>

      {/* Galería del Consultorio */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: "var(--brand-brown)"}}>
              Nuestras Instalaciones
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Espacios modernos y cómodos diseñados para tu tranquilidad y bienestar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Image 
                src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop" 
                alt="Sala de espera moderna" 
                fill 
                style={{ objectFit: 'cover' }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end">
                <p className="text-white font-semibold p-4">Sala de Espera</p>
              </div>
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Image 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop" 
                alt="Consultorio principal" 
                fill 
                style={{ objectFit: 'cover' }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end">
                <p className="text-white font-semibold p-4">Consultorio Principal</p>
              </div>
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Image 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop" 
                alt="Equipos modernos" 
                fill 
                style={{ objectFit: 'cover' }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end">
                <p className="text-white font-semibold p-4">Tecnología Avanzada</p>
              </div>
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Image 
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop" 
                alt="Área de esterilización" 
                fill 
                style={{ objectFit: 'cover' }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end">
                <p className="text-white font-semibold p-4">Área de Esterilización</p>
              </div>
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Image 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop" 
                alt="Recepción" 
                fill 
                style={{ objectFit: 'cover' }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end">
                <p className="text-white font-semibold p-4">Recepción</p>
              </div>
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Image 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop" 
                alt="Consultorio secundario" 
                fill 
                style={{ objectFit: 'cover' }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end">
                <p className="text-white font-semibold p-4">Consultorio Secundario</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: "var(--brand-brown)"}}>
            ¿Listo para cuidar tu sonrisa?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Agenda tu cita hoy mismo y descubre la diferencia de un cuidado dental profesional y personalizado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/573113440504?text=Buenos%20días.%20Me%20gustaría%20agendar%20una%20cita%20para%20consulta%20odontológica.%20¿Cuál%20sería%20su%20disponibilidad%20más%20próxima?%20Quedo%20atento%20a%20su%20respuesta.%20Gracias." 
              target="_blank" 
              rel="noreferrer"
              className="px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-lg"
              style={{background: "var(--brand-yellow)", color: "var(--brand-brown)"}}
            >
              Contactar por WhatsApp
            </a>
            <Link 
              href="/servicios" 
              className="px-8 py-4 rounded-lg border-2 font-semibold transition-all hover:shadow-lg"
              style={{borderColor: "var(--brand-brown)", color: "var(--brand-brown)"}}
            >
              Ver Servicios y Precios
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}