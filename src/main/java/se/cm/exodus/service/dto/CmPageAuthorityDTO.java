package se.cm.exodus.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the CmPageAuthority entity.
 */
public class CmPageAuthorityDTO implements Serializable {

    private Long id;

    @NotNull
    private String user;

    @NotNull
    private String role;

    private Long cmPageId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getCmPageId() {
        return cmPageId;
    }

    public void setCmPageId(Long cmPageId) {
        this.cmPageId = cmPageId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CmPageAuthorityDTO cmPageAuthorityDTO = (CmPageAuthorityDTO) o;
        if(cmPageAuthorityDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cmPageAuthorityDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CmPageAuthorityDTO{" +
            "id=" + getId() +
            ", user='" + getUser() + "'" +
            ", role='" + getRole() + "'" +
            "}";
    }
}
