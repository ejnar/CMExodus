package se.cm.exodus.service.dto;


import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import se.cm.exodus.domain.enumeration.ColumnLayout;
import se.cm.exodus.domain.enumeration.ModuleType;
import se.cm.exodus.domain.enumeration.LayoutType;

import javax.validation.constraints.NotNull;

/**
 * A DTO for the CmModule entity.
 */
public class CmModuleDTO implements Serializable {

    private Long id;

    private ModuleType moduleType;

    private Set<CmModuleConfigDTO> moduleConfigs = new HashSet<>();

    private Set<CmItemListDTO> itemLists = new HashSet<>();

    private Set<CmItemDTO> items = new HashSet<>();

    private Set<CmTextDTO> texts = new HashSet<>();

    private Set<CmImageDTO> images = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ModuleType getModuleType() {
        return moduleType;
    }

    public void setModuleType(ModuleType moduleType) {
        this.moduleType = moduleType;
    }

    public Set<CmModuleConfigDTO> getModuleConfigs() { return moduleConfigs; }

    public void setModuleConfigs(Set<CmModuleConfigDTO> moduleConfigs) { this.moduleConfigs = moduleConfigs; }

    public Set<CmItemListDTO> getItemLists() {
        return itemLists;
    }

    public void setItemLists(Set<CmItemListDTO> itemLists) {
        this.itemLists = itemLists;
    }

    public Set<CmItemDTO> getItems() {
        return items;
    }

    public void setItems(Set<CmItemDTO> items) {
        this.items = items;
    }

    public Set<CmTextDTO> getTexts() { return texts; }

    public void setTexts(Set<CmTextDTO> texts) { this.texts = texts; }

    public Set<CmImageDTO> getImages() { return images; }

    public void setImages(Set<CmImageDTO> images) { this.images = images; }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CmModuleDTO cmModuleDTO = (CmModuleDTO) o;
        if(cmModuleDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cmModuleDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CmModuleDTO{" +
            "id=" + getId() +
            ", moduleType='" + getModuleType() + "'" +
            "}";
    }
}
