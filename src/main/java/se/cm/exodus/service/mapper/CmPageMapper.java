package se.cm.exodus.service.mapper;

import se.cm.exodus.domain.*;
import se.cm.exodus.service.dto.CmPageDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CmPage and its DTO CmPageDTO.
 */
@Mapper(componentModel = "spring", uses = {CmSubTopicMapper.class, CmModuleMapper.class})
public interface CmPageMapper extends EntityMapper<CmPageDTO, CmPage> {

    @Mapping(source = "cmSubTopic.id", target = "cmSubTopicId")
    CmPageDTO toDto(CmPage cmPage);

    @Mapping(source = "cmSubTopicId", target = "cmSubTopic")
    @Mapping(target = "authorities", ignore = true)
    CmPage toEntity(CmPageDTO cmPageDTO);

    default CmPage fromId(Long id) {
        if (id == null) {
            return null;
        }
        CmPage cmPage = new CmPage();
        cmPage.setId(id);
        return cmPage;
    }
}
