package se.cm.exodus.service.mapper;

import se.cm.exodus.domain.*;
import se.cm.exodus.service.dto.CmPageAuthorityDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CmPageAuthority and its DTO CmPageAuthorityDTO.
 */
@Mapper(componentModel = "spring", uses = {CmPageMapper.class})
public interface CmPageAuthorityMapper extends EntityMapper<CmPageAuthorityDTO, CmPageAuthority> {

    @Mapping(source = "cmPage.id", target = "cmPageId")
    CmPageAuthorityDTO toDto(CmPageAuthority cmPageAuthority);

    @Mapping(source = "cmPageId", target = "cmPage")
    CmPageAuthority toEntity(CmPageAuthorityDTO cmPageAuthorityDTO);

    default CmPageAuthority fromId(Long id) {
        if (id == null) {
            return null;
        }
        CmPageAuthority cmPageAuthority = new CmPageAuthority();
        cmPageAuthority.setId(id);
        return cmPageAuthority;
    }
}
