export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-8">
      <div className="container mx-auto p-6 text-center text-sm">
        © {new Date().getFullYear()} Consultorio Odontológico — Dirección · Teléfono
      </div>
    </footer>
  );
}

