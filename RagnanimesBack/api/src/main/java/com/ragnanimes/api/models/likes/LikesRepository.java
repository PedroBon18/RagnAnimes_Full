package com.ragnanimes.api.models.likes;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikesRepository extends JpaRepository<Likes , Integer> {
    List<Likes> findByAnimeId(Integer animeId);
}
