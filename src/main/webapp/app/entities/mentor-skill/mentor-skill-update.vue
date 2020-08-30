<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="vueGatewayv4App.mentorSkill.home.createOrEditLabel">Create or edit a MentorSkill</h2>
                <div>
                    <div class="form-group" v-if="mentorSkill.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="mentorSkill.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="mentor-skill-selfRate">Self Rate</label>
                        <input type="text" class="form-control" name="selfRate" id="mentor-skill-selfRate"
                            :class="{'valid': !$v.mentorSkill.selfRate.$invalid, 'invalid': $v.mentorSkill.selfRate.$invalid }" v-model="$v.mentorSkill.selfRate.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="mentor-skill-experience">Experience</label>
                        <input type="number" class="form-control" name="experience" id="mentor-skill-experience"
                            :class="{'valid': !$v.mentorSkill.experience.$invalid, 'invalid': $v.mentorSkill.experience.$invalid }" v-model.number="$v.mentorSkill.experience.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="mentor-skill-technology">Technology</label>
                        <select class="form-control" id="mentor-skill-technology" name="technology" v-model="mentorSkill.technology">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="mentorSkill.technology && technologyOption.id === mentorSkill.technology.id ? mentorSkill.technology : technologyOption" v-for="technologyOption in technologies" :key="technologyOption.id">{{technologyOption.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="mentor-skill-mentor">Mentor</label>
                        <select class="form-control" id="mentor-skill-mentor" name="mentor" v-model="mentorSkill.mentor">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="mentorSkill.mentor && mentorOption.id === mentorSkill.mentor.id ? mentorSkill.mentor : mentorOption" v-for="mentorOption in mentors" :key="mentorOption.id">{{mentorOption.firstName}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.mentorSkill.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./mentor-skill-update.component.ts">
</script>
