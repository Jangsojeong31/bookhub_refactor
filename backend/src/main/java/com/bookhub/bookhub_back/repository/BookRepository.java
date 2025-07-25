package com.bookhub.bookhub_back.repository;

import com.bookhub.bookhub_back.entity.Book;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.Optional;
import java.util.stream.DoubleStream;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, String> {
    @Query("""
    SELECT b FROM Book b
    JOIN b.authorId a
    JOIN b.publisherId p
    JOIN b.categoryId c
    WHERE
        b.bookStatus != com.bookhub.bookhub_back.common.enums.BookStatus.HIDDEN AND (
            b.isbn = :keyword OR
            LOWER(b.bookTitle) LIKE LOWER(CONCAT('%', :keyword, '%')) OR
            LOWER(a.authorName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR
            LOWER(p.publisherName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR
            LOWER(c.categoryName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR
            LOWER(c.categoryType) LIKE LOWER(CONCAT('%', :keyword, '%'))
        )
""")
    List<Book> searchAllByKeyword(@Param("keyword") String keyword);

    Optional<Book> findByIsbn(@NotBlank String isbn);
}
