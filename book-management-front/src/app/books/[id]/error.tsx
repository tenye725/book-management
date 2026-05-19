'use client';

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error('[에러로그]', error.message);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center border border-gray-200 rounded-xl p-6 max-w-sm mx-auto my-10 space-y-3 bg-white text-center">
            <h2 className="text-base font-bold text-gray-900">문제가 발생했습니다.</h2>
            <p className="text-xs text-gray-500">{error.message}</p>

            <div className="flex gap-2 w-full pt-2">
                <button onClick={reset} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-xs font-bold transition-colors">
                    다시 시도
                </button>
                <Link href='/' className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-2 rounded-lg text-xs font-bold border text-center">
                    홈으로
                </Link>
            </div>
        </div>
    );
}