<template>
    <div class="monitoring-menu">
        <b-menu class="is-custom-mobile">
            <b-menu-list label="Monitoring">
                <b-menu-item
                    icon="information-outline"
                    label="Overview"
                ></b-menu-item>
                <b-menu-item active icon="speedometer" label="Metrics">
                </b-menu-item>
            </b-menu-list>
        </b-menu>
    </div>
</template>

<script>
export default {
    name: "MonitoringMenu"
};
</script>
