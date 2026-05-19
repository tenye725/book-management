import Link from 'next/link';
import { type Book, toggleAvailability } from '@/libs/actions'; // 대출 토글 액션 불러오기

export default function BookCard({ book, role }: { book: Book; role: string }) {
    return (
        <div className="bg-[#fffaf0] border border-[#d9c7aa] rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[180px]">
            <div>
                <div className="flex justify-between items-start gap-2 mb-2">
                    <h4 className="font-bold text-gray-900 text-lg truncate">{book.title}</h4>
                    <span className={`px-2 py-0.5 text-[11px] font-bold rounded-full shrink-0 ${
                        book.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                        {book.available ? '대출 가능' : '대출 중'}
                    </span>
                </div>
                <div className="text-xs text-gray-500 space-y-0.5 font-medium">
                    <p>저자: <span className="text-gray-700">{book.author}</span></p>
                    <p>출판년도: <span className="text-gray-700">{book.bookTime || '-'}년</span></p>
                    <p className="font-mono text-[11px]">고유번호: {book.isbn || '-'}</p>
                </div>
            </div>

            <div className="border-t border-[#eadcc7] pt-3 mt-3 flex justify-between items-center">
                <span className="font-extrabold text-[#8b4513] text-base">{book.price?.toLocaleString()}원</span>

                {/* [역할 분기 처리]*/}
                {role === 'admin' ? (
                    // 1. 관리자모드
                    <Link
                        href={`/books/${book.id}?mode=edit`}
                        className="text-xs bg-[#92400e] hover:bg-[#7c3f1d] text-white font-bold px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                    >
                        도서 편집 →
                    </Link>
                ) : (
                    // 2. 이용자 모드
                    <form action={async () => {
                        'use server';
                        await toggleAvailability(book.id!, book.available);
                    }}>
                        <button
                            type="submit"
                            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                                book.available
                                    ? 'bg-[#efe3cf] hover:bg-[#7c3f1d] hover:text-white text-stone-600' // 대출 가능 시 
                                    : 'bg-[#d9c7aa] hover:bg-[#bfae95] text-stone-700'              // 대출 중일 때
                            }`}
                        >
                            {book.available ? '도서 대여' : '도서 반납'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}