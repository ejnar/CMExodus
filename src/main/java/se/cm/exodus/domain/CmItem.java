package se.cm.exodus.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import se.cm.exodus.domain.enumeration.LayoutType;

/**
 * A CmItem.
 */
@Entity
@Table(name = "cm_item")
public class CmItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_date")
    private LocalDate date;

    @Column(name = "tool_tip")
    private String toolTip;

    @Enumerated(EnumType.STRING)
    @Column(name = "layout")
    private LayoutType layout;

    @ManyToOne
    private CmModule cmModule;

    @OneToMany(mappedBy = "cmItem")
    @JsonIgnore
    private Set<CmText> texts = new HashSet<>();

    @OneToMany(mappedBy = "cmItem")
    @JsonIgnore
    private Set<CmImage> images = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public CmItem date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getToolTip() {
        return toolTip;
    }

    public CmItem toolTip(String toolTip) {
        this.toolTip = toolTip;
        return this;
    }

    public void setToolTip(String toolTip) {
        this.toolTip = toolTip;
    }

    public LayoutType getLayout() {
        return layout;
    }

    public CmItem layout(LayoutType layout) {
        this.layout = layout;
        return this;
    }

    public void setLayout(LayoutType layout) {
        this.layout = layout;
    }

    public CmModule getCmModule() {
        return cmModule;
    }

    public CmItem cmModule(CmModule cmModule) {
        this.cmModule = cmModule;
        return this;
    }

    public void setCmModule(CmModule cmModule) {
        this.cmModule = cmModule;
    }

    public Set<CmText> getTexts() {
        return texts;
    }

    public CmItem texts(Set<CmText> cmTexts) {
        this.texts = cmTexts;
        return this;
    }

    public CmItem addText(CmText cmText) {
        this.texts.add(cmText);
        cmText.setCmItem(this);
        return this;
    }

    public CmItem removeText(CmText cmText) {
        this.texts.remove(cmText);
        cmText.setCmItem(null);
        return this;
    }

    public void setTexts(Set<CmText> cmTexts) {
        this.texts = cmTexts;
    }

    public Set<CmImage> getImages() {
        return images;
    }

    public CmItem images(Set<CmImage> cmImages) {
        this.images = cmImages;
        return this;
    }

    public CmItem addImage(CmImage cmImage) {
        this.images.add(cmImage);
        cmImage.setCmItem(this);
        return this;
    }

    public CmItem removeImage(CmImage cmImage) {
        this.images.remove(cmImage);
        cmImage.setCmItem(null);
        return this;
    }

    public void setImages(Set<CmImage> cmImages) {
        this.images = cmImages;
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
        CmItem cmItem = (CmItem) o;
        if (cmItem.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cmItem.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CmItem{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", toolTip='" + getToolTip() + "'" +
            ", layout='" + getLayout() + "'" +
            "}";
    }
}