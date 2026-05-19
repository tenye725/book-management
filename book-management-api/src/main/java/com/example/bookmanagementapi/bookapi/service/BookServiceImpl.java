package com.example.bookmanagementapi.bookapi.service;

import com.example.bookmanagementapi.bookapi.dto.BookDto;
import com.example.bookmanagementapi.bookapi.entity.Book;
import com.example.bookmanagementapi.bookapi.repository.BookRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public List<BookDto> getAllBooks() {
        return bookRepository.findAll().stream()
                .map(BookDto::new)
                .collect(Collectors.toList());
    }

    @Override
    public BookDto getBookById(Long id) {
        //ResponseStatusException을 사용하여 없는 ID 조회 시 404 강제 지정
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "도서를 찾을 수 없습니다. ID: " + id));
        return new BookDto(book);
    }

    @Override
    @Transactional
    public BookDto createBook(BookDto dto) {
        if (dto.getBookTime() == null || !dto.getBookTime().matches("^\\d{4}$")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "출판년도는 반드시 숫자 4자리여야 합니다. (예: 2026)");
        }

        Book book = new Book();
        book.setTitle(dto.getTitle());
        book.setAuthor(dto.getAuthor());
        book.setPrice(dto.getPrice());
        book.setBookTime(dto.getBookTime());

        //ISBN 백엔드 자동 생성
        //백엔드에서 고유한 값을 직접 생성해 저장합니다.
        String generatedIsbn = "978-89-"
                + (int)(10000 + Math.random() * 90000) + "-"
                + (int)(100 + Math.random() * 900) + "-"
                + (int)(Math.random() * 10);
        book.setIsbn(generatedIsbn);

        book.setAvailable(dto.getAvailable() != null ? dto.getAvailable() : true);

        Book savedBook = bookRepository.save(book);
        return new BookDto(savedBook);
    }

    @Override
    @Transactional
    public BookDto updateBook(Long id, BookDto dto) {
        //찾을 수 없는 도서는 404반환
        Book stingBook = bookRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "도서를 찾을 수 없습니다. ID: " + id));
        if (dto.getBookTime() == null || !dto.getBookTime().matches("^\\d{4}$")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "출판년도는 반드시 숫자 4자리여야 합니다. (예: 2026)");
        }

        // 데이터 수정
        stingBook.setTitle(dto.getTitle());
        stingBook.setAuthor(dto.getAuthor());
        stingBook.setPrice(dto.getPrice());
        stingBook.setBookTime(dto.getBookTime());
        stingBook.setAvailable(dto.getAvailable());
        return new BookDto(stingBook);
    }

    @Override
    @Transactional
    public void deleteBook(Long id) {
        // ★ 없는 도서를 삭제하려고 할 때도 404 에러 반환
        if (!bookRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "도서를 찾을 수 없습니다. ID: " + id);
        }
        bookRepository.deleteById(id);
    }

    // --- 검색 메서드 구현 ---
    @Override
    public List<BookDto> searchBooksByTitle(String title) {
        return bookRepository.findByTitleContaining(title).stream().map(BookDto::new).collect(Collectors.toList());
    }

    @Override
    public List<BookDto> searchBooksByAuthor(String author) {
        return bookRepository.findByAuthorContaining(author).stream().map(BookDto::new).collect(Collectors.toList());
    }

    @Override
    public List<BookDto> searchBooksByBookTime(String bookTime) {
        return bookRepository.findByBookTime(bookTime).stream().map(BookDto::new).collect(Collectors.toList());
    }
}