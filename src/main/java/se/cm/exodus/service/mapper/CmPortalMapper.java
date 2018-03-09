package se.cm.exodus.service.mapper;

import se.cm.exodus.domain.*;
import se.cm.exodus.service.dto.CmPortalDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CmPortal and its DTO CmPortalDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CmPortalMapper extends EntityMapper<CmPortalDTO, CmPortal> {



    default CmPortal fromId(Long id) {
        if (id == null) {
            return null;
        }
        CmPortal cmPortal = new CmPortal();
        cmPortal.setId(id);
        return cmPortal;
    }
}
