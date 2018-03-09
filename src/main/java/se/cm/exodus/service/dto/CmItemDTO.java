package se.cm.exodus.service.dto;


import java.time.LocalDate;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import se.cm.exodus.domain.enumeration.LayoutType;

/**
 * A DTO for the CmItem entity.
 */
public class CmItemDTO implements Serializable {

    private Long id;

    private LocalDate date;

    private String toolTip;

    private LayoutType layout;

    private Long cmModuleId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getToolTip() {
        return toolTip;
    }

    public void setToolTip(String toolTip) {
        this.toolTip = toolTip;
    }

    public LayoutType getLayout() {
        return layout;
    }

    public void setLayout(LayoutType layout) {
        this.layout = layout;
    }

    public Long getCmModuleId() {
        return cmModuleId;
    }

    public void setCmModuleId(Long cmModuleId) {
        this.cmModuleId = cmModuleId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CmItemDTO cmItemDTO = (CmItemDTO) o;
        if(cmItemDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cmItemDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CmItemDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", toolTip='" + getToolTip() + "'" +
            ", layout='" + getLayout() + "'" +
            "}";
    }
}
