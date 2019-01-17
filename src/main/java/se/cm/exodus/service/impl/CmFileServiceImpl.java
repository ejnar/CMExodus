package se.cm.exodus.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import se.cm.exodus.domain.enumeration.LayoutType;
import se.cm.exodus.service.CmFileService;
import se.cm.exodus.service.CmImageService;
import se.cm.exodus.service.dto.CmImageDTO;
import se.cm.exodus.web.rest.CmFileUploadResource;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.Base64;

@Service
public class CmFileServiceImpl implements CmFileService {

    private final Logger log = LoggerFactory.getLogger(CmFileServiceImpl.class);

    private final Path rootLocation = Paths.get("content/external");

    @Autowired
    private CmImageService imageService;

    @Override
    public CmImageDTO store(MultipartFile file) {
        CmImageDTO imageDTO = new CmImageDTO();
        try {
            log.debug("File name: {} - Size: {}", file.getOriginalFilename(), file.getSize());
            log.debug("File location : {}", rootLocation.toUri());

            CmImageDTO dto = new CmImageDTO();
            dto.setName(file.getOriginalFilename());
            dto.setImageType(file.getContentType());
            dto.setLayout(LayoutType.DEFAULT);
            dto.setSorted(0);
            dto.setPublish(true);
            dto.setData(file.getBytes());
            imageDTO = imageService.save(dto);

            // imageDTO.setBase64(Base64.getEncoder().encodeToString(file.getBytes()));
            // Files.copy(file.getInputStream(), this.rootLocation.resolve(file.getOriginalFilename()));
        } catch (Exception e) {
            log.error("Fail to save file ", e);
            throw new RuntimeException("FAIL!");
        }
        return imageDTO;
    }

}
