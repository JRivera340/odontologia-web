// lib/buildWhatsAppUrl.ts
type Svc = { title: string; price: number; durationMin?: number };

export default function buildWhatsAppUrl(phone: string, services: Svc[]) {
  const lines = [
    '¡Buenas! Me gustaría solicitar información sobre los siguientes servicios odontológicos:',
    ''
  ];
  let total = 0;
  let totalMin = 0;
  services.forEach(s => {
    lines.push(`• ${s.title} — $${s.price.toLocaleString()}`);
    total += s.price;
    totalMin += s.durationMin || 0;
  });
  lines.push('');
  lines.push(`*Total estimado:* $${total.toLocaleString()}`);
  lines.push(`*Duración total aproximada:* ${Math.floor(totalMin/60)}h ${totalMin%60}min`);
  lines.push('');
  lines.push('Quedo atento a su respuesta para coordinar una cita. ¡Gracias!');
  const message = encodeURIComponent(lines.join('\n'));
  const normalized = phone.replace(/\D/g, '');
  return `https://wa.me/${normalized}?text=${message}`;
}

