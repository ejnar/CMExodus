package se.cm.exodus.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import se.cm.exodus.domain.enumeration.LayoutType;

/**
 * A CmImage.
 */
@Entity
@Table(name = "cm_image")
public class CmImage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "jhi_type", nullable = false)
    private String type;

    @Column(name = "tool_tip")
    private String toolTip;

    @Column(name = "jhi_sort")
    private Integer sort;

    @Enumerated(EnumType.STRING)
    @Column(name = "layout")
    private LayoutType layout;

    @Column(name = "jhi_date")
    private LocalDate date;

    @Column(name = "publish_date")
    private LocalDate publishDate;

    @NotNull
    @Column(name = "publish", nullable = false)
    private Boolean publish;

    @ManyToOne
    private CmModule cmModule;

    @ManyToOne
    private CmItem cmItem;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public CmImage name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public CmImage type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getToolTip() {
        return toolTip;
    }

    public CmImage toolTip(String toolTip) {
        this.toolTip = toolTip;
        return this;
    }

    public void setToolTip(String toolTip) {
        this.toolTip = toolTip;
    }

    public Integer getSort() {
        return sort;
    }

    public CmImage sort(Integer sort) {
        this.sort = sort;
        return this;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public LayoutType getLayout() {
        return layout;
    }

    public CmImage layout(LayoutType layout) {
        this.layout = layout;
        return this;
    }

    public void setLayout(LayoutType layout) {
        this.layout = layout;
    }

    public LocalDate getDate() {
        return date;
    }

    public CmImage date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalDate getPublishDate() {
        return publishDate;
    }

    public CmImage publishDate(LocalDate publishDate) {
        this.publishDate = publishDate;
        return this;
    }

    public void setPublishDate(LocalDate publishDate) {
        this.publishDate = publishDate;
    }

    public Boolean isPublish() {
        return publish;
    }

    public CmImage publish(Boolean publish) {
        this.publish = publish;
        return this;
    }

    public void setPublish(Boolean publish) {
        this.publish = publish;
    }

    public CmModule getCmModule() {
        return cmModule;
    }

    public CmImage cmModule(CmModule cmModule) {
        this.cmModule = cmModule;
        return this;
    }

    public void setCmModule(CmModule cmModule) {
        this.cmModule = cmModule;
    }

    public CmItem getCmItem() {
        return cmItem;
    }

    public CmImage cmItem(CmItem cmItem) {
        this.cmItem = cmItem;
        return this;
    }

    public void setCmItem(CmItem cmItem) {
        this.cmItem = cmItem;
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
        CmImage cmImage = (CmImage) o;
        if (cmImage.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cmImage.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CmImage{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", toolTip='" + getToolTip() + "'" +
            ", sort=" + getSort() +
            ", layout='" + getLayout() + "'" +
            ", date='" + getDate() + "'" +
            ", publishDate='" + getPublishDate() + "'" +
            ", publish='" + isPublish() + "'" +
            "}";
    }
}
