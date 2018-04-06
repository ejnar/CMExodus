package se.cm.exodus.service.dto;


import java.time.LocalDate;
import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import se.cm.exodus.domain.enumeration.TypeOfEvent;

/**
 * A DTO for the CmItemList entity.
 */
public class CmItemListDTO implements Serializable {

    private Long id;

    @NotNull
    private String textSv;

    private String textEn;

    private String titleSv;

    private String titleEn;

    private String ingressSv;

    private String ingressEn;

    private Integer sorted;

    private String toolTip;

    private TypeOfEvent typeOfEvent;

    private String location;

    private ZonedDateTime itemDate;

    private LocalDate publishDate;

    @NotNull
    private Boolean publish;

    private Long cmModuleId;

    private Long imageId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTextSv() {
        return textSv;
    }

    public void setTextSv(String textSv) {
        this.textSv = textSv;
    }

    public String getTextEn() {
        return textEn;
    }

    public void setTextEn(String textEn) {
        this.textEn = textEn;
    }

    public String getTitleSv() {
        return titleSv;
    }

    public void setTitleSv(String titleSv) {
        this.titleSv = titleSv;
    }

    public String getTitleEn() {
        return titleEn;
    }

    public void setTitleEn(String titleEn) {
        this.titleEn = titleEn;
    }

    public String getIngressSv() {
        return ingressSv;
    }

    public void setIngressSv(String ingressSv) {
        this.ingressSv = ingressSv;
    }

    public String getIngressEn() {
        return ingressEn;
    }

    public void setIngressEn(String ingressEn) {
        this.ingressEn = ingressEn;
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

    public TypeOfEvent getTypeOfEvent() {
        return typeOfEvent;
    }

    public void setTypeOfEvent(TypeOfEvent typeOfEvent) {
        this.typeOfEvent = typeOfEvent;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public ZonedDateTime getItemDate() {
        return itemDate;
    }

    public void setItemDate(ZonedDateTime itemDate) {
        this.itemDate = itemDate;
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

    public Long getImageId() {
        return imageId;
    }

    public void setImageId(Long cmImageId) {
        this.imageId = cmImageId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CmItemListDTO cmItemListDTO = (CmItemListDTO) o;
        if(cmItemListDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cmItemListDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CmItemListDTO{" +
            "id=" + getId() +
            ", textSv='" + getTextSv() + "'" +
            ", textEn='" + getTextEn() + "'" +
            ", titleSv='" + getTitleSv() + "'" +
            ", titleEn='" + getTitleEn() + "'" +
            ", ingressSv='" + getIngressSv() + "'" +
            ", ingressEn='" + getIngressEn() + "'" +
            ", sorted=" + getSorted() +
            ", toolTip='" + getToolTip() + "'" +
            ", typeOfEvent='" + getTypeOfEvent() + "'" +
            ", location='" + getLocation() + "'" +
            ", itemDate='" + getItemDate() + "'" +
            ", publishDate='" + getPublishDate() + "'" +
            ", publish='" + isPublish() + "'" +
            "}";
    }
}
