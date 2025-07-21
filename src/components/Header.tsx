'use client';

export default function Header() {
  return (
    <header className="w-full px-6 py-4 flex justify-between items-center border-b border-[var(--border)] sticky top-0 bg-[var(--background)]/80 backdrop-blur z-10">
      <div className="flex items-center">
        <img
          src="/logo.png"
          alt="Like to Raffle Logo"
          className="h-10 w-auto mr-2"
        />
        <span className="text-2xl font-bold text-[var(--foreground)] hidden md:inline">Like to Raffle</span>
      </div>
      <a
        href="https://warpcast.com/liketoraffle"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[var(--secondary)] text-[var(--background)] font-semibold px-4 py-2 rounded hover:bg-[color-mix(in_srgb,var(--secondary)_80%,transparent)] transition"
      >
        Ir a Farcaster 
      </a>
    </header>
  );
}
