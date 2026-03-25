package com.cs2utils.controller;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
// import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class Assets {

    @Value("${assets.path}")
    private String assetsPath;

    @GetMapping("/assets")
    public byte[] getAsset(@RequestParam(value = "type", defaultValue = "") String type, @RequestParam(value = "name", defaultValue = "") String name) throws IOException {
        return Files.readAllBytes(Paths.get(assetsPath + "/" + type + "/" + name + ".png"));
    }
}
