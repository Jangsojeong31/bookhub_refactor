package com.bookhub.bookhub_back.repository;

import com.bookhub.bookhub_back.entity.Book;
import com.bookhub.bookhub_back.entity.BookDisplayLocation;
import com.bookhub.bookhub_back.entity.Branch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookDisplayLocationRepository extends JpaRepository<BookDisplayLocation, Long> {
    @Query("SELECT l FROM BookDisplayLocation l WHERE l.branch = :branch AND l.book IN :books")
    List<BookDisplayLocation> findByBranchAndBooks(@Param("branch") Branch branch, @Param("books") List<Book> books);

    @Query("""
    SELECT d 
    FROM BookDisplayLocation d
    WHERE(:t IS NULL OR d.book.bookTitle LIKE CONCAT('%', :t, '%'))
        AND(:i IS NULL OR d.book.isbn = :i )
        AND(:i IS NULL OR d.branch.branchId = :b)
    ORDER BY d.locationId DESC
    """)
    Page<BookDisplayLocation> findFiltered(
            @Param("bookTitle") String t,
            @Param("isbn") String i,
            @Param("branchId") Long b,
            Pageable pageable);
}
