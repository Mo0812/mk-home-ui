<template>
    <div class="monitoring-menu">
        <b-menu class="is-custom-mobile">
            <b-menu-list label="View mode">
                <b-menu-item icon="settings" label="Grid view"> </b-menu-item>
                <b-menu-item
                    icon="information-outline"
                    label="List view"
                    expanded
                >
                    <b-menu-item label="Lightbulbs" active> </b-menu-item>
                    <b-menu-item label="Groups"> </b-menu-item>
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
