package se.cm.exodus.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;
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
    @Column(name = "text_type")
    private TextType textType;

    @Column(name = "sorted")
    private Integer sorted;

    @Enumerated(EnumType.STRING)
    @Column(name = "layout")
    private LayoutType layout;

    @Column(name = "text_date")
    private ZonedDateTime textDate;

    @NotNull
    @Column(name = "publish", nullable = false)
    private Boolean publish;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CM_MODULE_ID")
    private CmModule cmModule;

    @ManyToOne(fetch = FetchType.LAZY)
    private CmItem cmItem;

    @OneToOne
    @JoinColumn(unique = false)
    private CmImage image;

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

    public TextType getTextType() {
        return textType;
    }

    public CmText textType(TextType textType) {
        this.textType = textType;
        return this;
    }

    public void setTextType(TextType textType) {
        this.textType = textType;
    }

    public Integer getSorted() {
        return sorted;
    }

    public CmText sorted(Integer sorted) {
        this.sorted = sorted;
        return this;
    }

    public void setSorted(Integer sorted) {
        this.sorted = sorted;
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

    public ZonedDateTime getTextDate() {
        return textDate;
    }

    public CmText textDate(ZonedDateTime textDate) {
        this.textDate = textDate;
        return this;
    }

    public void setTextDate(ZonedDateTime textDate) {
        this.textDate = textDate;
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

    public CmImage getImage() {
        return image;
    }

    public CmText image(CmImage cmImage) {
        this.image = cmImage;
        return this;
    }

    public void setImage(CmImage cmImage) {
        this.image = cmImage;
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
            ", textType='" + getTextType() + "'" +
            ", sorted=" + getSorted() +
            ", layout='" + getLayout() + "'" +
            ", textDate='" + getTextDate() + "'" +
            ", publish='" + isPublish() + "'" +
            "}";
    }
}
