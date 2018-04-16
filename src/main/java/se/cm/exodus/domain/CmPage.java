package se.cm.exodus.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import se.cm.exodus.domain.enumeration.PageLayout;

/**
 * A CmPage.
 */
@Entity
@Table(name = "cm_page")
public class CmPage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "title_sv", nullable = false)
    private String titleSv;

    @NotNull
    @Column(name = "title_en", nullable = false)
    private String titleEn;

    @Column(name = "meta_title")
    private String metaTitle;

    @Column(name = "meta_description")
    private String metaDescription;

    @Column(name = "sorted")
    private Integer sorted;

    @Enumerated(EnumType.STRING)
    @Column(name = "page_layout")
    private PageLayout pageLayout;

    @OneToMany(mappedBy = "cmPage")
    @JsonIgnore
    private Set<CmPageAuthority> authorities = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "cm_page_module",
               joinColumns = @JoinColumn(name="cm_pages_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="modules_id", referencedColumnName="id"))
    private Set<CmModule> modules = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitleSv() {
        return titleSv;
    }

    public CmPage titleSv(String titleSv) {
        this.titleSv = titleSv;
        return this;
    }

    public void setTitleSv(String titleSv) {
        this.titleSv = titleSv;
    }

    public String getTitleEn() {
        return titleEn;
    }

    public CmPage titleEn(String titleEn) {
        this.titleEn = titleEn;
        return this;
    }

    public void setTitleEn(String titleEn) {
        this.titleEn = titleEn;
    }

    public String getMetaTitle() {
        return metaTitle;
    }

    public CmPage metaTitle(String metaTitle) {
        this.metaTitle = metaTitle;
        return this;
    }

    public void setMetaTitle(String metaTitle) {
        this.metaTitle = metaTitle;
    }

    public String getMetaDescription() {
        return metaDescription;
    }

    public CmPage metaDescription(String metaDescription) {
        this.metaDescription = metaDescription;
        return this;
    }

    public void setMetaDescription(String metaDescription) {
        this.metaDescription = metaDescription;
    }

    public Integer getSorted() {
        return sorted;
    }

    public CmPage sorted(Integer sorted) {
        this.sorted = sorted;
        return this;
    }

    public void setSorted(Integer sorted) {
        this.sorted = sorted;
    }

    public PageLayout getPageLayout() {
        return pageLayout;
    }

    public CmPage pageLayout(PageLayout pageLayout) {
        this.pageLayout = pageLayout;
        return this;
    }

    public void setPageLayout(PageLayout pageLayout) {
        this.pageLayout = pageLayout;
    }

    public Set<CmPageAuthority> getAuthorities() {
        return authorities;
    }

    public CmPage authorities(Set<CmPageAuthority> cmPageAuthorities) {
        this.authorities = cmPageAuthorities;
        return this;
    }

    public CmPage addAuthority(CmPageAuthority cmPageAuthority) {
        this.authorities.add(cmPageAuthority);
        cmPageAuthority.setCmPage(this);
        return this;
    }

    public CmPage removeAuthority(CmPageAuthority cmPageAuthority) {
        this.authorities.remove(cmPageAuthority);
        cmPageAuthority.setCmPage(null);
        return this;
    }

    public void setAuthorities(Set<CmPageAuthority> cmPageAuthorities) {
        this.authorities = cmPageAuthorities;
    }

    public Set<CmModule> getModules() {
        return modules;
    }

    public CmPage modules(Set<CmModule> cmModules) {
        this.modules = cmModules;
        return this;
    }

    public CmPage addModule(CmModule cmModule) {
        this.modules.add(cmModule);
        return this;
    }

    public CmPage removeModule(CmModule cmModule) {
        this.modules.remove(cmModule);
        return this;
    }

    public void setModules(Set<CmModule> cmModules) {
        this.modules = cmModules;
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
        CmPage cmPage = (CmPage) o;
        if (cmPage.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cmPage.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CmPage{" +
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
