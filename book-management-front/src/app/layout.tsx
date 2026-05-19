import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
    title: '도서 관리 시스템',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" suppressHydrationWarning>
        <body className="bg-[#f8f1e7] text-stone-800 min-h-screen flex flex-col" suppressHydrationWarning>

        <header className="bg-[#fffaf0] border-b border-[#d9c7aa] sticky top-0 z-50 shadow-sm">
            <div className="max-w-5xl mx-auto px-4 h-16 flex justify-between items-center">
                <Link href="/" className="text-xl font-black text-[#7c3f1d] tracking-tight">
                    📚 BOOK MANAGEMENT
                </Link>
                <nav className="flex items-center gap-6 text-sm font-semibold">
                    <Link href="/" className="text-stone-600 hover:text-[#7c3f1d] transition-colors">도서목록 </Link>
                    <Link href="/register" className="bg-[#7c3f1d] hover:bg-[#5f2f16] text-white px-4 py-2 rounded-lg text-xs transition-colors">
                        새 도서 등록
                    </Link>
                </nav>
            </div>
        </header>

        <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
            {children}
        </main>

        <footer className="bg-[#fffaf0] border-t border-[#d9c7aa] py-4 text-center text-xs text-stone-400">
            © 2026 도서 관리 시스템. All Rights Reserved.
        </footer>
        </body>
        </html>
    );
}
