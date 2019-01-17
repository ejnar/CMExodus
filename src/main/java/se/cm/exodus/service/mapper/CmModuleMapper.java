package se.cm.exodus.service.mapper;

import se.cm.exodus.domain.*;
import se.cm.exodus.service.dto.CmModuleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CmModule and its DTO CmModuleDTO.
 */
@Mapper(componentModel = "spring", uses = {CmItemListMapper.class, CmItemMapper.class, CmTextMapper.class, CmImageMapper.class, CmModuleConfigMapper.class})
public interface CmModuleMapper extends EntityMapper<CmModuleDTO, CmModule> {

    @Mapping(target = "items", ignore = true)
    @Mapping(target = "moduleConfigs", ignore = true)
    @Mapping(target = "itemLists", ignore = false)
    @Mapping(target = "texts", ignore = false)
    @Mapping(target = "images", ignore = false)
    CmModule toEntity(CmModuleDTO cmModuleDTO);

    default CmModule fromId(Long id) {
        if (id == null) {
            return null;
        }
        CmModule cmModule = new CmModule();
        cmModule.setId(id);
        return cmModule;
    }
}
