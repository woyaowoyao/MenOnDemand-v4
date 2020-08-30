<template>
    <div>
        <h2 id="page-heading">
            <span id="mentor-skill-heading">Mentor Skills</span>
            <router-link :to="{name: 'MentorSkillCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-mentor-skill">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create a new Mentor Skill
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && mentorSkills && mentorSkills.length === 0">
            <span>No mentorSkills found</span>
        </div>
        <div class="table-responsive" v-if="mentorSkills && mentorSkills.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Self Rate</span></th>
                    <th><span>Experience</span></th>
                    <th><span>Technology</span></th>
                    <th><span>Mentor</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="mentorSkill in mentorSkills"
                    :key="mentorSkill.id">
                    <td>
                        <router-link :to="{name: 'MentorSkillView', params: {mentorSkillId: mentorSkill.id}}">{{mentorSkill.id}}</router-link>
                    </td>
                    <td>{{mentorSkill.selfRate}}</td>
                    <td>{{mentorSkill.experience}}</td>
                    <td>
                        <div v-if="mentorSkill.technology">
                            <router-link :to="{name: 'TechnologyView', params: {technologyId: mentorSkill.technology.id}}">{{mentorSkill.technology.name}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="mentorSkill.mentor">
                            <router-link :to="{name: 'MentorView', params: {mentorId: mentorSkill.mentor.id}}">{{mentorSkill.mentor.firstName}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'MentorSkillView', params: {mentorSkillId: mentorSkill.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'MentorSkillEdit', params: {mentorSkillId: mentorSkill.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(mentorSkill)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="vueGatewayv4App.mentorSkill.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-mentorSkill-heading">Are you sure you want to delete this Mentor Skill?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-mentorSkill" v-on:click="removeMentorSkill()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./mentor-skill.component.ts">
</script>
