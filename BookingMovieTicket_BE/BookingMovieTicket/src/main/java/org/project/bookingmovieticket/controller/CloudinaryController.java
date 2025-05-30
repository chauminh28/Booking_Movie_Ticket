package org.project.bookingmovieticket.controller;

import org.project.bookingmovieticket.enums.MediaType;
import org.project.bookingmovieticket.service.CloudinaryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
public class CloudinaryController {
    private final CloudinaryService cloudinaryService;

    public CloudinaryController(CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping("/uploads")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file, @RequestParam("type")MediaType type) {
        try {
            String url = cloudinaryService.uploadMedia(file,type);
            return ResponseEntity.ok(Map.of("url", url));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("uploads/delete")
    public ResponseEntity<?> delete(@RequestBody Map<String, String> url, @RequestParam("type")MediaType type) {
        boolean result = cloudinaryService.deleteMedia(url.get("url"), type);
        return result ? ResponseEntity.ok("Deleted") : ResponseEntity.status(500).body(Map.of("message", "Delete failed"));
    }



}
