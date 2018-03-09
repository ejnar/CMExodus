package se.cm.exodus.service.mapper;

import se.cm.exodus.domain.*;
import se.cm.exodus.service.dto.CmSubTopicDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CmSubTopic and its DTO CmSubTopicDTO.
 */
@Mapper(componentModel = "spring", uses = {CmTopicMapper.class})
public interface CmSubTopicMapper extends EntityMapper<CmSubTopicDTO, CmSubTopic> {

    @Mapping(source = "cmTopic.id", target = "cmTopicId")
    CmSubTopicDTO toDto(CmSubTopic cmSubTopic);

    @Mapping(source = "cmTopicId", target = "cmTopic")
    @Mapping(target = "pages", ignore = true)
    CmSubTopic toEntity(CmSubTopicDTO cmSubTopicDTO);

    default CmSubTopic fromId(Long id) {
        if (id == null) {
            return null;
        }
        CmSubTopic cmSubTopic = new CmSubTopic();
        cmSubTopic.setId(id);
        return cmSubTopic;
    }
}
