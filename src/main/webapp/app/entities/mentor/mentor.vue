<template>
    <div>
        <h2 id="page-heading">
            <span id="mentor-heading">Mentors</span>
            <router-link :to="{name: 'MentorCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-mentor">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create a new Mentor
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
        <div class="alert alert-warning" v-if="!isFetching && mentors && mentors.length === 0">
            <span>No mentors found</span>
        </div>
        <div class="table-responsive" v-if="mentors && mentors.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Username</span></th>
                    <th><span>Linkedin</span></th>
                    <th><span>Reg Datetime</span></th>
                    <th><span>Reg Code</span></th>
                    <th><span>Experience</span></th>
                    <th><span>Status</span></th>
                    <th><span>User</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="mentor in mentors"
                    :key="mentor.id">
                    <td>
                        <router-link :to="{name: 'MentorView', params: {mentorId: mentor.id}}">{{mentor.id}}</router-link>
                    </td>
                    <td>{{mentor.username}}</td>
                    <td>{{mentor.linkedin}}</td>
                    <td>{{mentor.regDatetime | formatDate}}</td>
                    <td>{{mentor.regCode}}</td>
                    <td>{{mentor.experience}}</td>
                    <td>{{mentor.status}}</td>
                    <td>
                        {{mentor.user ? mentor.user.firstName : ''}}
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'MentorView', params: {mentorId: mentor.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'MentorEdit', params: {mentorId: mentor.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(mentor)"
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
            <span slot="modal-title"><span id="vueGatewayv4App.mentor.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-mentor-heading">Are you sure you want to delete this Mentor?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-mentor" v-on:click="removeMentor()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./mentor.component.ts">
</script>
