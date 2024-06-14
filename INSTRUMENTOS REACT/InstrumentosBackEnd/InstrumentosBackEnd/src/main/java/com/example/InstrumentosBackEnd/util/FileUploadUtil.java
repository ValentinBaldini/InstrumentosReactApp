package com.example.InstrumentosBackEnd.util;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;

import org.springframework.web.multipart.MultipartFile;

import com.itextpdf.io.exceptions.IOException;

public class FileUploadUtil {
    public static void saveFile(String uploadDir, String fileName, MultipartFile file) throws IOException, FileNotFoundException, java.io.IOException {
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        File serverFile = new File(dir.getAbsolutePath() + File.separator + fileName);
        try (FileOutputStream stream = new FileOutputStream(serverFile)) {
            stream.write(file.getBytes());
        }
    }
}
