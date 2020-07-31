<template>
    <div>
        <b-navbar toggleable="lg" type="light" variant="light" fixed>
            <b-navbar-brand href="#">NavBar</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item
                        :active="currentRoute === '/dashboard'"
                        to="/dashboard"
                        >Dashboard</b-nav-item
                    >
                    <b-nav-item
                        :active="currentRoute === '/smarthome'"
                        to="/smarthome"
                        >Smarthome</b-nav-item
                    >
                    <b-nav-item
                        :active="currentRoute === '/monitoring'"
                        to="/monitoring"
                        >System</b-nav-item
                    >
                    <b-nav-item
                        :active="currentRoute === '/settings'"
                        to="/settings"
                        >Settings</b-nav-item
                    >
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-button
                            size="md"
                            class="my-2 my-sm-0"
                            @click="toggleRefreshEvent"
                            ><b-icon icon="arrow-repeat"></b-icon
                        ></b-button>
                    </b-nav-form>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import View from "@/mixins/View";
export default {
    name: "Navbar",
    mixins: [View],
    computed: {
        currentRoute() {
            return this.$route.path;
        }
    },
    methods: {
        toggleRefreshEvent() {
            this.eventBus.$emit("refresh");
        }
    }
};
</script>
