package com.example.bookmanagementapi.bookapi.service;

import com.example.bookmanagementapi.bookapi.dto.BookDto;


import java.util.List;


public interface BookService{
    // 1. 전체 도서 목록 조회
    List<BookDto> getAllBooks();

    // 2.도서 조회
    BookDto getBookById(Long id);

    // 3. 새 도서 등록
    BookDto createBook(BookDto bookDto);

    // 4.도서 업데이트
    BookDto updateBook(Long id, BookDto bookDto);

    // 5. 도서 삭제
    void deleteBook(Long id);


    // --- 검색 메서드 구현 ---
    List<BookDto> searchBooksByTitle(String title);

    List<BookDto> searchBooksByAuthor(String author);

    List<BookDto> searchBooksByBookTime(String bookTime);
}
