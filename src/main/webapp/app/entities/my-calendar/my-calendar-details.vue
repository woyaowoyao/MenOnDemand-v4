<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="myCalendar">
                <h2 class="jh-entity-heading"><span>MyCalendar</span> {{myCalendar.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Cal Date</span>
                    </dt>
                    <dd>
                        <span>{{myCalendar.calDate | formatDate}}</span>
                    </dd>
                    <dt>
                        <span>Duration</span>
                    </dt>
                    <dd>
                        <span>{{myCalendar.duration}}</span>
                    </dd>
                    <dt>
                        <span>Remarks</span>
                    </dt>
                    <dd>
                        <span>{{myCalendar.remarks}}</span>
                    </dd>
                    <dt>
                        <span>Training</span>
                    </dt>
                    <dd>
                        <div v-if="myCalendar.training">
                            <router-link :to="{name: 'TrainingView', params: {trainingId: myCalendar.training.id}}">{{myCalendar.training.name}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span>User</span>
                    </dt>
                    <dd>
                        {{myCalendar.user ? myCalendar.user.firstName : ''}}
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="myCalendar.id" :to="{name: 'MyCalendarEdit', params: {myCalendarId: myCalendar.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./my-calendar-details.component.ts">
</script>
