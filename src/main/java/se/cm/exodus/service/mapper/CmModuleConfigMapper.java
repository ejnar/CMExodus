package se.cm.exodus.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import se.cm.exodus.domain.CmModule;
import se.cm.exodus.domain.CmModuleConfig;
import se.cm.exodus.service.dto.CmModuleConfigDTO;
import se.cm.exodus.service.dto.CmModuleDTO;

/**
 * Mapper for the entity CmModule and its DTO CmModuleDTO.
 */
@Mapper(componentModel = "spring", uses = {CmPageMapper.class, CmModuleMapper.class})
public interface CmModuleConfigMapper extends EntityMapper<CmModuleConfigDTO, CmModuleConfig> {

    CmModuleConfigDTO toDto(CmModuleConfig cmModuleConfig);

    CmModuleConfig toEntity(CmModuleConfigDTO cmModuleConfigDTO);

    default CmModuleConfig fromId(Long id) {
        if (id == null) {
            return null;
        }
        CmModuleConfig cmModuleConfig = new CmModuleConfig();
        cmModuleConfig.setId(id);
        return cmModuleConfig;
    }
}
