package se.cm.exodus.service.mapper;

import se.cm.exodus.domain.*;
import se.cm.exodus.service.dto.CmItemListDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CmItemList and its DTO CmItemListDTO.
 */
@Mapper(componentModel = "spring", uses = {CmModuleMapper.class, CmImageMapper.class})
public interface CmItemListMapper extends EntityMapper<CmItemListDTO, CmItemList> {

    @Mapping(source = "cmModule.id", target = "cmModuleId")
    @Mapping(source = "image.id", target = "imageId")
    CmItemListDTO toDto(CmItemList cmItemList);

    @Mapping(source = "cmModuleId", target = "cmModule")
    @Mapping(source = "imageId", target = "image")
    CmItemList toEntity(CmItemListDTO cmItemListDTO);

    default CmItemList fromId(Long id) {
        if (id == null) {
            return null;
        }
        CmItemList cmItemList = new CmItemList();
        cmItemList.setId(id);
        return cmItemList;
    }
}
