package se.cm.exodus.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
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
    private String titleSv;

    @NotNull
    private String titleEn;

    private String metaTitle;

    private String metaDescription;

    private Integer sorted;

    private LocalDate publishDate;

    @NotNull
    private Boolean publish;

    private PageLayout pageLayout;

    private Set<CmModuleDTO> modules = new HashSet<>();

    private Set<CmPageAuthorityDTO> authorities = new HashSet<>();

    private Set<CmModuleConfigDTO> moduleConfigs = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitleSv() {
        return titleSv;
    }

    public void setTitleSv(String titleSv) {
        this.titleSv = titleSv;
    }

    public String getTitleEn() {
        return titleEn;
    }

    public void setTitleEn(String titleEn) {
        this.titleEn = titleEn;
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

    public Integer getSorted() {
        return sorted;
    }

    public void setSorted(Integer sorted) {
        this.sorted = sorted;
    }

    public LocalDate getPublishDate() { return publishDate; }

    public void setPublishDate(LocalDate publishDate) { this.publishDate = publishDate; }

    public Boolean getPublish() { return publish; }

    public void setPublish(Boolean publish) { this.publish = publish; }

    public PageLayout getPageLayout() {
        return pageLayout;
    }

    public void setPageLayout(PageLayout pageLayout) {
        this.pageLayout = pageLayout;
    }

    public Set<CmModuleDTO> getModules() {
        return modules;
    }

    public void setModules(Set<CmModuleDTO> cmModules) {
        this.modules = cmModules;
    }

    public Set<CmPageAuthorityDTO> getAuthorities() { return authorities; }

    public void setAuthorities(Set<CmPageAuthorityDTO> authorities) { this.authorities = authorities; }

    public Set<CmModuleConfigDTO> getModuleConfigs() { return moduleConfigs; }

    public void setModuleConfigs(Set<CmModuleConfigDTO> moduleConfigs) { this.moduleConfigs = moduleConfigs; }

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
            ", titleSv='" + getTitleSv() + "'" +
            ", titleEn='" + getTitleEn() + "'" +
            ", metaTitle='" + getMetaTitle() + "'" +
            ", metaDescription='" + getMetaDescription() + "'" +
            ", sorted=" + getSorted() +
            ", pageLayout='" + getPageLayout() + "'" +
            "}";
    }
}
