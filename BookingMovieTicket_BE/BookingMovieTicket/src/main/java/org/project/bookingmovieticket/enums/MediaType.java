package org.project.bookingmovieticket.enums;

public enum MediaType {
    MOVIE_IMAGE("movies"),
    DIRECTOR_IMAGE("directors"),
    ACTOR_IMAGE("actors"),
    TRAILER("trailers");

    private final String folder;

    MediaType(String folder) {
        this.folder = folder;
    }

    public String getFolder() {
        return folder;
    }
}
