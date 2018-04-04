package se.cm.exodus.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import se.cm.exodus.domain.enumeration.ModuleType;
import se.cm.exodus.domain.enumeration.LayoutType;

/**
 * A DTO for the CmModule entity.
 */
public class CmModuleDTO implements Serializable {

    private Long id;

    private Integer sorted;

    private ModuleType moduleType;

    private LayoutType layout;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSorted() {
        return sorted;
    }

    public void setSorted(Integer sorted) {
        this.sorted = sorted;
    }

    public ModuleType getModuleType() {
        return moduleType;
    }

    public void setModuleType(ModuleType moduleType) {
        this.moduleType = moduleType;
    }

    public LayoutType getLayout() {
        return layout;
    }

    public void setLayout(LayoutType layout) {
        this.layout = layout;
    }

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
            ", sorted=" + getSorted() +
            ", moduleType='" + getModuleType() + "'" +
            ", layout='" + getLayout() + "'" +
            "}";
    }
}
