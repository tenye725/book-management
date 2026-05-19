import { getBooks, type Book } from '@/libs/actions';
import BookCard from '@/components/BookCard';
import Link from 'next/link';

interface PageProps {
    searchParams: Promise<{ type?: string; keyword?: string; role?: string }>;
}

export default async function HomePage({ searchParams }: PageProps) {
    const { type = 'title', keyword = '', role = 'user' } = await searchParams;
    const books = await getBooks(type, keyword);

    // 버튼 클릭 시 전환될 다음 역할을 미리 계산해 둡니다.
    const nextRole = role === 'user' ? 'admin' : 'user';

    return (
        <div className="space-y-6">

            <div className="flex justify-between items-end border-b border-[#d9c7aa] pb-3 px-1 mt-2">
                <h2 className="text-2xl font-black text-[#7c3f1d] tracking-tight">도서 목록</h2>

                <Link
                    href={`/?type=${type}&keyword=${keyword}&role=${nextRole}`}
                    className={`
            relative inline-block px-4 py-2 text-xs font-bold text-white rounded-xl transition-all select-none
            border-b-4 active:border-b-0 active:translate-y-[4px] hover:brightness-110 
            ${role === 'user'
                        ? 'bg-[#8b4513] border-[#5c2e0b]' // 이용자 모드: 기본 브라운 톤
                        : 'bg-[#b45309] border-[#78350f]' // 관리자 모드: 조금 더 밝은 앰버 브라운 톤
                    }
          `}
                >
                    {role === 'user' ? '이용자 모드' : '관리자 모드'}
                </Link>
            </div>

            <form method="GET" action="/" className="flex gap-2 mx-auto bg-[#fffaf0] border border-[#d9c7aa] p-2 rounded-xl shadow-sm">
                <input type="hidden" name="role" value={role} />

                <select name="type" defaultValue={type} className="border-0 bg-transparent px-2 text-xs font-bold focus:outline-none text-stone-700 cursor-pointer">
                    <option value="title">도서명</option>
                    <option value="author">저자명</option>
                    <option value="bookTime">출판년도</option>
                </select>

                <div className="w-px bg-[#eadcc7] my-1"></div>

                <input
                    type="text"
                    name="keyword"
                    defaultValue={keyword}
                    placeholder="찾으시는 도서를 입력하세요..."
                    className="flex-1 px-2 py-1 text-xs bg-transparent focus:outline-none text-stone-800 placeholder-stone-400"
                />

                <button type="submit" className="bg-[#7c3f1d] hover:bg-[#633217] text-white px-5 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm cursor-pointer">
                    검색
                </button>
            </form>

            <div>
                {books.length === 0 ? (
                    <div className="text-center py-16 text-stone-400 bg-[#fffaf0] border border-[#d9c7aa] border-dashed rounded-2xl text-sm">
                        도서관에 등록된 도서 데이터가 없습니다.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {books.map((book: Book) => (
                            <BookCard key={book.id} book={book} role={role} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}