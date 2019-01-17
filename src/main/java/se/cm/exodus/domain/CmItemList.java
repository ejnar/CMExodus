package se.cm.exodus.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.Objects;

import se.cm.exodus.domain.enumeration.TypeOfEvent;

/**
 * A CmItemList.
 */
@Entity
@Table(name = "cm_item_list")
public class CmItemList implements Serializable {

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

    @Column(name = "title_sv")
    private String titleSv;

    @Column(name = "title_en")
    private String titleEn;

    @Column(name = "ingress_sv")
    private String ingressSv;

    @Column(name = "ingress_en")
    private String ingressEn;

    @Column(name = "sorted")
    private Integer sorted;

    @Column(name = "tool_tip")
    private String toolTip;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_of_event")
    private TypeOfEvent typeOfEvent;

    @Column(name = "location")
    private String location;

    @Column(name = "item_date")
    private ZonedDateTime itemDate;

    @Column(name = "publish_date")
    private LocalDate publishDate;

    @NotNull
    @Column(name = "publish", nullable = false)
    private Boolean publish;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CM_MODULE_ID")
    private CmModule cmModule;

    @OneToOne
    @JoinColumn(unique = true)
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

    public CmItemList textSv(String textSv) {
        this.textSv = textSv;
        return this;
    }

    public void setTextSv(String textSv) {
        this.textSv = textSv;
    }

    public String getTextEn() {
        return textEn;
    }

    public CmItemList textEn(String textEn) {
        this.textEn = textEn;
        return this;
    }

    public void setTextEn(String textEn) {
        this.textEn = textEn;
    }

    public String getTitleSv() {
        return titleSv;
    }

    public CmItemList titleSv(String titleSv) {
        this.titleSv = titleSv;
        return this;
    }

    public void setTitleSv(String titleSv) {
        this.titleSv = titleSv;
    }

    public String getTitleEn() {
        return titleEn;
    }

    public CmItemList titleEn(String titleEn) {
        this.titleEn = titleEn;
        return this;
    }

    public void setTitleEn(String titleEn) {
        this.titleEn = titleEn;
    }

    public String getIngressSv() {
        return ingressSv;
    }

    public CmItemList ingressSv(String ingressSv) {
        this.ingressSv = ingressSv;
        return this;
    }

    public void setIngressSv(String ingressSv) {
        this.ingressSv = ingressSv;
    }

    public String getIngressEn() {
        return ingressEn;
    }

    public CmItemList ingressEn(String ingressEn) {
        this.ingressEn = ingressEn;
        return this;
    }

    public void setIngressEn(String ingressEn) {
        this.ingressEn = ingressEn;
    }

    public Integer getSorted() {
        return sorted;
    }

    public CmItemList sorted(Integer sorted) {
        this.sorted = sorted;
        return this;
    }

    public void setSorted(Integer sorted) {
        this.sorted = sorted;
    }

    public String getToolTip() {
        return toolTip;
    }

    public CmItemList toolTip(String toolTip) {
        this.toolTip = toolTip;
        return this;
    }

    public void setToolTip(String toolTip) {
        this.toolTip = toolTip;
    }

    public TypeOfEvent getTypeOfEvent() {
        return typeOfEvent;
    }

    public CmItemList typeOfEvent(TypeOfEvent typeOfEvent) {
        this.typeOfEvent = typeOfEvent;
        return this;
    }

    public void setTypeOfEvent(TypeOfEvent typeOfEvent) {
        this.typeOfEvent = typeOfEvent;
    }

    public String getLocation() {
        return location;
    }

    public CmItemList location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public ZonedDateTime getItemDate() {
        return itemDate;
    }

    public CmItemList itemDate(ZonedDateTime itemDate) {
        this.itemDate = itemDate;
        return this;
    }

    public void setItemDate(ZonedDateTime itemDate) {
        this.itemDate = itemDate;
    }

    public LocalDate getPublishDate() {
        return publishDate;
    }

    public CmItemList publishDate(LocalDate publishDate) {
        this.publishDate = publishDate;
        return this;
    }

    public void setPublishDate(LocalDate publishDate) {
        this.publishDate = publishDate;
    }

    public Boolean isPublish() {
        return publish;
    }

    public CmItemList publish(Boolean publish) {
        this.publish = publish;
        return this;
    }

    public void setPublish(Boolean publish) {
        this.publish = publish;
    }

    public CmModule getCmModule() {
        return cmModule;
    }

    public CmItemList cmModule(CmModule cmModule) {
        this.cmModule = cmModule;
        return this;
    }

    public void setCmModule(CmModule cmModule) {
        this.cmModule = cmModule;
    }

    public CmImage getImage() {
        return image;
    }

    public CmItemList image(CmImage cmImage) {
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
        CmItemList cmItemList = (CmItemList) o;
        if (cmItemList.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cmItemList.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CmItemList{" +
            "id=" + getId() +
            ", textSv='" + getTextSv() + "'" +
            ", textEn='" + getTextEn() + "'" +
            ", titleSv='" + getTitleSv() + "'" +
            ", titleEn='" + getTitleEn() + "'" +
            ", ingressSv='" + getIngressSv() + "'" +
            ", ingressEn='" + getIngressEn() + "'" +
            ", sorted=" + getSorted() +
            ", toolTip='" + getToolTip() + "'" +
            ", typeOfEvent='" + getTypeOfEvent() + "'" +
            ", location='" + getLocation() + "'" +
            ", itemDate='" + getItemDate() + "'" +
            ", publishDate='" + getPublishDate() + "'" +
            ", publish='" + isPublish() + "'" +
            "}";
    }
}
