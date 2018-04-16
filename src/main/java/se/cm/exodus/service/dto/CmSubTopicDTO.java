package se.cm.exodus.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the CmSubTopic entity.
 */
public class CmSubTopicDTO implements Serializable {

    private Long id;

    @NotNull
    private String nameEn;

    @NotNull
    private String nameSv;

    private String icon;

    private Boolean visable;

    private Long cmTopicId;

    private Long pageId;

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

    public Boolean isVisable() {
        return visable;
    }

    public void setVisable(Boolean visable) {
        this.visable = visable;
    }

    public Long getCmTopicId() {
        return cmTopicId;
    }

    public void setCmTopicId(Long cmTopicId) {
        this.cmTopicId = cmTopicId;
    }

    public Long getPageId() {
        return pageId;
    }

    public void setPageId(Long cmPageId) {
        this.pageId = cmPageId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CmSubTopicDTO cmSubTopicDTO = (CmSubTopicDTO) o;
        if(cmSubTopicDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cmSubTopicDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CmSubTopicDTO{" +
            "id=" + getId() +
            ", nameEn='" + getNameEn() + "'" +
            ", nameSv='" + getNameSv() + "'" +
            ", icon='" + getIcon() + "'" +
            ", visable='" + isVisable() + "'" +
            "}";
    }
}
