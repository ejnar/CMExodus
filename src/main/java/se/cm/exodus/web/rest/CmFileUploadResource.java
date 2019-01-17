package se.cm.exodus.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import se.cm.exodus.service.CmFileService;
import se.cm.exodus.service.dto.CmImageDTO;

import java.util.Base64;

@RestController
@RequestMapping("/api")
public class CmFileUploadResource {

    private final Logger log = LoggerFactory.getLogger(CmFileUploadResource.class);

    @Autowired
    private CmFileService fileservice;

    // @CrossOrigin(origins = "http://localhost:4200") // Call  from Local Angualar
    @PostMapping("/cm-upload")
    public ResponseEntity< CmImageDTO > handleFileUpload(@RequestParam("file") MultipartFile file) {
        log.debug("REST request to save File : {}", file);
        CmImageDTO dto = new CmImageDTO();
        String message = "";
        try {
            dto = fileservice.store(file);
            dto.setUploadStatus("You successfully uploaded!");
            return ResponseEntity.status(HttpStatus.OK).body( dto );
        } catch (Exception e) {
            dto.setUploadStatus("Fail to upload!");
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(dto);
        }
    }

}
