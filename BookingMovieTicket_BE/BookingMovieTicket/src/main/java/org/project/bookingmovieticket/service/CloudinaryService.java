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

    public boolean deleteMedia(String url, MediaType type) {
        String publicId = getPublicId(url);

        System.out.println(publicId);
        try {
            Map<String, Object> options = ObjectUtils.asMap(
                    "resource_type", type == MediaType.TRAILER ? "video" : "image"
            );
            Map result = cloudinary.uploader().destroy(publicId, options);
            return "ok".equals(result.get("result"));
        }
        catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

    private String getPublicId(String url){
        String result  = null;
        System.out.println(url);
        if (!url.isEmpty()) {
            int i = url.indexOf("/upload/");
            String[] tmp = url.substring(i + 1).split("[.]")[0].split("[/]");
            result = tmp[tmp.length - 2] + "/" + tmp[tmp.length - 1];
        }
        return result;
    }
}
