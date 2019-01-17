package se.cm.exodus.service;

import org.springframework.web.multipart.MultipartFile;
import se.cm.exodus.service.dto.CmImageDTO;

public interface CmFileService {
    CmImageDTO store(MultipartFile file);
}
