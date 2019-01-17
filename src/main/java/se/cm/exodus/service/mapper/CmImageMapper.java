package se.cm.exodus.service.mapper;

import se.cm.exodus.domain.*;
import se.cm.exodus.service.dto.CmImageDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CmImage and its DTO CmImageDTO.
 */
@Mapper(componentModel = "spring", uses = {CmModuleMapper.class, CmItemMapper.class})
public interface CmImageMapper extends EntityMapper<CmImageDTO, CmImage> {

    @Mapping(source = "cmModule.id", target = "cmModuleId")
    @Mapping(source = "cmItem.id", target = "cmItemId")
    @Mapping(target = "uploadStatus", ignore = true)
    CmImageDTO toDto(CmImage cmImage);

    @Mapping(target = "dataSaved", ignore = true)
    @Mapping(source = "cmModuleId", target = "cmModule")
    @Mapping(source = "cmItemId", target = "cmItem")
    CmImage toEntity(CmImageDTO cmImageDTO);

    default CmImage fromId(Long id) {
        if (id == null) {
            return null;
        }
        CmImage cmImage = new CmImage();
        cmImage.setId(id);
        return cmImage;
    }
}
