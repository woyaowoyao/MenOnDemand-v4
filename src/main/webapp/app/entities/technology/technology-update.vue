<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="vueGatewayv4App.technology.home.createOrEditLabel">Create or edit a Technology</h2>
                <div>
                    <div class="form-group" v-if="technology.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="technology.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="technology-name">Name</label>
                        <input type="text" class="form-control" name="name" id="technology-name"
                            :class="{'valid': !$v.technology.name.$invalid, 'invalid': $v.technology.name.$invalid }" v-model="$v.technology.name.$model"  required/>
                        <div v-if="$v.technology.name.$anyDirty && $v.technology.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.technology.name.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="technology-toc">Toc</label>
                        <input type="text" class="form-control" name="toc" id="technology-toc"
                            :class="{'valid': !$v.technology.toc.$invalid, 'invalid': $v.technology.toc.$invalid }" v-model="$v.technology.toc.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="technology-preprequisites">Preprequisites</label>
                        <input type="text" class="form-control" name="preprequisites" id="technology-preprequisites"
                            :class="{'valid': !$v.technology.preprequisites.$invalid, 'invalid': $v.technology.preprequisites.$invalid }" v-model="$v.technology.preprequisites.$model" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.technology.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./technology-update.component.ts">
</script>
