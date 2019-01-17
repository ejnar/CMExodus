package se.cm.exodus.service.dto;

import se.cm.exodus.domain.enumeration.ColumnLayout;
import se.cm.exodus.domain.enumeration.LayoutType;
import se.cm.exodus.domain.enumeration.ModuleType;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;

public class CmModuleConfigDTO implements Serializable {

    private Long id;

    private Integer sorted;

    private LocalDate publishDate;

    @NotNull
    private Boolean publish;

    private LayoutType layout;

    private ColumnLayout columnLayout;

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

    public LocalDate getPublishDate() { return publishDate; }

    public void setPublishDate(LocalDate publishDate) { this.publishDate = publishDate; }

    public Boolean getPublish() { return publish; }

    public void setPublish(Boolean publish) { this.publish = publish; }

    public LayoutType getLayout() {
        return layout;
    }

    public void setLayout(LayoutType layout) {
        this.layout = layout;
    }

    public ColumnLayout getColumnLayout() { return columnLayout; }

    public void setColumnLayout(ColumnLayout columnLayout) { this.columnLayout = columnLayout; }

    @Override
    public String toString() {
        return "CmModuleDTO{" +
            "id=" + getId() +
            ", sorted=" + getSorted() +
            ", layout='" + getLayout() + "'" +
            "}";
    }
}
