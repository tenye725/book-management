package com.example.bookmanagementapi.bookapi.repository;


import com.example.bookmanagementapi.bookapi.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByAuthorContaining(String author);
    List<Book> findByTitleContaining(String title);
    List<Book> findByBookTime(String bookTime);

}
