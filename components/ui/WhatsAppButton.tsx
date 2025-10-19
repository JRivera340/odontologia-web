import { MessageCircle } from "lucide-react";
type Props = { phone?: string; message?: string; label?: string; className?: string; };
export default function WhatsAppButton({
  phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "+573113440504",
  message = "¡Hola! Me gustaría obtener información sobre sus servicios odontológicos.",
  label = "WhatsApp",
  className = ""
}: Props){
  const href = `https://wa.me/${phone.replace(/\D/g,"")}?text=${encodeURIComponent(message)}`;
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`btn btn-wa gap-2 ${className}`} aria-label={label}>
      <MessageCircle size={18} /> {label}
    </a>
  );
}
