<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="mentor">
                <h2 class="jh-entity-heading"><span>Mentor</span> {{mentor.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Username</span>
                    </dt>
                    <dd>
                        <span>{{mentor.username}}</span>
                    </dd>
                    <dt>
                        <span>Linkedin</span>
                    </dt>
                    <dd>
                        <span>{{mentor.linkedin}}</span>
                    </dd>
                    <dt>
                        <span>Reg Datetime</span>
                    </dt>
                    <dd>
                        <span>{{mentor.regDatetime | formatDate}}</span>
                    </dd>
                    <dt>
                        <span>Reg Code</span>
                    </dt>
                    <dd>
                        <span>{{mentor.regCode}}</span>
                    </dd>
                    <dt>
                        <span>Experience</span>
                    </dt>
                    <dd>
                        <span>{{mentor.experience}}</span>
                    </dd>
                    <dt>
                        <span>Status</span>
                    </dt>
                    <dd>
                        <span>{{mentor.status}}</span>
                    </dd>
                    <dt>
                        <span>User</span>
                    </dt>
                    <dd>
                        {{mentor.user ? mentor.user.firstName : ''}}
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="mentor.id" :to="{name: 'MentorEdit', params: {mentorId: mentor.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./mentor-details.component.ts">
</script>
