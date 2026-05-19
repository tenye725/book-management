import { getBookById, deleteBook } from '@/libs/actions';
import BookForm from '@/components/BookForm';
import Link from 'next/link';

interface DetailProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ mode?: string }>;
}

export default async function BookDetailPage({ params, searchParams }: DetailProps) {
    const { id } = await params;
    const { mode } = await searchParams;
    const book = await getBookById(id);

    if (!book) {
        return (
            <div className="border border-red-200 bg-red-50 text-red-600 rounded-xl p-6 text-center text-sm max-w-md mx-auto">
                <p className="font-bold">해당 도서 정보를 불러올 수 없습니다.</p>
                <Link href="/" className="underline text-xs mt-2 block font-medium">도서 목록으로 가기</Link>
            </div>
        );
    }

    if (mode === 'edit') {
        return (
            <div className="space-y-4">
                <div className="flex justify-between max-w-md mx-auto items-center px-1">
                    <h3 className="text-sm font-extrabold text-gray-700">🛠️ 정보 수정하기</h3>
                    <Link href={`/books/${id}`} className="text-xs text-gray-400 hover:underline">수정 취소</Link>
                </div>
                <BookForm initialData={book} isEdit={true} />
            </div>
        );
    }

    return (
        <div className="bg-[#fffaf0] border border-[#d9c7aa] rounded-2xl p-6 max-w-md mx-auto shadow-sm space-y-5">
            <div className="border-b border-gray-100 pb-3 flex justify-between items-start">
                <div>
          <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${book.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {book.available ? '대출 가능' : '대출 중'}
          </span>
                    <h2 className="text-2xl font-black text-gray-900 mt-1.5">{book.title}</h2>
                </div>
            </div>

            <div className="text-sm space-y-2.5 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex justify-between"><span className="text-gray-400">저자명</span> <span className="font-semibold text-gray-800">{book.author}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">출판년도</span> <span className="font-semibold text-gray-800">{book.bookTime || '-'}년</span></div>
                <div className="flex justify-between"><span className="text-gray-400">도서가격</span> <span className="font-extrabold text-[#8b4513]">{book.price?.toLocaleString()}원</span></div>
                <div className="flex justify-between"><span className="text-gray-400">ISBN번호</span> <span className="font-mono text-xs text-gray-700">{book.isbn || '-'}</span></div>
            </div>

            <div className="flex justify-between items-center pt-2 text-xs font-bold">
                <Link href="/" className="text-gray-500 hover:text-gray-800 underline">← 목록으로</Link>
                <div className="flex gap-2">
                    <Link href={`/books/${id}?mode=edit`} className="bg-[#b45309] hover:bg-[#7c3f1d] text-white px-3 py-1.5 rounded-lg transition-colors shadow-sm">
                        수정
                    </Link>
                    <form action={async () => {
                        'use server';
                        await deleteBook(id);
                    }}>
                        <button type="submit" className="bg-red-800 hover:bg-red-900 text-white px-3 py-1.5 rounded-lg transition-colors">
                            삭제
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
