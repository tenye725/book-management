package com.example.bookmanagementapi.bookapi.dto;

import com.example.bookmanagementapi.bookapi.entity.Book;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BookDto{

    private Long id;

    @NotBlank(message = "도서 제목은 필수 입력 항목입니다.")
    private String title;

    @NotBlank(message = "저자명은 필수 입력 항목입니다.")
    private String author;

    @Min(value = 0, message = "가격은 0원 이상이어야 합니다.")
    private Integer price;

    @NotBlank(message = "출판년도는 필수 입력 항목입니다.")
    private String bookTime;
    private String isbn;
    private Boolean available;

    public BookDto(Book book) {
        this.id = book.getId();
        this.title=book.getTitle();
        this.author=book.getAuthor();
        this.price=book.getPrice();
        this.bookTime=book.getBookTime();
        this.isbn=book.getIsbn();
        this.available=book.getAvailable();
    }




}
