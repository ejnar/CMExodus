package se.cm.exodus.domain;

import se.cm.exodus.domain.enumeration.ColumnLayout;
import se.cm.exodus.domain.enumeration.LayoutType;
import se.cm.exodus.domain.enumeration.ModuleType;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "cm_module_config")
public class CmModuleConfig implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "sorted")
    private Integer sorted;

    @Column(name = "publish_date")
    private LocalDate publishDate;

    @NotNull
    @Column(name = "publish", nullable = false)
    private Boolean publish;

    @Enumerated(EnumType.STRING)
    @Column(name = "layout")
    private LayoutType layout;

    @Enumerated(EnumType.STRING)
    @Column(name = "column_layout")
    private ColumnLayout columnLayout;

    @ManyToOne
    private CmPage cmPage;

    @ManyToOne
    private CmModule cmModule;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSorted() {
        return sorted;
    }

    public CmModuleConfig sorted(Integer sorted) {
        this.sorted = sorted;
        return this;
    }

    public void setSorted(Integer sorted) {
        this.sorted = sorted;
    }

    public LocalDate getPublishDate() { return publishDate; }

    public void setPublishDate(LocalDate publishDate) { this.publishDate = publishDate; }

    public CmModuleConfig publishDate(LocalDate publishDate) {
        this.publishDate = publishDate;
        return this;
    }

    public Boolean getPublish() { return publish; }

    public void setPublish(Boolean publish) { this.publish = publish; }

    public CmModuleConfig publish(Boolean publish) {
        this.publish = publish;
        return this;
    }

    public LayoutType getLayout() {
        return layout;
    }

    public CmModuleConfig layout(LayoutType layout) {
        this.layout = layout;
        return this;
    }

    public void setLayout(LayoutType layout) {
        this.layout = layout;
    }

    public ColumnLayout getColumnLayout() {
        return columnLayout;
    }

    public CmModuleConfig columnLayout(ColumnLayout columnLayout) {
        this.columnLayout = columnLayout;
        return this;
    }

    public void setColumnLayout(ColumnLayout columnLayout) {
        this.columnLayout = columnLayout;
    }

    public CmPage getCmPage() {
        return cmPage;
    }

    public CmModuleConfig cmPage(CmPage cmPage) {
        this.cmPage = cmPage;
        return this;
    }

    public void setCmPage(CmPage cmPage) {
        this.cmPage = cmPage;
    }

    public CmModule getCmModule() {
        return cmModule;
    }

    public CmModuleConfig cmModule(CmModule cmModule) {
        this.cmModule = cmModule;
        return this;
    }

    public void setCmModule(CmModule cmModule) {
        this.cmModule = cmModule;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CmModuleConfig that = (CmModuleConfig) o;
        if (that.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "CmModuleConfig{" +
            "id=" + id +
            ", sorted=" + sorted +
            ", publishDate=" + publishDate +
            ", publish=" + publish +
            ", layout=" + layout +
            ", columnLayout=" + columnLayout +
            '}';
    }
}
