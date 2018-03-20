package se.cm.exodus.service.dto;


import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the CmTopic entity.
 */
@Data
@EqualsAndHashCode (of = {"id"})
public class CmTopicDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    private Set<CmSubTopicDTO> subTopics = new HashSet<>();

}
