package se.cm.exodus.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import se.cm.exodus.domain.enumeration.TextType;
import se.cm.exodus.domain.enumeration.LayoutType;

/**
 * A DTO for the CmText entity.
 */
public class CmTextDTO implements Serializable {

    private Long id;

    @NotNull
    private String textSv;

    private String textEn;

    private String fontSize;

    private String fontWeight;

    private TextType textType;

    private Integer sorted;

    private LayoutType layout;

    private LocalDate date;

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

    public String getFontSize() {
        return fontSize;
    }

    public void setFontSize(String fontSize) {
        this.fontSize = fontSize;
    }

    public String getFontWeight() {
        return fontWeight;
    }

    public void setFontWeight(String fontWeight) {
        this.fontWeight = fontWeight;
    }

    public TextType getTextType() {
        return textType;
    }

    public void setTextType(TextType textType) {
        this.textType = textType;
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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
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

        CmTextDTO cmTextDTO = (CmTextDTO) o;
        if(cmTextDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cmTextDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CmTextDTO{" +
            "id=" + getId() +
            ", textSv='" + getTextSv() + "'" +
            ", textEn='" + getTextEn() + "'" +
            ", fontSize='" + getFontSize() + "'" +
            ", fontWeight='" + getFontWeight() + "'" +
            ", textType='" + getTextType() + "'" +
            ", sorted=" + getSorted() +
            ", layout='" + getLayout() + "'" +
            ", date='" + getDate() + "'" +
            ", publishDate='" + getPublishDate() + "'" +
            ", publish='" + isPublish() + "'" +
            "}";
    }
}
