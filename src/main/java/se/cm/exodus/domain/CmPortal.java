package se.cm.exodus.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CmPortal.
 */
@Entity
@Table(name = "cm_portal")
public class CmPortal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "portal_key", nullable = false)
    private String portalKey;

    @NotNull
    @Column(name = "content_path", nullable = false)
    private String contentPath;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "meta_name", nullable = false)
    private String metaName;

    @Column(name = "meta_title")
    private String metaTitle;

    @NotNull
    @Column(name = "meta_application_name", nullable = false)
    private String metaApplicationName;

    @NotNull
    @Column(name = "meta_keywords", nullable = false)
    private String metaKeywords;

    @Column(name = "meta_description")
    private String metaDescription;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPortalKey() {
        return portalKey;
    }

    public CmPortal portalKey(String portalKey) {
        this.portalKey = portalKey;
        return this;
    }

    public void setPortalKey(String portalKey) {
        this.portalKey = portalKey;
    }

    public String getContentPath() {
        return contentPath;
    }

    public CmPortal contentPath(String contentPath) {
        this.contentPath = contentPath;
        return this;
    }

    public void setContentPath(String contentPath) {
        this.contentPath = contentPath;
    }

    public String getName() {
        return name;
    }

    public CmPortal name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMetaName() {
        return metaName;
    }

    public CmPortal metaName(String metaName) {
        this.metaName = metaName;
        return this;
    }

    public void setMetaName(String metaName) {
        this.metaName = metaName;
    }

    public String getMetaTitle() {
        return metaTitle;
    }

    public CmPortal metaTitle(String metaTitle) {
        this.metaTitle = metaTitle;
        return this;
    }

    public void setMetaTitle(String metaTitle) {
        this.metaTitle = metaTitle;
    }

    public String getMetaApplicationName() {
        return metaApplicationName;
    }

    public CmPortal metaApplicationName(String metaApplicationName) {
        this.metaApplicationName = metaApplicationName;
        return this;
    }

    public void setMetaApplicationName(String metaApplicationName) {
        this.metaApplicationName = metaApplicationName;
    }

    public String getMetaKeywords() {
        return metaKeywords;
    }

    public CmPortal metaKeywords(String metaKeywords) {
        this.metaKeywords = metaKeywords;
        return this;
    }

    public void setMetaKeywords(String metaKeywords) {
        this.metaKeywords = metaKeywords;
    }

    public String getMetaDescription() {
        return metaDescription;
    }

    public CmPortal metaDescription(String metaDescription) {
        this.metaDescription = metaDescription;
        return this;
    }

    public void setMetaDescription(String metaDescription) {
        this.metaDescription = metaDescription;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CmPortal cmPortal = (CmPortal) o;
        if (cmPortal.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cmPortal.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CmPortal{" +
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
