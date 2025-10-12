import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto p-6">
        <section className="py-12">
          <h1 className="text-3xl font-bold" style={{color: "var(--brand-brown)"}}>
            Consultorio Odontológico
          </h1>
          <p className="mt-4">
            Proporcionamos cuidado dental integral y de alta calidad...
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

