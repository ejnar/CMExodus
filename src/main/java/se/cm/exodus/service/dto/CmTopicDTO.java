package se.cm.exodus.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the CmTopic entity.
 */
public class CmTopicDTO implements Serializable {

    private Long id;

    @NotNull
    private String nameEn;

    @NotNull
    private String nameSv;

    private String icon;

    private Set<CmSubTopicDTO> subTopics = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameEn() {
        return nameEn;
    }

    public void setNameEn(String nameEn) {
        this.nameEn = nameEn;
    }

    public String getNameSv() {
        return nameSv;
    }

    public void setNameSv(String nameSv) {
        this.nameSv = nameSv;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Set<CmSubTopicDTO> getSubTopics() {
        return subTopics;
    }

    public void setSubTopics(Set<CmSubTopicDTO> subTopics) {
        this.subTopics = subTopics;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CmTopicDTO cmTopicDTO = (CmTopicDTO) o;
        if(cmTopicDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cmTopicDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CmTopicDTO{" +
            "id=" + getId() +
            ", nameEn='" + getNameEn() + "'" +
            ", nameSv='" + getNameSv() + "'" +
            ", icon='" + getIcon() + "'" +
            "}";
    }
}
