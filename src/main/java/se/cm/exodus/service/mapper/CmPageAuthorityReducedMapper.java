package se.cm.exodus.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import se.cm.exodus.domain.CmPageAuthority;
import se.cm.exodus.service.dto.CmPageAuthorityDTO;

/**
 * Mapper for the entity CmPageAuthority and its DTO CmPageAuthorityDTO.
 */
@Mapper(componentModel = "spring", uses = {CmPageMapper.class})
public interface CmPageAuthorityReducedMapper extends EntityMapper<CmPageAuthorityDTO, CmPageAuthority> {

    @Mapping(source = "cmPage.id", target = "cmPageId")
    @Mapping(target = "user", ignore = false)
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
