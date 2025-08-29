package com.ragnanimes.api.models.anime;

import com.ragnanimes.api.models.likes.Likes;
import java.util.List;

public class AnimeComLikesDTO {
    private Anime anime;
    private List<Likes> likes;

    public AnimeComLikesDTO(Anime anime, List<Likes> likes) {
        this.anime = anime;
        this.likes = likes;
    }

    public Anime getAnime() { return anime; }
    public List<Likes> getLikes() { return likes; }
}