package com.example.bookmanagementapi.bookapi.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;          // 자동 생성 PK
    private String title;      // 도서 제목 (NOT NULL)
    private String author;     // 저자명 (NOT NULL)
    private Integer price;     // 가격
    private String bookTime;  //책년도
    private String isbn;
    private Boolean available = true; // 대출 가능 여부 (default: true)

}