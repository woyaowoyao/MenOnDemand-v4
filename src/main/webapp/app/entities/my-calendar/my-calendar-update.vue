<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="vueGatewayv4App.myCalendar.home.createOrEditLabel">Create or edit a MyCalendar</h2>
                <div>
                    <div class="form-group" v-if="myCalendar.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="myCalendar.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="my-calendar-calDate">Cal Date</label>
                        <div class="d-flex">
                            <input id="my-calendar-calDate" type="datetime-local" class="form-control" name="calDate" :class="{'valid': !$v.myCalendar.calDate.$invalid, 'invalid': $v.myCalendar.calDate.$invalid }"
                            
                            :value="convertDateTimeFromServer($v.myCalendar.calDate.$model)"
                            @change="updateInstantField('calDate', $event)"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="my-calendar-duration">Duration</label>
                        <select class="form-control" name="duration" :class="{'valid': !$v.myCalendar.duration.$invalid, 'invalid': $v.myCalendar.duration.$invalid }" v-model="$v.myCalendar.duration.$model" id="my-calendar-duration" >
                            <option value="Morning0800" >Morning0800</option>
                            <option value="Morning1000" >Morning1000</option>
                            <option value="Afternoon1400" >Afternoon1400</option>
                            <option value="Afternoon1600" >Afternoon1600</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="my-calendar-remarks">Remarks</label>
                        <input type="text" class="form-control" name="remarks" id="my-calendar-remarks"
                            :class="{'valid': !$v.myCalendar.remarks.$invalid, 'invalid': $v.myCalendar.remarks.$invalid }" v-model="$v.myCalendar.remarks.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="my-calendar-training">Training</label>
                        <select class="form-control" id="my-calendar-training" name="training" v-model="myCalendar.training">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="myCalendar.training && trainingOption.id === myCalendar.training.id ? myCalendar.training : trainingOption" v-for="trainingOption in trainings" :key="trainingOption.id">{{trainingOption.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="my-calendar-user">User</label>
                        <select class="form-control" id="my-calendar-user" name="user" v-model="myCalendar.user">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="myCalendar.user && userOption.id === myCalendar.user.id ? myCalendar.user : userOption" v-for="userOption in users" :key="userOption.id">{{userOption.firstName}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.myCalendar.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./my-calendar-update.component.ts">
</script>
