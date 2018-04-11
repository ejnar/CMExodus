package se.cm.exodus.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CmSubTopic.
 */
@Entity
@Table(name = "cm_sub_topic")
public class CmSubTopic implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name_en", nullable = false)
    private String nameEn;

    @NotNull
    @Column(name = "name_sv", nullable = false)
    private String nameSv;

    @Column(name = "visable")
    private Boolean visable;

    @ManyToOne
    private CmTopic cmTopic;

    @OneToOne
    @JoinColumn(unique = true)
    private CmPage page;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameEn() {
        return nameEn;
    }

    public CmSubTopic nameEn(String nameEn) {
        this.nameEn = nameEn;
        return this;
    }

    public void setNameEn(String nameEn) {
        this.nameEn = nameEn;
    }

    public String getNameSv() {
        return nameSv;
    }

    public CmSubTopic nameSv(String nameSv) {
        this.nameSv = nameSv;
        return this;
    }

    public void setNameSv(String nameSv) {
        this.nameSv = nameSv;
    }

    public Boolean isVisable() {
        return visable;
    }

    public CmSubTopic visable(Boolean visable) {
        this.visable = visable;
        return this;
    }

    public void setVisable(Boolean visable) {
        this.visable = visable;
    }

    public CmTopic getCmTopic() {
        return cmTopic;
    }

    public CmSubTopic cmTopic(CmTopic cmTopic) {
        this.cmTopic = cmTopic;
        return this;
    }

    public void setCmTopic(CmTopic cmTopic) {
        this.cmTopic = cmTopic;
    }

    public CmPage getPage() {
        return page;
    }

    public CmSubTopic page(CmPage cmPage) {
        this.page = cmPage;
        return this;
    }

    public void setPage(CmPage cmPage) {
        this.page = cmPage;
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
        CmSubTopic cmSubTopic = (CmSubTopic) o;
        if (cmSubTopic.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cmSubTopic.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CmSubTopic{" +
            "id=" + getId() +
            ", nameEn='" + getNameEn() + "'" +
            ", nameSv='" + getNameSv() + "'" +
            ", visable='" + isVisable() + "'" +
            "}";
    }
}
