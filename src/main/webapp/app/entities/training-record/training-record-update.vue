<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="vueGatewayv4App.trainingRecord.home.createOrEditLabel">Create or edit a TrainingRecord</h2>
                <div>
                    <div class="form-group" v-if="trainingRecord.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="trainingRecord.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="training-record-status">Status</label>
                        <select class="form-control" name="status" :class="{'valid': !$v.trainingRecord.status.$invalid, 'invalid': $v.trainingRecord.status.$invalid }" v-model="$v.trainingRecord.status.$model" id="training-record-status"  required>
                            <option value="Propose" >Propose</option>
                            <option value="Progress" >Progress</option>
                            <option value="Completed" >Completed</option>
                        </select>
                        <div v-if="$v.trainingRecord.status.$anyDirty && $v.trainingRecord.status.$invalid">
                            <small class="form-text text-danger" v-if="!$v.trainingRecord.status.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="training-record-progress">Progress</label>
                        <select class="form-control" name="progress" :class="{'valid': !$v.trainingRecord.progress.$invalid, 'invalid': $v.trainingRecord.progress.$invalid }" v-model="$v.trainingRecord.progress.$model" id="training-record-progress"  required>
                            <option value="One" >One</option>
                            <option value="Two" >Two</option>
                            <option value="Three" >Three</option>
                            <option value="Four" >Four</option>
                        </select>
                        <div v-if="$v.trainingRecord.progress.$anyDirty && $v.trainingRecord.progress.$invalid">
                            <small class="form-text text-danger" v-if="!$v.trainingRecord.progress.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="training-record-commissionAmount">Commission Amount</label>
                        <input type="number" class="form-control" name="commissionAmount" id="training-record-commissionAmount"
                            :class="{'valid': !$v.trainingRecord.commissionAmount.$invalid, 'invalid': $v.trainingRecord.commissionAmount.$invalid }" v-model.number="$v.trainingRecord.commissionAmount.$model"  required/>
                        <div v-if="$v.trainingRecord.commissionAmount.$anyDirty && $v.trainingRecord.commissionAmount.$invalid">
                            <small class="form-text text-danger" v-if="!$v.trainingRecord.commissionAmount.required">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.trainingRecord.commissionAmount.numeric">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="training-record-avgRating">Avg Rating</label>
                        <input type="number" class="form-control" name="avgRating" id="training-record-avgRating"
                            :class="{'valid': !$v.trainingRecord.avgRating.$invalid, 'invalid': $v.trainingRecord.avgRating.$invalid }" v-model.number="$v.trainingRecord.avgRating.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="training-record-amountReceived">Amount Received</label>
                        <input type="number" class="form-control" name="amountReceived" id="training-record-amountReceived"
                            :class="{'valid': !$v.trainingRecord.amountReceived.$invalid, 'invalid': $v.trainingRecord.amountReceived.$invalid }" v-model.number="$v.trainingRecord.amountReceived.$model"  required/>
                        <div v-if="$v.trainingRecord.amountReceived.$anyDirty && $v.trainingRecord.amountReceived.$invalid">
                            <small class="form-text text-danger" v-if="!$v.trainingRecord.amountReceived.required">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.trainingRecord.amountReceived.numeric">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="training-record-userName">User Name</label>
                        <input type="text" class="form-control" name="userName" id="training-record-userName"
                            :class="{'valid': !$v.trainingRecord.userName.$invalid, 'invalid': $v.trainingRecord.userName.$invalid }" v-model="$v.trainingRecord.userName.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="training-record-fees">Fees</label>
                        <input type="number" class="form-control" name="fees" id="training-record-fees"
                            :class="{'valid': !$v.trainingRecord.fees.$invalid, 'invalid': $v.trainingRecord.fees.$invalid }" v-model.number="$v.trainingRecord.fees.$model"  required/>
                        <div v-if="$v.trainingRecord.fees.$anyDirty && $v.trainingRecord.fees.$invalid">
                            <small class="form-text text-danger" v-if="!$v.trainingRecord.fees.required">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.trainingRecord.fees.numeric">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="training-record-remarks">Remarks</label>
                        <input type="text" class="form-control" name="remarks" id="training-record-remarks"
                            :class="{'valid': !$v.trainingRecord.remarks.$invalid, 'invalid': $v.trainingRecord.remarks.$invalid }" v-model="$v.trainingRecord.remarks.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="training-record-user">User</label>
                        <select class="form-control" id="training-record-user" name="user" v-model="trainingRecord.user">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="trainingRecord.user && userOption.id === trainingRecord.user.id ? trainingRecord.user : userOption" v-for="userOption in users" :key="userOption.id">{{userOption.firstName}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="training-record-training">Training</label>
                        <select class="form-control" id="training-record-training" name="training" v-model="trainingRecord.training">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="trainingRecord.training && trainingOption.id === trainingRecord.training.id ? trainingRecord.training : trainingOption" v-for="trainingOption in trainings" :key="trainingOption.id">{{trainingOption.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="training-record-skill">Skill</label>
                        <select class="form-control" id="training-record-skill" name="skill" v-model="trainingRecord.skill">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="trainingRecord.skill && technologyOption.id === trainingRecord.skill.id ? trainingRecord.skill : technologyOption" v-for="technologyOption in technologies" :key="technologyOption.id">{{technologyOption.name}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.trainingRecord.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./training-record-update.component.ts">
</script>
