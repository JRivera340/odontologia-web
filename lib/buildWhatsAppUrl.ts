// lib/buildWhatsAppUrl.ts
type Svc = { title: string; price: number; durationMin?: number };

export default function buildWhatsAppUrl(phone: string, services: Svc[]) {
  const lines = ['Hola, estoy interesad@ en estos servicios:'];
  let total = 0;
  let totalMin = 0;
  services.forEach(s => {
    lines.push(`- ${s.title} — $${s.price}`);
    total += s.price;
    totalMin += s.durationMin || 0;
  });
  lines.push(`Total estimado: $${total}`);
  lines.push(`Tiempo total estimado: ${Math.floor(totalMin/60)}h ${totalMin%60}min`);
  const message = encodeURIComponent(lines.join('\n'));
  const normalized = phone.replace(/\D/g, '');
  return `https://wa.me/${normalized}?text=${message}`;
}

