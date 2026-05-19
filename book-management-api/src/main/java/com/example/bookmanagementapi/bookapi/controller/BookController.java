package com.example.bookmanagementapi.bookapi.controller;

import com.example.bookmanagementapi.bookapi.dto.BookDto;
import com.example.bookmanagementapi.bookapi.service.BookService;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Getter
@Setter
@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    // 전체 조회 및 검색 처리 (Query Parameter)
    // 예: GET /api/books?title=자바
    @GetMapping
    public ResponseEntity<List<BookDto>> getBooks(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) String bookTime) {

        if (title != null && !title.isEmpty()) {
            return ResponseEntity.ok(bookService.searchBooksByTitle(title));
        } else if (author != null && !author.isEmpty()) {
            return ResponseEntity.ok(bookService.searchBooksByAuthor(author));
        } else if (bookTime != null && !bookTime.isEmpty()) {
            return ResponseEntity.ok(bookService.searchBooksByBookTime(bookTime));
        }

        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookDto> getBookById(@PathVariable Long id) {
        return ResponseEntity.ok(bookService.getBookById(id));
    }

    @PostMapping
    public ResponseEntity<BookDto> createBook(@Valid @RequestBody BookDto bookDto) {
        BookDto createdBook = bookService.createBook(bookDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBook);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookDto> updateBookById(@PathVariable Long id, @Valid @RequestBody BookDto bookDto) {
        BookDto updatedBook = bookService.updateBook(id, bookDto);
        return ResponseEntity.ok(updatedBook);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBookById(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}