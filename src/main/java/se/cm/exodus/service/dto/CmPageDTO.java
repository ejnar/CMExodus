package se.cm.exodus.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import se.cm.exodus.domain.enumeration.PageLayout;

/**
 * A DTO for the CmPage entity.
 */
public class CmPageDTO implements Serializable {

    private Long id;

    @NotNull
    private String title;

    private String metaTitle;

    private String metaDescription;

    private Integer sort;

    private PageLayout layout;

    private Set<CmModuleDTO> modules = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMetaTitle() {
        return metaTitle;
    }

    public void setMetaTitle(String metaTitle) {
        this.metaTitle = metaTitle;
    }

    public String getMetaDescription() {
        return metaDescription;
    }

    public void setMetaDescription(String metaDescription) {
        this.metaDescription = metaDescription;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public PageLayout getLayout() {
        return layout;
    }

    public void setLayout(PageLayout layout) {
        this.layout = layout;
    }

    public Set<CmModuleDTO> getModules() {
        return modules;
    }

    public void setModules(Set<CmModuleDTO> cmModules) {
        this.modules = cmModules;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CmPageDTO cmPageDTO = (CmPageDTO) o;
        if(cmPageDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cmPageDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CmPageDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", metaTitle='" + getMetaTitle() + "'" +
            ", metaDescription='" + getMetaDescription() + "'" +
            ", sort=" + getSort() +
            ", layout='" + getLayout() + "'" +
            "}";
    }
}
