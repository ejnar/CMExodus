package se.cm.exodus.service.mapper;

import se.cm.exodus.domain.*;
import se.cm.exodus.service.dto.CmItemDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CmItem and its DTO CmItemDTO.
 */
@Mapper(componentModel = "spring", uses = {CmModuleMapper.class})
public interface CmItemMapper extends EntityMapper<CmItemDTO, CmItem> {

    @Mapping(source = "cmModule.id", target = "cmModuleId")
    CmItemDTO toDto(CmItem cmItem);

    @Mapping(source = "cmModuleId", target = "cmModule")
    @Mapping(target = "texts", ignore = true)
    @Mapping(target = "images", ignore = true)
    CmItem toEntity(CmItemDTO cmItemDTO);

    default CmItem fromId(Long id) {
        if (id == null) {
            return null;
        }
        CmItem cmItem = new CmItem();
        cmItem.setId(id);
        return cmItem;
    }
}
