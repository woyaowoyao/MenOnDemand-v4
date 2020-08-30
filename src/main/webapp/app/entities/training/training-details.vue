<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="training">
                <h2 class="jh-entity-heading"><span>Training</span> {{training.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Status</span>
                    </dt>
                    <dd>
                        <span>{{training.status}}</span>
                    </dd>
                    <dt>
                        <span>Name</span>
                    </dt>
                    <dd>
                        <span>{{training.name}}</span>
                    </dd>
                    <dt>
                        <span>Commission Amount</span>
                    </dt>
                    <dd>
                        <span>{{training.commissionAmount}}</span>
                    </dd>
                    <dt>
                        <span>Avg Rating</span>
                    </dt>
                    <dd>
                        <span>{{training.avgRating}}</span>
                    </dd>
                    <dt>
                        <span>Start Date</span>
                    </dt>
                    <dd>
                        <span>{{training.startDate | formatDate}}</span>
                    </dd>
                    <dt>
                        <span>End Date</span>
                    </dt>
                    <dd>
                        <span>{{training.endDate | formatDate}}</span>
                    </dd>
                    <dt>
                        <span>Remarks</span>
                    </dt>
                    <dd>
                        <span>{{training.remarks}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="training.id" :to="{name: 'TrainingEdit', params: {trainingId: training.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./training-details.component.ts">
</script>
