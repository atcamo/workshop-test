import LikeAnimation from './LikeAnimation';

export default function Hero() {
  return (
    <section className="relative px-6 py-32 bg-gradient-to-b from-[#1E293B] to-[#0F172A] text-center overflow-hidden">
      {/* Animación de likes transformándose en monedas */}
      <LikeAnimation />

      {/* Contenido */}
      <div className="relative z-10">
        <h2 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
          Gamifica tus likes con $DEGEN
        </h2>
        <p className="text-lg text-gray-300 max-w-xl mx-auto">
          Da like con tip a los casts de <span className="text-white font-medium">@LikeToRaffle</span> entra automáticamente a una rifa semanal.
        </p>
        <a
          href="https://warpcast.com/liketoraffle"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 bg-lime-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-lime-300 transition"
        >
          Participar ahora →
        </a>
      </div>
    </section>
  );
}