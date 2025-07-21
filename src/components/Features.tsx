export default function Features() {
  return (
    <section className="px-6 py-16 text-center" style={{ background: 'var(--background)' }}>
      <h3 className="text-3xl font-bold mb-12 text-white">¿Cómo funciona?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="p-6 rounded-lg shadow-lg" style={{ background: 'var(--border)' }}>
          <div className="text-4xl mb-4">💜</div>
          <h4 className="text-xl font-semibold mb-2">Like con tip</h4>
          <p className="text-gray-300 text-sm">
            Usa la mini-app de Degen para dar like con tip a los casts de @LikeToRaffle.
          </p>
        </div>

        <div className="p-6 rounded-lg shadow-lg" style={{ background: 'var(--border)' }}>
          <div className="text-4xl mb-4">🎟️</div>
          <h4 className="text-xl font-semibold mb-2">Tickets automáticos</h4>
          <p className="text-gray-300 text-sm">
            Cada tip que envías se convierte automáticamente en un ticket para la rifa semanal.
          </p>
        </div>

        <div className="p-6 rounded-lg shadow-lg" style={{ background: 'var(--border)' }}>
          <div className="text-4xl mb-4">🏆</div>
          <h4 className="text-xl font-semibold mb-2">Premios en $DEGEN</h4>
          <p className="text-gray-300 text-sm">
            Los ganadores se anuncian cada semana y reciben premios en $DEGEN directo a su wallet.
          </p>
        </div>
      </div>
    </section>
  );
}