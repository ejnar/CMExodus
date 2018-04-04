package se.cm.exodus.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the CmPortal entity.
 */
public class CmPortalDTO implements Serializable {

    private Long id;

    @NotNull
    private String portalKey;

    @NotNull
    private String contentPath;

    @NotNull
    private String name;

    @NotNull
    private String metaName;

    private String metaTitle;

    @NotNull
    private String metaApplicationName;

    @NotNull
    private String metaKeywords;

    private String metaDescription;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPortalKey() {
        return portalKey;
    }

    public void setPortalKey(String portalKey) {
        this.portalKey = portalKey;
    }

    public String getContentPath() {
        return contentPath;
    }

    public void setContentPath(String contentPath) {
        this.contentPath = contentPath;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMetaName() {
        return metaName;
    }

    public void setMetaName(String metaName) {
        this.metaName = metaName;
    }

    public String getMetaTitle() {
        return metaTitle;
    }

    public void setMetaTitle(String metaTitle) {
        this.metaTitle = metaTitle;
    }

    public String getMetaApplicationName() {
        return metaApplicationName;
    }

    public void setMetaApplicationName(String metaApplicationName) {
        this.metaApplicationName = metaApplicationName;
    }

    public String getMetaKeywords() {
        return metaKeywords;
    }

    public void setMetaKeywords(String metaKeywords) {
        this.metaKeywords = metaKeywords;
    }

    public String getMetaDescription() {
        return metaDescription;
    }

    public void setMetaDescription(String metaDescription) {
        this.metaDescription = metaDescription;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CmPortalDTO cmPortalDTO = (CmPortalDTO) o;
        if(cmPortalDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cmPortalDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CmPortalDTO{" +
            "id=" + getId() +
            ", portalKey='" + getPortalKey() + "'" +
            ", contentPath='" + getContentPath() + "'" +
            ", name='" + getName() + "'" +
            ", metaName='" + getMetaName() + "'" +
            ", metaTitle='" + getMetaTitle() + "'" +
            ", metaApplicationName='" + getMetaApplicationName() + "'" +
            ", metaKeywords='" + getMetaKeywords() + "'" +
            ", metaDescription='" + getMetaDescription() + "'" +
            "}";
    }
}
