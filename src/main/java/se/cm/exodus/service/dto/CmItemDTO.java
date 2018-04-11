package se.cm.exodus.service.dto;


import java.time.LocalDate;
import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import se.cm.exodus.domain.enumeration.LayoutType;

/**
 * A DTO for the CmItem entity.
 */
public class CmItemDTO implements Serializable {

    private Long id;

    private ZonedDateTime itemDate;

    private Integer sorted;

    private String toolTip;

    private LayoutType layout;

    private LocalDate publishDate;

    @NotNull
    private Boolean publish;

    private Long cmModuleId;

    private Set<CmTextDTO> texts = new HashSet<>();

    private Set<CmImageDTO> images = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getItemDate() {
        return itemDate;
    }

    public void setItemDate(ZonedDateTime itemDate) {
        this.itemDate = itemDate;
    }

    public Integer getSorted() {
        return sorted;
    }

    public void setSorted(Integer sorted) {
        this.sorted = sorted;
    }

    public String getToolTip() {
        return toolTip;
    }

    public void setToolTip(String toolTip) {
        this.toolTip = toolTip;
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

    public Set<CmTextDTO> getTexts() {
        return texts;
    }

    public void setTexts(Set<CmTextDTO> texts) {
        this.texts = texts;
    }

    public Set<CmImageDTO> getImages() {
        return images;
    }

    public void setImages(Set<CmImageDTO> images) {
        this.images = images;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CmItemDTO cmItemDTO = (CmItemDTO) o;
        if(cmItemDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cmItemDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CmItemDTO{" +
            "id=" + getId() +
            ", itemDate='" + getItemDate() + "'" +
            ", sorted=" + getSorted() +
            ", toolTip='" + getToolTip() + "'" +
            ", layout='" + getLayout() + "'" +
            ", publishDate='" + getPublishDate() + "'" +
            ", publish='" + isPublish() + "'" +
            "}";
    }
}
