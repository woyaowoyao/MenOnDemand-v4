<template>
    <div>
        <h2 id="page-heading">
            <span id="my-calendar-heading">My Calendars</span>
            <router-link :to="{name: 'MyCalendarCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-my-calendar">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create a new My Calendar
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
        <div class="alert alert-warning" v-if="!isFetching && myCalendars && myCalendars.length === 0">
            <span>No myCalendars found</span>
        </div>
        <div class="table-responsive" v-if="myCalendars && myCalendars.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Cal Date</span></th>
                    <th><span>Duration</span></th>
                    <th><span>Remarks</span></th>
                    <th><span>Training</span></th>
                    <th><span>User</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="myCalendar in myCalendars"
                    :key="myCalendar.id">
                    <td>
                        <router-link :to="{name: 'MyCalendarView', params: {myCalendarId: myCalendar.id}}">{{myCalendar.id}}</router-link>
                    </td>
                    <td>{{myCalendar.calDate | formatDate}}</td>
                    <td>{{myCalendar.duration}}</td>
                    <td>{{myCalendar.remarks}}</td>
                    <td>
                        <div v-if="myCalendar.training">
                            <router-link :to="{name: 'TrainingView', params: {trainingId: myCalendar.training.id}}">{{myCalendar.training.name}}</router-link>
                        </div>
                    </td>
                    <td>
                        {{myCalendar.user ? myCalendar.user.firstName : ''}}
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'MyCalendarView', params: {myCalendarId: myCalendar.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'MyCalendarEdit', params: {myCalendarId: myCalendar.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(myCalendar)"
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
            <span slot="modal-title"><span id="vueGatewayv4App.myCalendar.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-myCalendar-heading">Are you sure you want to delete this My Calendar?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-myCalendar" v-on:click="removeMyCalendar()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./my-calendar.component.ts">
</script>
