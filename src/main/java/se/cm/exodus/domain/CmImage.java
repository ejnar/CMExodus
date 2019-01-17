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
    @Column(name = "name", unique = true, nullable = false)
    private String name;

    @NotNull
    @Column(name = "image_type", nullable = false)
    private String imageType;

    @Column(name = "tool_tip")
    private String toolTip;

    @Column(name = "sorted")
    private Integer sorted;

    @Enumerated(EnumType.STRING)
    @Column(name = "layout")
    private LayoutType layout;

    @NotNull
    @Column(name = "publish", nullable = false)
    private Boolean publish;

    @ManyToOne
    private CmModule cmModule;

    @ManyToOne
    private CmItem cmItem;

    @Column(name = "data_saved")
    private Boolean dataSaved;

    @Column(name = "data")
    private byte[] data;

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

    public String getImageType() {
        return imageType;
    }

    public CmImage imageType(String imageType) {
        this.imageType = imageType;
        return this;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
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

    public Integer getSorted() {
        return sorted;
    }

    public CmImage sorted(Integer sorted) {
        this.sorted = sorted;
        return this;
    }

    public void setSorted(Integer sorted) {
        this.sorted = sorted;
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

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public Boolean isDataSaved() {
        return dataSaved;
    }

    public Boolean getDataSaved() {
        return dataSaved;
    }

    public void setDataSaved(Boolean dataSaved) {
        this.dataSaved = dataSaved;
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
            ", imageType='" + getImageType() + "'" +
            ", toolTip='" + getToolTip() + "'" +
            ", sorted=" + getSorted() +
            ", layout='" + getLayout() + "'" +
            ", publish='" + isPublish() + "'" +
            "}";
    }
}
