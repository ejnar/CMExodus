package se.cm.exodus.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import se.cm.exodus.domain.enumeration.ModuleType;

import se.cm.exodus.domain.enumeration.LayoutType;

/**
 * A CmModule.
 */
@Entity
@Table(name = "cm_module")
public class CmModule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_sort")
    private Integer sort;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private ModuleType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "layout")
    private LayoutType layout;

    @OneToMany(mappedBy = "cmModule")
    @JsonIgnore
    private Set<CmItem> lists = new HashSet<>();

    @OneToMany(mappedBy = "cmModule")
    @JsonIgnore
    private Set<CmText> texts = new HashSet<>();

    @OneToMany(mappedBy = "cmModule")
    @JsonIgnore
    private Set<CmImage> images = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSort() {
        return sort;
    }

    public CmModule sort(Integer sort) {
        this.sort = sort;
        return this;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public ModuleType getType() {
        return type;
    }

    public CmModule type(ModuleType type) {
        this.type = type;
        return this;
    }

    public void setType(ModuleType type) {
        this.type = type;
    }

    public LayoutType getLayout() {
        return layout;
    }

    public CmModule layout(LayoutType layout) {
        this.layout = layout;
        return this;
    }

    public void setLayout(LayoutType layout) {
        this.layout = layout;
    }

    public Set<CmItem> getLists() {
        return lists;
    }

    public CmModule lists(Set<CmItem> cmItems) {
        this.lists = cmItems;
        return this;
    }

    public CmModule addList(CmItem cmItem) {
        this.lists.add(cmItem);
        cmItem.setCmModule(this);
        return this;
    }

    public CmModule removeList(CmItem cmItem) {
        this.lists.remove(cmItem);
        cmItem.setCmModule(null);
        return this;
    }

    public void setLists(Set<CmItem> cmItems) {
        this.lists = cmItems;
    }

    public Set<CmText> getTexts() {
        return texts;
    }

    public CmModule texts(Set<CmText> cmTexts) {
        this.texts = cmTexts;
        return this;
    }

    public CmModule addText(CmText cmText) {
        this.texts.add(cmText);
        cmText.setCmModule(this);
        return this;
    }

    public CmModule removeText(CmText cmText) {
        this.texts.remove(cmText);
        cmText.setCmModule(null);
        return this;
    }

    public void setTexts(Set<CmText> cmTexts) {
        this.texts = cmTexts;
    }

    public Set<CmImage> getImages() {
        return images;
    }

    public CmModule images(Set<CmImage> cmImages) {
        this.images = cmImages;
        return this;
    }

    public CmModule addImage(CmImage cmImage) {
        this.images.add(cmImage);
        cmImage.setCmModule(this);
        return this;
    }

    public CmModule removeImage(CmImage cmImage) {
        this.images.remove(cmImage);
        cmImage.setCmModule(null);
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
        CmModule cmModule = (CmModule) o;
        if (cmModule.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cmModule.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CmModule{" +
            "id=" + getId() +
            ", sort=" + getSort() +
            ", type='" + getType() + "'" +
            ", layout='" + getLayout() + "'" +
            "}";
    }
}
