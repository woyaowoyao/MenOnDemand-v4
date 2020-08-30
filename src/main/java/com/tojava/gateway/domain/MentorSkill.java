package com.tojava.gateway.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A MentorSkill.
 */
@Entity
@Table(name = "mentor_skill")
public class MentorSkill implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "self_rate")
    private String selfRate;

    @Column(name = "experience")
    private Float experience;

    @OneToOne
    @JoinColumn(unique = true)
    private Technology technology;

    @ManyToOne
    @JsonIgnoreProperties(value = "mentorSkills", allowSetters = true)
    private Mentor mentor;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSelfRate() {
        return selfRate;
    }

    public MentorSkill selfRate(String selfRate) {
        this.selfRate = selfRate;
        return this;
    }

    public void setSelfRate(String selfRate) {
        this.selfRate = selfRate;
    }

    public Float getExperience() {
        return experience;
    }

    public MentorSkill experience(Float experience) {
        this.experience = experience;
        return this;
    }

    public void setExperience(Float experience) {
        this.experience = experience;
    }

    public Technology getTechnology() {
        return technology;
    }

    public MentorSkill technology(Technology technology) {
        this.technology = technology;
        return this;
    }

    public void setTechnology(Technology technology) {
        this.technology = technology;
    }

    public Mentor getMentor() {
        return mentor;
    }

    public MentorSkill mentor(Mentor mentor) {
        this.mentor = mentor;
        return this;
    }

    public void setMentor(Mentor mentor) {
        this.mentor = mentor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MentorSkill)) {
            return false;
        }
        return id != null && id.equals(((MentorSkill) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MentorSkill{" +
            "id=" + getId() +
            ", selfRate='" + getSelfRate() + "'" +
            ", experience=" + getExperience() +
            "}";
    }
}
