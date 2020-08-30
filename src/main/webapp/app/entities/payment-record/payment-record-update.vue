<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="vueGatewayv4App.paymentRecord.home.createOrEditLabel">Create or edit a PaymentRecord</h2>
                <div>
                    <div class="form-group" v-if="paymentRecord.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="paymentRecord.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="payment-record-txnType">Txn Type</label>
                        <select class="form-control" name="txnType" :class="{'valid': !$v.paymentRecord.txnType.$invalid, 'invalid': $v.paymentRecord.txnType.$invalid }" v-model="$v.paymentRecord.txnType.$model" id="payment-record-txnType"  required>
                            <option value="PAID" >PAID</option>
                            <option value="ISSUED" >ISSUED</option>
                            <option value="CANCELLED" >CANCELLED</option>
                        </select>
                        <div v-if="$v.paymentRecord.txnType.$anyDirty && $v.paymentRecord.txnType.$invalid">
                            <small class="form-text text-danger" v-if="!$v.paymentRecord.txnType.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="payment-record-amount">Amount</label>
                        <input type="number" class="form-control" name="amount" id="payment-record-amount"
                            :class="{'valid': !$v.paymentRecord.amount.$invalid, 'invalid': $v.paymentRecord.amount.$invalid }" v-model.number="$v.paymentRecord.amount.$model"  required/>
                        <div v-if="$v.paymentRecord.amount.$anyDirty && $v.paymentRecord.amount.$invalid">
                            <small class="form-text text-danger" v-if="!$v.paymentRecord.amount.required">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.paymentRecord.amount.numeric">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="payment-record-totalAmountToMentor">Total Amount To Mentor</label>
                        <input type="number" class="form-control" name="totalAmountToMentor" id="payment-record-totalAmountToMentor"
                            :class="{'valid': !$v.paymentRecord.totalAmountToMentor.$invalid, 'invalid': $v.paymentRecord.totalAmountToMentor.$invalid }" v-model.number="$v.paymentRecord.totalAmountToMentor.$model"  required/>
                        <div v-if="$v.paymentRecord.totalAmountToMentor.$anyDirty && $v.paymentRecord.totalAmountToMentor.$invalid">
                            <small class="form-text text-danger" v-if="!$v.paymentRecord.totalAmountToMentor.required">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.paymentRecord.totalAmountToMentor.numeric">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="payment-record-issuedTime">Issued Time</label>
                        <div class="d-flex">
                            <input id="payment-record-issuedTime" type="datetime-local" class="form-control" name="issuedTime" :class="{'valid': !$v.paymentRecord.issuedTime.$invalid, 'invalid': $v.paymentRecord.issuedTime.$invalid }"
                             required
                            :value="convertDateTimeFromServer($v.paymentRecord.issuedTime.$model)"
                            @change="updateInstantField('issuedTime', $event)"/>
                        </div>
                        <div v-if="$v.paymentRecord.issuedTime.$anyDirty && $v.paymentRecord.issuedTime.$invalid">
                            <small class="form-text text-danger" v-if="!$v.paymentRecord.issuedTime.required">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.paymentRecord.issuedTime.ZonedDateTimelocal">
                                This field should be a date and time.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="payment-record-remarks">Remarks</label>
                        <input type="text" class="form-control" name="remarks" id="payment-record-remarks"
                            :class="{'valid': !$v.paymentRecord.remarks.$invalid, 'invalid': $v.paymentRecord.remarks.$invalid }" v-model="$v.paymentRecord.remarks.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="payment-record-user">User</label>
                        <select class="form-control" id="payment-record-user" name="user" v-model="paymentRecord.user">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="paymentRecord.user && userOption.id === paymentRecord.user.id ? paymentRecord.user : userOption" v-for="userOption in users" :key="userOption.id">{{userOption.firstName}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.paymentRecord.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./payment-record-update.component.ts">
</script>
