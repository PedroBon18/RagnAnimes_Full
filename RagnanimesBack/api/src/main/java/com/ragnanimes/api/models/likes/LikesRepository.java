package com.ragnanimes.api.models.likes;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LikesRepository extends JpaRepository<Likes , Integer> {
    
}
