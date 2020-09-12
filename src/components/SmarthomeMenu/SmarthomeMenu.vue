<template>
    <div class="smarthome-menu">
        <article class="views">
            <h5 class="small">Views</h5>
            <b-nav vertical pills>
                <b-nav-item
                    icon="view-grid"
                    :active="currentRoute == '/smarthome/views/grid'"
                    to="/smarthome/views/grid"
                >
                    Grid view
                </b-nav-item>
                <b-nav-item
                    icon="lightbulb"
                    :active="currentRoute == '/smarthome/views/devices'"
                    to="/smarthome/views/devices"
                >
                    Lightbulbs
                </b-nav-item>
                <b-nav-item
                    icon="lightbulb-group"
                    :active="currentRoute == '/smarthome/views/groups'"
                    to="/smarthome/views/groups"
                >
                    Groups
                </b-nav-item>
            </b-nav>
        </article>
        <article class="automation">
            <h5 class="small">Automation</h5>
            <b-nav vertical pills>
                <b-nav-item
                    icon="view-grid"
                    :active="currentRoute == '/smarthome/automation/time'"
                    to="/smarthome/automation/time"
                >
                    Time based
                </b-nav-item>
                <b-nav-item
                    icon="lightbulb"
                    :active="currentRoute == '/smarthome/automation/ambient'"
                    to="/smarthome/automation/ambient"
                >
                    Ambient based
                </b-nav-item>
            </b-nav>
        </article>
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
