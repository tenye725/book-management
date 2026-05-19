'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export interface Book {
    id?: number;
    title: string;
    author: string;
    price: number;
    bookTime: string;
    isbn: string;
    available: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080';

// 1. 도서 전체 조회 (조회 실패 시 error.tsx 띄움)
export async function getBooks(searchType?: string, keyword?: string): Promise<Book[]> {
    let url = `${API_URL}/api/books`;
    if (searchType && keyword) {
        url += `?${searchType}=${encodeURIComponent(keyword)}`;
    }

    try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error(`서버 응답 오류 (코드: ${res.status})`);
        }
        return res.json();
    } catch (error) {
        throw new Error("백엔드 서버와 통신할 수 없습니다.");
    }
}

// 2. 도서 단건 상세 조회 (조회 실패 시 error.tsx 띄움)
export async function getBookById(id: string): Promise<Book | null> {
    try {
        const res = await fetch(`${API_URL}/api/books/${id}`, { cache: 'no-store' });
        if (!res.ok) {
            if (res.status === 404) throw new Error("존재하지 않는 도서 ID입니다.");
            throw new Error(`상세 정보 조회 실패 (코드: ${res.status})`);
        }
        return res.json();
    } catch (error) {
        const message = error instanceof Error ? error.message : "서버 통신 실패";
        throw new Error(message);
    }
}

// 3. 도서 등록 (폼 입력 시)
export async function createBook(data: Omit<Book, 'id'>): Promise<boolean> {
    try {
        const res = await fetch(`${API_URL}/api/books`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!res.ok) return false;
        revalidatePath('/');
        return true;
    } catch (error) {
        // 등록/수정은 폼에서 알림(Alert)으로 처리하는 게 좋아서 false를 반환합니다.
        console.error("도서 등록 실패:", error);
        return false;
    }
}

// 4. 도서 수정 (폼 입력 시)
export async function updateBook(id: number | string, data: Omit<Book, 'id'>): Promise<boolean> {
    try {
        const res = await fetch(`${API_URL}/api/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!res.ok) return false;
        revalidatePath('/');
        revalidatePath(`/books/${id}`);
        return true;
    } catch (error) {
        console.error("도서 수정 실패:", error);
        return false;
    }
}

// 5. 도서 삭제
export async function deleteBook(id: string): Promise<void> {
    let isSuccess = false;

    try {
        const res = await fetch(`${API_URL}/api/books/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error("삭제 실패");
        isSuccess = true;
    } catch (error) {
        throw new Error("도서 삭제 중 통신 오류가 발생했습니다.");
    }

    // Next.js의 redirect는 내부적으로 에러를 발생시켜 동작하므로 try-catch 밖에서 실행해야 합니다!
    if (isSuccess) {
        revalidatePath('/');
        redirect('/');
    }
}

// 6. 도서 대출 상태 토글 (대여 <-> 반납)
export async function toggleAvailability(id: number, currentAvailable: boolean): Promise<boolean> {
    try {
        // 기존 도서 정보를 먼저 안전하게 한 번 가져온다.
        const book = await getBookById(id.toString());
        if (!book) return false;

        // 다른 값은 그대로 두고 available 값만 반대로 뒤집는다
        const updatedData = {
            title: book.title,
            author: book.author,
            price: book.price,
            bookTime: book.bookTime,
            isbn: book.isbn,
            available: !currentAvailable // true -> false, false -> true
        };

        const res = await fetch(`${API_URL}/api/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });

        if (!res.ok) return false;
        revalidatePath('/');
        revalidatePath(`/books/${id}`);
        return true;
    } catch (error) {
        console.error("대출 상태 변경 실패:", error);
        return false;
    }
}