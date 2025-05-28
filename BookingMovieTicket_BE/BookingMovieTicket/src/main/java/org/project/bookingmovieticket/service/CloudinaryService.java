package org.project.bookingmovieticket.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.project.bookingmovieticket.enums.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadMedia(MultipartFile file, MediaType type) throws IOException {
        Map<String, Object> params = ObjectUtils.asMap(
                "folder", type.getFolder(),
                "resource_type", type == MediaType.TRAILER ? "video" : "image"
        );
        Map result = cloudinary.uploader().upload(file.getBytes(), params);
        return (String) result.get("secure_url");
    }
}
