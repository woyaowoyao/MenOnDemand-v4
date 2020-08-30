<template>
    <div>
        <h2 id="page-heading">
            <span id="training-heading">Trainings</span>
            <router-link :to="{name: 'TrainingCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-training">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create a new Training
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
        <div class="alert alert-warning" v-if="!isFetching && trainings && trainings.length === 0">
            <span>No trainings found</span>
        </div>
        <div class="table-responsive" v-if="trainings && trainings.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span>ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('status')"><span>Status</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'status'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('name')"><span>Name</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'name'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('commissionAmount')"><span>Commission Amount</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'commissionAmount'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('avgRating')"><span>Avg Rating</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'avgRating'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('startDate')"><span>Start Date</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'startDate'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('endDate')"><span>End Date</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'endDate'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('remarks')"><span>Remarks</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'remarks'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="training in trainings"
                    :key="training.id">
                    <td>
                        <router-link :to="{name: 'TrainingView', params: {trainingId: training.id}}">{{training.id}}</router-link>
                    </td>
                    <td>{{training.status}}</td>
                    <td>{{training.name}}</td>
                    <td>{{training.commissionAmount}}</td>
                    <td>{{training.avgRating}}</td>
                    <td>{{training.startDate | formatDate}}</td>
                    <td>{{training.endDate | formatDate}}</td>
                    <td>{{training.remarks}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'TrainingView', params: {trainingId: training.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'TrainingEdit', params: {trainingId: training.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(training)"
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
            <span slot="modal-title"><span id="vueGatewayv4App.training.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-training-heading">Are you sure you want to delete this Training?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-training" v-on:click="removeTraining()">Delete</button>
            </div>
        </b-modal>
        <div v-show="trainings && trainings.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./training.component.ts">
</script>
