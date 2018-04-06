package se.cm.exodus.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import se.cm.exodus.domain.enumeration.LayoutType;

/**
 * A DTO for the CmImage entity.
 */
public class CmImageDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String imageType;

    private String toolTip;

    private Integer sorted;

    private LayoutType layout;

    private LocalDate publishDate;

    @NotNull
    private Boolean publish;

    private Long cmModuleId;

    private Long cmItemId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    public String getToolTip() {
        return toolTip;
    }

    public void setToolTip(String toolTip) {
        this.toolTip = toolTip;
    }

    public Integer getSorted() {
        return sorted;
    }

    public void setSorted(Integer sorted) {
        this.sorted = sorted;
    }

    public LayoutType getLayout() {
        return layout;
    }

    public void setLayout(LayoutType layout) {
        this.layout = layout;
    }

    public LocalDate getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(LocalDate publishDate) {
        this.publishDate = publishDate;
    }

    public Boolean isPublish() {
        return publish;
    }

    public void setPublish(Boolean publish) {
        this.publish = publish;
    }

    public Long getCmModuleId() {
        return cmModuleId;
    }

    public void setCmModuleId(Long cmModuleId) {
        this.cmModuleId = cmModuleId;
    }

    public Long getCmItemId() {
        return cmItemId;
    }

    public void setCmItemId(Long cmItemId) {
        this.cmItemId = cmItemId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CmImageDTO cmImageDTO = (CmImageDTO) o;
        if(cmImageDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cmImageDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CmImageDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", imageType='" + getImageType() + "'" +
            ", toolTip='" + getToolTip() + "'" +
            ", sorted=" + getSorted() +
            ", layout='" + getLayout() + "'" +
            ", publishDate='" + getPublishDate() + "'" +
            ", publish='" + isPublish() + "'" +
            "}";
    }
}
