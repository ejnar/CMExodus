package se.cm.exodus.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CmPageAuthority.
 */
@Entity
@Table(name = "cm_page_authority")
public class CmPageAuthority implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "jhi_user_id", nullable = false)
    private Long userId;

    // @JsonIgnore
    @Column(name = "jhi_user", nullable = true)
    private String user;

    @NotNull
    @Column(name = "jhi_role", nullable = false)
    private String role;

    @ManyToOne
    private CmPage cmPage;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() { return userId; }

    public void setUserId(Long userId) { this.userId = userId; }

    public CmPageAuthority userId(Long userId) {
        this.userId = userId;
        return this;
    }

    public String getUser() {
        return user;
    }

    public CmPageAuthority user(String user) {
        this.user = user;
        return this;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getRole() {
        return role;
    }

    public CmPageAuthority role(String role) {
        this.role = role;
        return this;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public CmPage getCmPage() {
        return cmPage;
    }

    public CmPageAuthority cmPage(CmPage cmPage) {
        this.cmPage = cmPage;
        return this;
    }

    public void setCmPage(CmPage cmPage) {
        this.cmPage = cmPage;
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
        CmPageAuthority cmPageAuthority = (CmPageAuthority) o;
        if (cmPageAuthority.getId() == null || getId() == null) {
            return false;
        }

        if(Objects.equals(getUser(), cmPageAuthority.getUser())
            && Objects.equals(getRole(), cmPageAuthority.getRole())
                && getCmPage().equals(cmPageAuthority.getCmPage())){
            return true;
        }
        return false;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CmPageAuthority{" +
            "id=" + getId() +
            ", user='" + getUser() + "'" +
            ", role='" + getRole() + "'" +
            "}";
    }
}
