<template>
    <div class="system-menu">
        <b-nav vertical pills>
            <b-nav-item
                icon="information-outline"
                :active="currentRoute == '/system/overview'"
                to="/system/overview"
                >Overview</b-nav-item
            >
            <b-nav-item
                icon="speedometer"
                :active="currentRoute == '/system/metrics'"
                to="/system/metrics"
                >Metrics</b-nav-item
            >
            <b-nav-item
                icon="speedometer"
                :active="currentRoute == '/system/controls'"
                to="/system/controls"
                >Controls</b-nav-item
            >
            <b-nav-item
                icon="speedometer"
                :active="currentRoute == '/system/log'"
                to="/system/log"
                >Logs</b-nav-item
            >
        </b-nav>
    </div>
</template>

<script>
export default {
    name: "SystemMenu",
    computed: {
        currentRoute() {
            return this.$route.path;
        }
    }
};
</script>
