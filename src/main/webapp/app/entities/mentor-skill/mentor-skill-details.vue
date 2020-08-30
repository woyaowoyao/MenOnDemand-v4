<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="mentorSkill">
                <h2 class="jh-entity-heading"><span>MentorSkill</span> {{mentorSkill.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Self Rate</span>
                    </dt>
                    <dd>
                        <span>{{mentorSkill.selfRate}}</span>
                    </dd>
                    <dt>
                        <span>Experience</span>
                    </dt>
                    <dd>
                        <span>{{mentorSkill.experience}}</span>
                    </dd>
                    <dt>
                        <span>Technology</span>
                    </dt>
                    <dd>
                        <div v-if="mentorSkill.technology">
                            <router-link :to="{name: 'TechnologyView', params: {technologyId: mentorSkill.technology.id}}">{{mentorSkill.technology.name}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span>Mentor</span>
                    </dt>
                    <dd>
                        <div v-if="mentorSkill.mentor">
                            <router-link :to="{name: 'MentorView', params: {mentorId: mentorSkill.mentor.id}}">{{mentorSkill.mentor.firstName}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="mentorSkill.id" :to="{name: 'MentorSkillEdit', params: {mentorSkillId: mentorSkill.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./mentor-skill-details.component.ts">
</script>
