import BookForm from '@/components/BookForm';

export default function RegisterPage() {
    return (
        <div>
            <h3 className="text-base font-bold mb-4 text-center">📝 새 도서 등록</h3>
            <BookForm />
        </div>
    );
}