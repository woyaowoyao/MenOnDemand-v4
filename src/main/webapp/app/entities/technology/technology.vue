<template>
    <div>
        <h2 id="page-heading">
            <span id="technology-heading">Technologies</span>
            <router-link :to="{name: 'TechnologyCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-technology">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create a new Technology
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
        <div class="alert alert-warning" v-if="!isFetching && technologies && technologies.length === 0">
            <span>No technologies found</span>
        </div>
        <div class="table-responsive" v-if="technologies && technologies.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Name</span></th>
                    <th><span>Toc</span></th>
                    <th><span>Preprequisites</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="technology in technologies"
                    :key="technology.id">
                    <td>
                        <router-link :to="{name: 'TechnologyView', params: {technologyId: technology.id}}">{{technology.id}}</router-link>
                    </td>
                    <td>{{technology.name}}</td>
                    <td>{{technology.toc}}</td>
                    <td>{{technology.preprequisites}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'TechnologyView', params: {technologyId: technology.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'TechnologyEdit', params: {technologyId: technology.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(technology)"
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
            <span slot="modal-title"><span id="vueGatewayv4App.technology.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-technology-heading">Are you sure you want to delete this Technology?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-technology" v-on:click="removeTechnology()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./technology.component.ts">
</script>
