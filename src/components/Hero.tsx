import LikeAnimation from './LikeAnimation';

export default function Hero() {
  return (
    <section className="relative px-6 py-32 bg-[linear-gradient(to_bottom,var(--border),var(--background))] text-center overflow-hidden">
      {/* Animación de likes transformándose en monedas */}
      <LikeAnimation />

      {/* Contenido */}
      <div className="relative z-10">
        <h2 className="text-5xl font-bold mb-4 text-[var(--foreground)] drop-shadow-lg">
          Gamifica tus likes con $DEGEN
        </h2>
        <p className="text-lg text-[color-mix(in_srgb,var(--foreground)_70%,transparent)] max-w-xl mx-auto">
          Da like con tip a los casts de <span className="text-[var(--secondary)] font-medium">@LikeToRaffle</span> entra automáticamente a una rifa semanal.
        </p>
        <a
          href="https://warpcast.com/liketoraffle"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 bg-[var(--secondary)] text-[var(--background)] font-semibold px-6 py-3 rounded-lg hover:bg-[color-mix(in_srgb,var(--secondary)_80%,transparent)] transition"
        >
          Participar ahora →
        </a>
      </div>
    </section>
  );
}