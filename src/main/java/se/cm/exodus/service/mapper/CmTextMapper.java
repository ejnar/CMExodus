package se.cm.exodus.service.mapper;

import se.cm.exodus.domain.*;
import se.cm.exodus.service.dto.CmTextDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CmText and its DTO CmTextDTO.
 */
@Mapper(componentModel = "spring", uses = {CmModuleMapper.class, CmItemMapper.class})
public interface CmTextMapper extends EntityMapper<CmTextDTO, CmText> {

    @Mapping(source = "cmModule.id", target = "cmModuleId")
    @Mapping(source = "cmItem.id", target = "cmItemId")
    CmTextDTO toDto(CmText cmText);

    @Mapping(source = "cmModuleId", target = "cmModule")
    @Mapping(source = "cmItemId", target = "cmItem")
    CmText toEntity(CmTextDTO cmTextDTO);

    default CmText fromId(Long id) {
        if (id == null) {
            return null;
        }
        CmText cmText = new CmText();
        cmText.setId(id);
        return cmText;
    }
}
