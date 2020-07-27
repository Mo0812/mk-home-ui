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
                    <b-menu-item
                        label="Lightbulbs"
                        id="lightbulb-list"
                        :active="active === 'lightbulb-list'"
                        @click="setActiveMenuItem('lightbulb-list')"
                    >
                    </b-menu-item>
                    <b-menu-item
                        label="Groups"
                        id="group-list"
                        :active="active === 'group-list'"
                        @click="setActiveMenuItem('group-list')"
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
        return {
            active: "lightbulb-list"
        };
    },
    watch: {
        active: {
            handler(value) {
                this.$emit("change", value);
            }
        }
    },
    methods: {
        setActiveMenuItem(id) {
            this.active = id;
        }
    }
};
</script>
