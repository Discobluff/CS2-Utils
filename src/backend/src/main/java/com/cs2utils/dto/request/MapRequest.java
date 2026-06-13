package com.cs2utils.dto.request;

import org.springframework.web.multipart.MultipartFile;
import lombok.Data;

@Data
public class MapRequest {
    private String name;
    private String asset_name;
    private MultipartFile asset;
}
