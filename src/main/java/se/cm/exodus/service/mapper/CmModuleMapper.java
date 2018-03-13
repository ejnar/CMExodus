package se.cm.exodus.service.mapper;

import se.cm.exodus.domain.*;
import se.cm.exodus.service.dto.CmModuleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CmModule and its DTO CmModuleDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CmModuleMapper extends EntityMapper<CmModuleDTO, CmModule> {


    @Mapping(target = "lists", ignore = true)
    @Mapping(target = "texts", ignore = true)
    @Mapping(target = "images", ignore = true)
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