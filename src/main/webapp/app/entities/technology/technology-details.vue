<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="technology">
                <h2 class="jh-entity-heading"><span>Technology</span> {{technology.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Name</span>
                    </dt>
                    <dd>
                        <span>{{technology.name}}</span>
                    </dd>
                    <dt>
                        <span>Toc</span>
                    </dt>
                    <dd>
                        <span>{{technology.toc}}</span>
                    </dd>
                    <dt>
                        <span>Preprequisites</span>
                    </dt>
                    <dd>
                        <span>{{technology.preprequisites}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="technology.id" :to="{name: 'TechnologyEdit', params: {technologyId: technology.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./technology-details.component.ts">
</script>
