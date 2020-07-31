<template>
    <b-navbar
        :fixed-top="true"
        :shadow="true"
        wrapper-class="container is-fluid"
    >
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                />
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item tag="router-link" to="/">
                Dashboard
            </b-navbar-item>
            <b-navbar-item tag="router-link" to="/smarthome">
                Smarthome
            </b-navbar-item>
            <b-navbar-item tag="router-link" to="/monitoring">
                System
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-primary" @click="toggleRefreshEvent">
                        <b-icon icon="sync" />
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
import View from "@/mixins/View";
export default {
    name: "Navbar",
    mixins: [View],
    methods: {
        toggleRefreshEvent() {
            this.eventBus.$emit("refresh");
        }
    }
};
</script>
