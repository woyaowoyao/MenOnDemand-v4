<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="vueGatewayv4App.training.home.createOrEditLabel">Create or edit a Training</h2>
                <div>
                    <div class="form-group" v-if="training.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="training.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="training-status">Status</label>
                        <select class="form-control" name="status" :class="{'valid': !$v.training.status.$invalid, 'invalid': $v.training.status.$invalid }" v-model="$v.training.status.$model" id="training-status"  required>
                            <option value="Active" >Active</option>
                            <option value="Inactive" >Inactive</option>
                        </select>
                        <div v-if="$v.training.status.$anyDirty && $v.training.status.$invalid">
                            <small class="form-text text-danger" v-if="!$v.training.status.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="training-name">Name</label>
                        <input type="text" class="form-control" name="name" id="training-name"
                            :class="{'valid': !$v.training.name.$invalid, 'invalid': $v.training.name.$invalid }" v-model="$v.training.name.$model"  required/>
                        <div v-if="$v.training.name.$anyDirty && $v.training.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.training.name.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="training-commissionAmount">Commission Amount</label>
                        <input type="number" class="form-control" name="commissionAmount" id="training-commissionAmount"
                            :class="{'valid': !$v.training.commissionAmount.$invalid, 'invalid': $v.training.commissionAmount.$invalid }" v-model.number="$v.training.commissionAmount.$model"  required/>
                        <div v-if="$v.training.commissionAmount.$anyDirty && $v.training.commissionAmount.$invalid">
                            <small class="form-text text-danger" v-if="!$v.training.commissionAmount.required">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.training.commissionAmount.numeric">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="training-avgRating">Avg Rating</label>
                        <input type="number" class="form-control" name="avgRating" id="training-avgRating"
                            :class="{'valid': !$v.training.avgRating.$invalid, 'invalid': $v.training.avgRating.$invalid }" v-model.number="$v.training.avgRating.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="training-startDate">Start Date</label>
                        <div class="d-flex">
                            <input id="training-startDate" type="datetime-local" class="form-control" name="startDate" :class="{'valid': !$v.training.startDate.$invalid, 'invalid': $v.training.startDate.$invalid }"
                            
                            :value="convertDateTimeFromServer($v.training.startDate.$model)"
                            @change="updateInstantField('startDate', $event)"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="training-endDate">End Date</label>
                        <div class="d-flex">
                            <input id="training-endDate" type="datetime-local" class="form-control" name="endDate" :class="{'valid': !$v.training.endDate.$invalid, 'invalid': $v.training.endDate.$invalid }"
                            
                            :value="convertDateTimeFromServer($v.training.endDate.$model)"
                            @change="updateInstantField('endDate', $event)"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="training-remarks">Remarks</label>
                        <input type="text" class="form-control" name="remarks" id="training-remarks"
                            :class="{'valid': !$v.training.remarks.$invalid, 'invalid': $v.training.remarks.$invalid }" v-model="$v.training.remarks.$model" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.training.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./training-update.component.ts">
</script>
