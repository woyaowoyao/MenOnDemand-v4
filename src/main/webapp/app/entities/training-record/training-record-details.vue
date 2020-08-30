<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="trainingRecord">
                <h2 class="jh-entity-heading"><span>TrainingRecord</span> {{trainingRecord.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Status</span>
                    </dt>
                    <dd>
                        <span>{{trainingRecord.status}}</span>
                    </dd>
                    <dt>
                        <span>Progress</span>
                    </dt>
                    <dd>
                        <span>{{trainingRecord.progress}}</span>
                    </dd>
                    <dt>
                        <span>Commission Amount</span>
                    </dt>
                    <dd>
                        <span>{{trainingRecord.commissionAmount}}</span>
                    </dd>
                    <dt>
                        <span>Avg Rating</span>
                    </dt>
                    <dd>
                        <span>{{trainingRecord.avgRating}}</span>
                    </dd>
                    <dt>
                        <span>Amount Received</span>
                    </dt>
                    <dd>
                        <span>{{trainingRecord.amountReceived}}</span>
                    </dd>
                    <dt>
                        <span>User Name</span>
                    </dt>
                    <dd>
                        <span>{{trainingRecord.userName}}</span>
                    </dd>
                    <dt>
                        <span>Fees</span>
                    </dt>
                    <dd>
                        <span>{{trainingRecord.fees}}</span>
                    </dd>
                    <dt>
                        <span>Remarks</span>
                    </dt>
                    <dd>
                        <span>{{trainingRecord.remarks}}</span>
                    </dd>
                    <dt>
                        <span>User</span>
                    </dt>
                    <dd>
                        {{trainingRecord.user ? trainingRecord.user.firstName : ''}}
                    </dd>
                    <dt>
                        <span>Training</span>
                    </dt>
                    <dd>
                        <div v-if="trainingRecord.training">
                            <router-link :to="{name: 'TrainingView', params: {trainingId: trainingRecord.training.id}}">{{trainingRecord.training.name}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span>Skill</span>
                    </dt>
                    <dd>
                        <div v-if="trainingRecord.skill">
                            <router-link :to="{name: 'TechnologyView', params: {technologyId: trainingRecord.skill.id}}">{{trainingRecord.skill.name}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="trainingRecord.id" :to="{name: 'TrainingRecordEdit', params: {trainingRecordId: trainingRecord.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./training-record-details.component.ts">
</script>
