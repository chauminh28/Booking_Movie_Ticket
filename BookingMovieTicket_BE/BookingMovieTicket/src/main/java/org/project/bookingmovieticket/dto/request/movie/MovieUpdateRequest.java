package org.project.bookingmovieticket.dto.request.movie;

import java.util.List;

public class MovieUpdateRequest {
    private Long id;
    private String movieName;
    private int movieDuration;
    private boolean status;
    private String movieImage;
    private List<Long> genres;
    private boolean movieStatus;
}
