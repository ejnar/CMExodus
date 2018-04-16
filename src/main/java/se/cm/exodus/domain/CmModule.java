package se.cm.exodus.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import se.cm.exodus.domain.enumeration.ModuleType;

import se.cm.exodus.domain.enumeration.LayoutType;

import se.cm.exodus.domain.enumeration.ColumnLayout;

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

    @Column(name = "sorted")
    private Integer sorted;

    @Enumerated(EnumType.STRING)
    @Column(name = "module_type")
    private ModuleType moduleType;

    @Enumerated(EnumType.STRING)
    @Column(name = "layout")
    private LayoutType layout;

    @Enumerated(EnumType.STRING)
    @Column(name = "column_layout")
    private ColumnLayout columnLayout;

    @OneToMany(mappedBy = "cmModule")
    @JsonIgnore
    private Set<CmItem> items = new HashSet<>();

    @OneToMany(mappedBy = "cmModule")
    @JsonIgnore
    private Set<CmItemList> itemLists = new HashSet<>();

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

    public Integer getSorted() {
        return sorted;
    }

    public CmModule sorted(Integer sorted) {
        this.sorted = sorted;
        return this;
    }

    public void setSorted(Integer sorted) {
        this.sorted = sorted;
    }

    public ModuleType getModuleType() {
        return moduleType;
    }

    public CmModule moduleType(ModuleType moduleType) {
        this.moduleType = moduleType;
        return this;
    }

    public void setModuleType(ModuleType moduleType) {
        this.moduleType = moduleType;
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

    public ColumnLayout getColumnLayout() {
        return columnLayout;
    }

    public CmModule columnLayout(ColumnLayout columnLayout) {
        this.columnLayout = columnLayout;
        return this;
    }

    public void setColumnLayout(ColumnLayout columnLayout) {
        this.columnLayout = columnLayout;
    }

    public Set<CmItem> getItems() {
        return items;
    }

    public CmModule items(Set<CmItem> cmItems) {
        this.items = cmItems;
        return this;
    }

    public CmModule addItem(CmItem cmItem) {
        this.items.add(cmItem);
        cmItem.setCmModule(this);
        return this;
    }

    public CmModule removeItem(CmItem cmItem) {
        this.items.remove(cmItem);
        cmItem.setCmModule(null);
        return this;
    }

    public void setItems(Set<CmItem> cmItems) {
        this.items = cmItems;
    }

    public Set<CmItemList> getItemLists() {
        return itemLists;
    }

    public CmModule itemLists(Set<CmItemList> cmItemLists) {
        this.itemLists = cmItemLists;
        return this;
    }

    public CmModule addItemList(CmItemList cmItemList) {
        this.itemLists.add(cmItemList);
        cmItemList.setCmModule(this);
        return this;
    }

    public CmModule removeItemList(CmItemList cmItemList) {
        this.itemLists.remove(cmItemList);
        cmItemList.setCmModule(null);
        return this;
    }

    public void setItemLists(Set<CmItemList> cmItemLists) {
        this.itemLists = cmItemLists;
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
            ", sorted=" + getSorted() +
            ", moduleType='" + getModuleType() + "'" +
            ", layout='" + getLayout() + "'" +
            ", columnLayout='" + getColumnLayout() + "'" +
            "}";
    }
}
