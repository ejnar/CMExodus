package se.cm.exodus.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import se.cm.exodus.domain.enumeration.TextType;

import se.cm.exodus.domain.enumeration.LayoutType;

/**
 * A CmText.
 */
@Entity
@Table(name = "cm_text")
public class CmText implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "text_sv", nullable = false)
    private String textSv;

    @Column(name = "text_en")
    private String textEn;

    @Column(name = "font_size")
    private String fontSize;

    @Column(name = "font_weight")
    private String fontWeight;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private TextType type;

    @Column(name = "jhi_sort")
    private Integer sort;

    @Enumerated(EnumType.STRING)
    @Column(name = "layout")
    private LayoutType layout;

    @Column(name = "jhi_date")
    private LocalDate date;

    @Column(name = "publish_date")
    private LocalDate publishDate;

    @NotNull
    @Column(name = "publish", nullable = false)
    private Boolean publish;

    @ManyToOne
    private CmModule cmModule;

    @ManyToOne
    private CmItem cmItem;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTextSv() {
        return textSv;
    }

    public CmText textSv(String textSv) {
        this.textSv = textSv;
        return this;
    }

    public void setTextSv(String textSv) {
        this.textSv = textSv;
    }

    public String getTextEn() {
        return textEn;
    }

    public CmText textEn(String textEn) {
        this.textEn = textEn;
        return this;
    }

    public void setTextEn(String textEn) {
        this.textEn = textEn;
    }

    public String getFontSize() {
        return fontSize;
    }

    public CmText fontSize(String fontSize) {
        this.fontSize = fontSize;
        return this;
    }

    public void setFontSize(String fontSize) {
        this.fontSize = fontSize;
    }

    public String getFontWeight() {
        return fontWeight;
    }

    public CmText fontWeight(String fontWeight) {
        this.fontWeight = fontWeight;
        return this;
    }

    public void setFontWeight(String fontWeight) {
        this.fontWeight = fontWeight;
    }

    public TextType getType() {
        return type;
    }

    public CmText type(TextType type) {
        this.type = type;
        return this;
    }

    public void setType(TextType type) {
        this.type = type;
    }

    public Integer getSort() {
        return sort;
    }

    public CmText sort(Integer sort) {
        this.sort = sort;
        return this;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public LayoutType getLayout() {
        return layout;
    }

    public CmText layout(LayoutType layout) {
        this.layout = layout;
        return this;
    }

    public void setLayout(LayoutType layout) {
        this.layout = layout;
    }

    public LocalDate getDate() {
        return date;
    }

    public CmText date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalDate getPublishDate() {
        return publishDate;
    }

    public CmText publishDate(LocalDate publishDate) {
        this.publishDate = publishDate;
        return this;
    }

    public void setPublishDate(LocalDate publishDate) {
        this.publishDate = publishDate;
    }

    public Boolean isPublish() {
        return publish;
    }

    public CmText publish(Boolean publish) {
        this.publish = publish;
        return this;
    }

    public void setPublish(Boolean publish) {
        this.publish = publish;
    }

    public CmModule getCmModule() {
        return cmModule;
    }

    public CmText cmModule(CmModule cmModule) {
        this.cmModule = cmModule;
        return this;
    }

    public void setCmModule(CmModule cmModule) {
        this.cmModule = cmModule;
    }

    public CmItem getCmItem() {
        return cmItem;
    }

    public CmText cmItem(CmItem cmItem) {
        this.cmItem = cmItem;
        return this;
    }

    public void setCmItem(CmItem cmItem) {
        this.cmItem = cmItem;
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
        CmText cmText = (CmText) o;
        if (cmText.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cmText.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CmText{" +
            "id=" + getId() +
            ", textSv='" + getTextSv() + "'" +
            ", textEn='" + getTextEn() + "'" +
            ", fontSize='" + getFontSize() + "'" +
            ", fontWeight='" + getFontWeight() + "'" +
            ", type='" + getType() + "'" +
            ", sort=" + getSort() +
            ", layout='" + getLayout() + "'" +
            ", date='" + getDate() + "'" +
            ", publishDate='" + getPublishDate() + "'" +
            ", publish='" + isPublish() + "'" +
            "}";
    }
}
