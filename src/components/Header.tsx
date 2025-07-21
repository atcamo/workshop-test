'use client';

export default function Header() {
  return (
    <header className="w-full px-6 py-4 flex justify-between items-center border-b border-blue-800 sticky top-0 bg-[#0F172A]/80 backdrop-blur z-10">
      <div className="flex items-center">
        <img
          src="/logo.png"
          alt="Like to Raffle Logo"
          className="h-20 w-auto mr-2"
        />
        <span className="text-2xl font-bold text-lime-400 hidden md:inline">Like to Raffle</span>
      </div>
      <a
        href="https://warpcast.com/liketoraffle"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-lime-400 text-black font-semibold px-4 py-2 rounded hover:bg-lime-300 transition"
      >
        Ir a Farcaster↗
      </a>
    </header>
  );
}