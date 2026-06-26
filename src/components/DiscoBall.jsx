// Анимированный диско-шар — чистый CSS, адаптивный, без тяжёлых ресурсов.
// Искры генерируются по кругу программно.

const SPARKS = Array.from({ length: 14 }).map((_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  const radius = 54 + (i % 3) * 6; // % от контейнера
  return {
    left: `${50 + Math.cos(angle) * radius}%`,
    top: `${50 + Math.sin(angle) * radius}%`,
    delay: `${(i * 0.27).toFixed(2)}s`,
    scale: 0.6 + ((i * 7) % 10) / 10,
  };
});

export default function DiscoBall({ className = '' }) {
  return (
    <div className={`disco ${className}`} aria-hidden="true">
      <span className="disco__rays" />
      <span className="disco__halo" />

      <div className="disco__ball">
        <span className="disco__tint" />
        <span className="disco__facets" />
        <span className="disco__shine" />
        <span className="disco__gloss" />
      </div>
      <span className="disco__pin" />

      {SPARKS.map((s, i) => (
        <span
          key={i}
          className="spark"
          style={{
            left: s.left,
            top: s.top,
            animationDelay: s.delay,
            transform: `translate(-50%,-50%) scale(${s.scale})`,
          }}
        />
      ))}
    </div>
  );
}
