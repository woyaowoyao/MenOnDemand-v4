<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="vueGatewayv4App.mentor.home.createOrEditLabel">Create or edit a Mentor</h2>
                <div>
                    <div class="form-group" v-if="mentor.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="mentor.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="mentor-username">Username</label>
                        <input type="text" class="form-control" name="username" id="mentor-username"
                            :class="{'valid': !$v.mentor.username.$invalid, 'invalid': $v.mentor.username.$invalid }" v-model="$v.mentor.username.$model"  required/>
                        <div v-if="$v.mentor.username.$anyDirty && $v.mentor.username.$invalid">
                            <small class="form-text text-danger" v-if="!$v.mentor.username.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="mentor-linkedin">Linkedin</label>
                        <input type="text" class="form-control" name="linkedin" id="mentor-linkedin"
                            :class="{'valid': !$v.mentor.linkedin.$invalid, 'invalid': $v.mentor.linkedin.$invalid }" v-model="$v.mentor.linkedin.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="mentor-regDatetime">Reg Datetime</label>
                        <div class="d-flex">
                            <input id="mentor-regDatetime" type="datetime-local" class="form-control" name="regDatetime" :class="{'valid': !$v.mentor.regDatetime.$invalid, 'invalid': $v.mentor.regDatetime.$invalid }"
                            
                            :value="convertDateTimeFromServer($v.mentor.regDatetime.$model)"
                            @change="updateInstantField('regDatetime', $event)"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="mentor-regCode">Reg Code</label>
                        <input type="text" class="form-control" name="regCode" id="mentor-regCode"
                            :class="{'valid': !$v.mentor.regCode.$invalid, 'invalid': $v.mentor.regCode.$invalid }" v-model="$v.mentor.regCode.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="mentor-experience">Experience</label>
                        <input type="number" class="form-control" name="experience" id="mentor-experience"
                            :class="{'valid': !$v.mentor.experience.$invalid, 'invalid': $v.mentor.experience.$invalid }" v-model.number="$v.mentor.experience.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="mentor-status">Status</label>
                        <select class="form-control" name="status" :class="{'valid': !$v.mentor.status.$invalid, 'invalid': $v.mentor.status.$invalid }" v-model="$v.mentor.status.$model" id="mentor-status"  required>
                            <option value="Active" >Active</option>
                            <option value="Inactive" >Inactive</option>
                        </select>
                        <div v-if="$v.mentor.status.$anyDirty && $v.mentor.status.$invalid">
                            <small class="form-text text-danger" v-if="!$v.mentor.status.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="mentor-user">User</label>
                        <select class="form-control" id="mentor-user" name="user" v-model="mentor.user">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="mentor.user && userOption.id === mentor.user.id ? mentor.user : userOption" v-for="userOption in users" :key="userOption.id">{{userOption.firstName}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.mentor.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./mentor-update.component.ts">
</script>
