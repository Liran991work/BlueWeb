import Link from "next/link";

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-sm">
      <Link href="/" className="text-sm font-semibold tracking-tight">
        BlueWeb
      </Link>
      <div className="flex items-center gap-6">
        <Link
          href="/studio"
          className="text-sm text-white/60 transition-colors hover:text-white"
        >
          Studio
        </Link>
        <Link
          href="/library"
          className="text-sm text-white/60 transition-colors hover:text-white"
        >
          Component Library
        </Link>
      </div>
    </header>
  );
}
