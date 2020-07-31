<template>
    <div class="monitoring-menu">
        <b-menu class="is-custom-mobile" :accordion="false">
            <b-menu-list label="View mode">
                <b-menu-item
                    icon="view-grid"
                    label="Grid view"
                    id="grid-view"
                    :active="currentRoute == '/smarthome/grid'"
                    tag="router-link"
                    to="/smarthome/grid"
                >
                </b-menu-item>
                <b-menu-item icon="table-of-contents" expanded>
                    <template v-slot:label="props">
                        List view
                        <b-icon
                            class="is-pulled-right"
                            :icon="props.expanded ? 'menu-down' : 'menu-up'"
                        ></b-icon>
                    </template>
                    <b-menu-item
                        label="Lightbulbs"
                        icon="lightbulb"
                        id="lightbulb-list"
                        :active="currentRoute == '/smarthome/devices'"
                        tag="router-link"
                        to="/smarthome/devices"
                    >
                    </b-menu-item>
                    <b-menu-item
                        label="Groups"
                        icon="lightbulb-group"
                        id="group-list"
                        :active="currentRoute == '/smarthome/groups'"
                        tag="router-link"
                        to="/smarthome/groups"
                    >
                    </b-menu-item>
                </b-menu-item>
            </b-menu-list>
        </b-menu>
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
