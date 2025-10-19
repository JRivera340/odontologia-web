type Props = { title: string; subtitle?: string; center?: boolean; };
export default function SectionHeader({ title, subtitle, center=true }: Props){
  return (
    <div className={`${center ? "text-center" : ""} mb-16`}>
      <h2 className="h-section inline-block">{title}</h2>
      {subtitle && <p className="text-lg text-gray-400 mt-6 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
    </div>
  );
}
