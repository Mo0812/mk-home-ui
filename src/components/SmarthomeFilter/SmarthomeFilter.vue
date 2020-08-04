<template>
    <div class="smarthome-filter">
        <b-input-group class="filter">
            <template v-slot:prepend>
                <b-select
                    placeholder="Group"
                    icon="lightbulb-group"
                    v-model="filter.group"
                >
                    <option :value="null">All</option>
                    <option
                        v-for="group in groups"
                        :key="group.id"
                        :value="group.id"
                        >{{ group.name }}</option
                    >
                </b-select>

                <b-select
                    placeholder="On/Off"
                    icon="lightbulb-on-outline"
                    v-model="filter.onOff"
                >
                    <option :value="null">Both</option>
                    <option :value="true">On</option>
                    <option :value="false">Off</option>
                </b-select>
            </template>
            <b-input
                placeholder="Search..."
                type="search"
                icon="magnify"
                v-model="filter.term"
            ></b-input>
            <template v-slot:append>
                <b-button variant="warning" @click="clearFilter"
                    >Clear filter</b-button
                >
            </template>
        </b-input-group>
    </div>
</template>

<script>
export default {
    name: "SmarthomeFilter",
    props: ["value"],
    data() {
        return {
            filter: this.value
        };
    },
    computed: {
        groups() {
            return this.$store.getters.getGroups;
        }
    },
    watch: {
        filter: {
            handler(val) {
                this.$emit("input", val);
            },
            deep: true
        }
    },
    methods: {
        clearFilter() {
            this.filter = {
                group: null,
                onOff: null,
                term: null
            };
        }
    }
};
</script>
