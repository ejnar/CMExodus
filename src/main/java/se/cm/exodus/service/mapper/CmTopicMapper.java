package se.cm.exodus.service.mapper;

import se.cm.exodus.domain.*;
import se.cm.exodus.service.dto.CmTopicDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CmTopic and its DTO CmTopicDTO.
 */
@Mapper(componentModel = "spring", uses = {CmSubTopicMapper.class})
public interface CmTopicMapper extends EntityMapper<CmTopicDTO, CmTopic> {


    @Mapping(target = "subTopics", ignore = true)
    CmTopic toEntity(CmTopicDTO cmTopicDTO);

    default CmTopic fromId(Long id) {
        if (id == null) {
            return null;
        }
        CmTopic cmTopic = new CmTopic();
        cmTopic.setId(id);
        return cmTopic;
    }
}
