package se.cm.exodus.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.io.Serializable;
import java.time.LocalDate;
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

    @Enumerated(EnumType.STRING)
    @Column(name = "module_type")
    private ModuleType moduleType;

    @OneToMany(mappedBy = "cmModule", cascade=CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<CmModuleConfig> moduleConfigs = new HashSet<>();

    @OneToMany(mappedBy = "cmModule", cascade=CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<CmItem> items = new HashSet<>();

    @OneToMany(mappedBy = "cmModule", cascade=CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<CmItemList> itemLists = new HashSet<>();

    @OneToMany(mappedBy="cmModule", cascade=CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<CmText> texts = new HashSet<>();

    @OneToMany(mappedBy = "cmModule", cascade=CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<CmImage> images = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Set<CmModuleConfig> getModuleConfigs() {
        return moduleConfigs;
    }

    public CmModule moduleConfigs(Set<CmModuleConfig> moduleConfigs) {
        this.moduleConfigs = moduleConfigs;
        return this;
    }

    public CmModule addModuleConfig(CmModuleConfig cmModuleConfig) {
        this.moduleConfigs.add(cmModuleConfig);
        cmModuleConfig.setCmModule(this);
        return this;
    }

    public CmModule removeModuleConfig(CmModuleConfig cmModuleConfig) {
        this.moduleConfigs.remove(cmModuleConfig);
        cmModuleConfig.setCmModule(null);
        return this;
    }

    public void setModuleConfigs(Set<CmModuleConfig> moduleConfigs) {
        this.moduleConfigs = moduleConfigs;
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
            ", moduleType=" + moduleType +
            "}";
    }
}
