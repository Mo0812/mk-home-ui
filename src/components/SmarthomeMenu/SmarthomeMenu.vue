<template>
    <div class="smarthome-menu">
        <b-nav vertical pills>
            <b-nav-item
                icon="view-grid"
                id="grid-view"
                :active="currentRoute == '/smarthome/grid'"
                to="/smarthome/grid"
            >
                Grid view
            </b-nav-item>
            <b-nav-item
                icon="lightbulb"
                id="lightbulb-list"
                :active="currentRoute == '/smarthome/devices'"
                to="/smarthome/devices"
            >
                Lightbulbs
            </b-nav-item>
            <b-nav-item
                icon="lightbulb-group"
                id="group-list"
                :active="currentRoute == '/smarthome/groups'"
                to="/smarthome/groups"
            >
                Groups
            </b-nav-item>
        </b-nav>
    </div>
</template>

<script>
export default {
    name: "SmarthomeMenu",
    data() {
        return {};
    },
    computed: {
        currentRoute() {
            return this.$route.path;
        }
    }
};
</script>
