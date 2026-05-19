'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBook, updateBook, type Book } from '@/libs/actions';

interface BookFormProps {
    initialData?: Book;
    isEdit?: boolean;
}

export default function BookForm({ initialData, isEdit = false }: BookFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        author: initialData?.author || '',
        price: initialData?.price || 0,
        bookTime: initialData?.bookTime || '',
        isbn: initialData?.isbn || '978-89XXXXXXXXX (저장 시 자동발급)',
        available: initialData?.available ?? true,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.bookTime && !/^\d{4}$/.test(formData.bookTime)) {
            alert('출판년도는 반드시 숫자 4글자로 입력해 주세요! (예: 2026)');
            return;
        }

        if (isEdit && initialData?.id) {
            const success = await updateBook(initialData.id, formData);
            if (success) {
                alert('성공적으로 수정되었습니다.');
                router.push('/');
            }
        } else {
          //백엔드가 ISBN를 생성
            const submitData = { ...formData, isbn: '' };
            const success = await createBook(submitData);
            if (success) {
                alert('새로운 도서가 등록되었습니다.');
                router.push('/');
            }
        }
    };

    const inputStyle = "w-full border border-[#d9c7aa] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#c08a3e] focus:border-transparent transition-all bg-white text-stone-800";

    return (
        <form onSubmit={handleSubmit} className="bg-[#fffaf0] border border-[#d9c7aa] rounded-2xl p-6 max-w-md mx-auto shadow-sm space-y-4">
            <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">도서 제목 *</label>
                <input type="text" required className={inputStyle} value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">저자명 *</label>
                <input type="text" required className={inputStyle} value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">가격(원) *</label>
                    <input
                        type="text" // 실시간 글자수 및 값 제어를 위해 text 타입지정
                        required
                        className={inputStyle}
                        value={formData.price === 0 ? '' : formData.price.toLocaleString()} // 천단위 콤마(,)까지 넣어주면 눈이 대만족합니다.
                        placeholder="0"
                        onChange={(e) => {
                            // 1. 문자차별
                            const rawValue = e.target.value.replace(/[^0-9]/g, '');
                            const numValue = Number(rawValue);
                            // 2. 999,999,999을 초과하는 것을 return처리하며 무시한다 .
                            if (numValue > 999999999) return;
                            // max치를 넘지 않는 숫자로(과하게 값이 크면 버그) 입력
                            setFormData({ ...formData, price: numValue });
                        }}
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">출판년도 *</label>
                    {/*4자리 제한 */}
                    <input
                        type="text"
                        required
                        maxLength={4}
                        placeholder="예: 2026"
                        className={inputStyle}
                        value={formData.bookTime}
                        onChange={(e) => setFormData({ ...formData, bookTime: e.target.value.replace(/[^0-9]/g, '') })}
                    />
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">ISBN (도서 고유코드)</label>
                {/*입력 차단 */}
                <input
                    type="text"
                    disabled
                    className="w-full border border-[#c8b79b] rounded-lg px-3 py-2 text-sm bg-[#eadcc7] text-stone-600 font-bold cursor-not-allowed shadow-inner select-none"
                    value={formData.isbn}
                />
            </div>
            <div className="flex items-center gap-2 pt-1">
                <input type="checkbox" id="available" className="w-4 h-4 rounded accent-[#7c3f1d] focus:ring-[#c08a3e] border-[#d9c7aa] cursor-pointer" checked={formData.available} onChange={(e) => setFormData({ ...formData, available: e.target.checked })} />
                <label htmlFor="available" className="text-xs font-bold text-gray-700 select-none cursor-pointer">즉시 대출 가능한 상태로 설정</label>
            </div>
            <button type="submit" className="w-full bg-[#7c3f1d] hover:bg-[#5f2f16] text-white py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm mt-2 cursor-pointer">
                {isEdit ? '변경사항 저장하기' : '새 도서 등록하기'}
            </button>
        </form>
    );
}