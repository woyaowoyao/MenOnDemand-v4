<template>
    <div>
        <h2 id="page-heading">
            <span id="training-record-heading">Training Records</span>
            <router-link :to="{name: 'TrainingRecordCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-training-record">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create a new Training Record
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
        <div class="alert alert-warning" v-if="!isFetching && trainingRecords && trainingRecords.length === 0">
            <span>No trainingRecords found</span>
        </div>
        <div class="table-responsive" v-if="trainingRecords && trainingRecords.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span>ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('status')"><span>Status</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'status'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('progress')"><span>Progress</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'progress'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('commissionAmount')"><span>Commission Amount</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'commissionAmount'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('avgRating')"><span>Avg Rating</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'avgRating'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('amountReceived')"><span>Amount Received</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'amountReceived'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('userName')"><span>User Name</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'userName'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('fees')"><span>Fees</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'fees'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('remarks')"><span>Remarks</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'remarks'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('user.firstName')"><span>User</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'user.firstName'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('training.name')"><span>Training</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'training.name'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('skill.name')"><span>Skill</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'skill.name'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="trainingRecord in trainingRecords"
                    :key="trainingRecord.id">
                    <td>
                        <router-link :to="{name: 'TrainingRecordView', params: {trainingRecordId: trainingRecord.id}}">{{trainingRecord.id}}</router-link>
                    </td>
                    <td>{{trainingRecord.status}}</td>
                    <td>{{trainingRecord.progress}}</td>
                    <td>{{trainingRecord.commissionAmount}}</td>
                    <td>{{trainingRecord.avgRating}}</td>
                    <td>{{trainingRecord.amountReceived}}</td>
                    <td>{{trainingRecord.userName}}</td>
                    <td>{{trainingRecord.fees}}</td>
                    <td>{{trainingRecord.remarks}}</td>
                    <td>
                        {{trainingRecord.user ? trainingRecord.user.firstName : ''}}
                    </td>
                    <td>
                        <div v-if="trainingRecord.training">
                            <router-link :to="{name: 'TrainingView', params: {trainingId: trainingRecord.training.id}}">{{trainingRecord.training.name}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="trainingRecord.skill">
                            <router-link :to="{name: 'TechnologyView', params: {technologyId: trainingRecord.skill.id}}">{{trainingRecord.skill.name}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'TrainingRecordView', params: {trainingRecordId: trainingRecord.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'TrainingRecordEdit', params: {trainingRecordId: trainingRecord.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(trainingRecord)"
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
            <span slot="modal-title"><span id="vueGatewayv4App.trainingRecord.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-trainingRecord-heading">Are you sure you want to delete this Training Record?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-trainingRecord" v-on:click="removeTrainingRecord()">Delete</button>
            </div>
        </b-modal>
        <div v-show="trainingRecords && trainingRecords.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./training-record.component.ts">
</script>
