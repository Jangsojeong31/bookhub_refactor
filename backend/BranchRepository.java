package com.bookhub.bookhub_back.repository;

import com.bookhub.bookhub_back.entity.Branch;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BranchRepository extends JpaRepository<Branch, Long>{
    boolean existsByBranchName(@NotNull String branchName);

    List<Branch> findByBranchLocationContaining(String branchLocation);

    Optional<Branch> findByBranchName(String branchName);
}
