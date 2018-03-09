package se.cm.exodus.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A CmTopic.
 */
@Entity
@Table(name = "cm_topic")
public class CmTopic implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "cmTopic")
    @JsonIgnore
    private Set<CmSubTopic> subTopics = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public CmTopic name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<CmSubTopic> getSubTopics() {
        return subTopics;
    }

    public CmTopic subTopics(Set<CmSubTopic> cmSubTopics) {
        this.subTopics = cmSubTopics;
        return this;
    }

    public CmTopic addSubTopic(CmSubTopic cmSubTopic) {
        this.subTopics.add(cmSubTopic);
        cmSubTopic.setCmTopic(this);
        return this;
    }

    public CmTopic removeSubTopic(CmSubTopic cmSubTopic) {
        this.subTopics.remove(cmSubTopic);
        cmSubTopic.setCmTopic(null);
        return this;
    }

    public void setSubTopics(Set<CmSubTopic> cmSubTopics) {
        this.subTopics = cmSubTopics;
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
        CmTopic cmTopic = (CmTopic) o;
        if (cmTopic.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cmTopic.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CmTopic{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
