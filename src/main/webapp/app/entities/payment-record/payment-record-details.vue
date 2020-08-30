<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="paymentRecord">
                <h2 class="jh-entity-heading"><span>PaymentRecord</span> {{paymentRecord.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Txn Type</span>
                    </dt>
                    <dd>
                        <span>{{paymentRecord.txnType}}</span>
                    </dd>
                    <dt>
                        <span>Amount</span>
                    </dt>
                    <dd>
                        <span>{{paymentRecord.amount}}</span>
                    </dd>
                    <dt>
                        <span>Total Amount To Mentor</span>
                    </dt>
                    <dd>
                        <span>{{paymentRecord.totalAmountToMentor}}</span>
                    </dd>
                    <dt>
                        <span>Issued Time</span>
                    </dt>
                    <dd>
                        <span>{{paymentRecord.issuedTime | formatDate}}</span>
                    </dd>
                    <dt>
                        <span>Remarks</span>
                    </dt>
                    <dd>
                        <span>{{paymentRecord.remarks}}</span>
                    </dd>
                    <dt>
                        <span>User</span>
                    </dt>
                    <dd>
                        {{paymentRecord.user ? paymentRecord.user.firstName : ''}}
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="paymentRecord.id" :to="{name: 'PaymentRecordEdit', params: {paymentRecordId: paymentRecord.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./payment-record-details.component.ts">
</script>
