import Topbar from '../components/Topbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeader from '../components/ui/SectionHeader';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import ScrollReveal from '../components/ScrollReveal';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  // Servicios destacados con imágenes
  const featuredServices = [
    {
      title: "Limpieza Dental Profesional",
      description: "Profilaxis completa con ultrasonido y pulido dental. Eliminación de sarro y placa bacteriana para una sonrisa saludable.",
      duration: "45 min",
      price: "150,000",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80&auto=format&fit=crop",
      slug: "limpieza-dental"
    },
    {
      title: "Blanqueamiento Dental LED",
      description: "Tecnología de última generación con luz LED. Resultados visibles en una sola sesión, dientes hasta 8 tonos más blancos.",
      duration: "60 min",
      price: "350,000",
      image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80&auto=format&fit=crop",
      slug: "blanqueamiento-dental"
    },
    {
      title: "Ortodoncia Invisible",
      description: "Alineadores transparentes personalizados. Corrección dental discreta y efectiva sin brackets metálicos.",
      duration: "Consulta",
      price: "Desde 2,500,000",
      image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80&auto=format&fit=crop",
      slug: "ortodoncia"
    }
  ];

  return (
    <>
      <Topbar />
      <Header />

      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center pt-16 md:pt-20 geometric-bg">
        {/* Diagonal lines decoration */}
        <div className="diagonal-lines"></div>
        
        {/* Dots pattern accent */}
        <div className="dots-accent"></div>

        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">
          <ScrollReveal direction="left">
            <div className="text-center md:text-left">
              <div className="text-xs md:text-sm text-gray-400 mb-4 md:mb-6 tracking-widest uppercase">
                Excelencia Odontológica
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-6 md:mb-8 leading-tight">
                <span className="text-white">Tu sonrisa,</span><br/>
                <span style={{color: '#F7B929'}}>nuestra pasión</span>
              </h1>
              <p className="text-base md:text-lg text-gray-400 mb-8 md:mb-10 leading-relaxed max-w-lg mx-auto md:mx-0">
                Tecnología avanzada y atención personalizada para cuidar tu salud dental con los más altos estándares de calidad.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto md:mx-0">
                <Link href="/#servicios" className="btn btn-primary text-sm md:text-base py-3 md:py-3">
                  Explorar Servicios
                </Link>
                <WhatsAppButton className="btn btn-wa text-sm md:text-base py-3 md:py-3" label="Agendar Cita" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="relative h-[400px] sm:h-[500px] md:h-[600px] rounded-xl overflow-hidden image-container">
              <Image 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1400&q=80&auto=format&fit=crop"
                alt="Consultorio moderno" 
                fill 
                className="object-cover" 
                priority 
              />
              <div className="image-overlay"></div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="divider container mx-auto"></div>

      {/* SERVICIOS DESTACADOS */}
      <section id="servicios" className="py-16 md:py-32 relative">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-20">
              <h2 className="h-section inline-block">Tratamientos destacados</h2>
              <p className="text-gray-400 mt-4 md:mt-6 text-base md:text-lg max-w-2xl mx-auto px-4">
                Soluciones odontológicas con enfoque preventivo y estético de vanguardia
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredServices.map((service, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <article className="card overflow-hidden group h-full flex flex-col">
                  <div className="relative h-48 sm:h-56 md:h-64 image-container">
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill 
                      className="object-cover"
                    />
                    <div className="image-overlay"></div>
                  </div>
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <h3 className="text-xl md:text-2xl font-light text-white mb-3 md:mb-4">{service.title}</h3>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-4 md:mb-6 flex-1">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between mb-4 md:mb-6 text-sm">
                      <span className="badge">{service.duration}</span>
                      <span className="text-[var(--brand-yellow)] font-medium text-sm md:text-base">${service.price}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href={`/servicios/${service.slug}`} className="btn btn-outline flex-1 text-center text-xs md:text-sm py-2 md:py-3">
                        Ver más
                      </Link>
                      <WhatsAppButton 
                        className="btn btn-wa flex-1 text-xs md:text-sm py-2 md:py-3"
                        message={`Hola, me interesa información sobre ${service.title}.`}
                        label="Consultar"
                      />
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-12 md:mt-16">
              <Link href="/servicios" className="btn btn-outline px-6 md:px-8 text-sm md:text-base">
                Ver Catálogo Completo
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="divider container mx-auto"></div>

      {/* QUIÉNES SOMOS */}
      <section id="nosotros" className="py-16 md:py-32 relative">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-20">
              <h2 className="h-section inline-block">Quiénes Somos</h2>
              <p className="text-gray-400 mt-4 md:mt-6 text-base md:text-lg max-w-3xl mx-auto px-4">
                Equipo de profesionales especializados en el cuidado de la salud bucal
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="scale">
            <div className="card p-6 md:p-12 max-w-4xl mx-auto mb-12 md:mb-16">
              <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 mb-4 md:mb-6">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[var(--brand-yellow)] to-[var(--brand-brown)] flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                  <svg className="w-7 h-7 md:w-8 md:h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-3 md:mb-4">
                    Como empresa de odontología, somos un equipo de profesionales especializados en el cuidado de la salud bucal. Nuestro objetivo principal es proporcionar servicios odontológicos de alta calidad para mantener la salud oral y el bienestar general de nuestros pacientes.
                  </p>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    Nos dedicamos a ofrecer una amplia gama de tratamientos y servicios que incluyen desde la limpieza dental y los procedimientos de restauración hasta la ortodoncia y la odontología estética. Además, nos esforzamos por mantenernos actualizados con las últimas tecnologías y técnicas en el campo de la odontología para asegurar el mejor cuidado posible para nuestros pacientes.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            <ScrollReveal direction="left">
              <article className="card p-6 md:p-10 h-full text-center md:text-left">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[var(--brand-yellow)] to-[var(--brand-brown)] flex items-center justify-center mb-5 md:mb-6 mx-auto md:mx-0">
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-light text-[var(--brand-yellow)] mb-4 md:mb-6">Misión</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  Proporcionar un cuidado dental integral y de alta calidad que mejore la salud bucal y el bienestar general de nuestros pacientes. Nos dedicamos a ofrecer tratamientos personalizados, utilizando tecnología avanzada y técnicas innovadoras, en un ambiente acogedor y profesional.
                </p>
              </article>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <article className="card p-6 md:p-10 h-full text-center md:text-left">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[var(--brand-yellow)] to-[var(--brand-brown)] flex items-center justify-center mb-5 md:mb-6 mx-auto md:mx-0">
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-light text-[var(--brand-yellow)] mb-4 md:mb-6">Visión</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  Ser reconocidos como líderes en el cuidado dental integral y preventivo, estableciendo un nuevo estándar de excelencia en la atención odontológica. Aspiramos a transformar la experiencia dental de nuestros pacientes mediante la incorporación de tecnología de punta y tratamientos innovadores, asegurando que cada visita sea cómoda y efectiva.
                </p>
              </article>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="divider container mx-auto"></div>

      {/* CTA FINAL */}
      <section id="agendar" className="py-16 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="scale">
            <div className="max-w-3xl mx-auto text-center card p-8 md:p-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 md:mb-6">
                <span className="text-white">¿Listo para</span><br/>
                <span style={{color: '#F7B929'}}>tu mejor sonrisa?</span>
              </h2>
              <p className="text-gray-400 text-base md:text-lg mb-8 md:mb-10 leading-relaxed px-2">
                Agenda tu cita y descubre una experiencia odontológica premium
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md mx-auto">
                <WhatsAppButton 
                  className="btn btn-primary px-6 md:px-8 text-sm md:text-base py-3" 
                  label="Agendar por WhatsApp" 
                />
                <a 
                  href="mailto:riveragonzalezjoshua404@gmail.com" 
                  className="btn btn-outline px-6 md:px-8 text-sm md:text-base py-3"
                >
                  Escribir correo
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}