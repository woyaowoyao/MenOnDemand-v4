<template>
    <div>
        <h2 id="page-heading">
            <span id="payment-record-heading">Payment Records</span>
            <router-link :to="{name: 'PaymentRecordCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-payment-record">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create a new Payment Record
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
        <div class="alert alert-warning" v-if="!isFetching && paymentRecords && paymentRecords.length === 0">
            <span>No paymentRecords found</span>
        </div>
        <div class="table-responsive" v-if="paymentRecords && paymentRecords.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Txn Type</span></th>
                    <th><span>Amount</span></th>
                    <th><span>Total Amount To Mentor</span></th>
                    <th><span>Issued Time</span></th>
                    <th><span>Remarks</span></th>
                    <th><span>User</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="paymentRecord in paymentRecords"
                    :key="paymentRecord.id">
                    <td>
                        <router-link :to="{name: 'PaymentRecordView', params: {paymentRecordId: paymentRecord.id}}">{{paymentRecord.id}}</router-link>
                    </td>
                    <td>{{paymentRecord.txnType}}</td>
                    <td>{{paymentRecord.amount}}</td>
                    <td>{{paymentRecord.totalAmountToMentor}}</td>
                    <td>{{paymentRecord.issuedTime | formatDate}}</td>
                    <td>{{paymentRecord.remarks}}</td>
                    <td>
                        {{paymentRecord.user ? paymentRecord.user.firstName : ''}}
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'PaymentRecordView', params: {paymentRecordId: paymentRecord.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'PaymentRecordEdit', params: {paymentRecordId: paymentRecord.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(paymentRecord)"
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
            <span slot="modal-title"><span id="vueGatewayv4App.paymentRecord.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-paymentRecord-heading">Are you sure you want to delete this Payment Record?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-paymentRecord" v-on:click="removePaymentRecord()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./payment-record.component.ts">
</script>
