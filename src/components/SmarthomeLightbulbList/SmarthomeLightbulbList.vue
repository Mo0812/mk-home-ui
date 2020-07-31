<template>
    <div class="smarthome-lightbulb-list">
        <div class="filter">
            <div class="columns">
                <div class="column is-three-is-one-fifth">
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
                </div>
                <div class="column is-three-is-one-fifth">
                    <b-select
                        placeholder="On/Off"
                        icon="lightbulb-on-outline"
                        v-model="filter.onOff"
                    >
                        <option :value="null">Both</option>
                        <option :value="true">On</option>
                        <option :value="false">Off</option>
                    </b-select>
                </div>
                <div class="column is-three-fifths">
                    <b-input
                        placeholder="Search..."
                        type="search"
                        icon="magnify"
                        v-model="filter.term"
                    ></b-input>
                </div>
            </div>
        </div>
        <b-table
            :data="lightbulbs"
            :striped="true"
            :hoverable="true"
            :loading="busy"
        >
            <template v-slot:empty>
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon icon="emoticon-sad" size="is-large">
                            </b-icon>
                        </p>
                        <p>Nothing here.</p>
                    </div>
                </section>
            </template>
            <template slot-scope="props">
                <b-table-column field="id" label="ID" sortable>
                    {{ props.row.id }}
                </b-table-column>
                <b-table-column field="name" label="Name" sortable>
                    {{ props.row.name }}
                </b-table-column>
                <b-table-column field="group" label="Gruppe" sortable>
                    <a href="#" @click="addGroupFilter(props.row.group.id)">{{
                        props.row.group.name
                    }}</a>
                </b-table-column>
                <b-table-column field="isAlive" label="verbunden" centered>
                    <template v-if="props.row.isAlive">
                        <b-icon icon="lan-connect" />
                    </template>
                    <template v-else>
                        <b-icon icon="lan-disconnect" type="is-danger" />
                    </template>
                </b-table-column>
                <b-table-column
                    field="isOn"
                    label="eingeschaltet"
                    centered
                    sortable
                >
                    <b-button
                        :disabled="props.row.busy"
                        @click="toggleLightbulb(props.row.id)"
                    >
                        <b-icon
                            icon="power"
                            :type="props.row.isOn ? 'is-success' : 'is-danger'"
                        />
                    </b-button>
                </b-table-column>
                <b-table-column field="brightness" label="Helligkeit" centered>
                    <template v-if="props.row.isDimmable">
                        <b-slider
                            :style="{ margin: '0.5rem 0' }"
                            :value="props.row.brightness.current"
                            :min="0"
                            :max="100"
                            :disabled="props.row.busy"
                            type="is-warning"
                            @change="changeBrightness($event, props.row.id)"
                            lazy
                        /><span class="tag"
                            >{{ props.row.brightness.current }}%</span
                        ></template
                    >
                    <template v-else>
                        <span class="tag">Gerät nicht dimmbar</span>
                    </template>
                </b-table-column>
                <b-table-column
                    field="color"
                    label="Lichtfarbe"
                    centered
                    sortable
                >
                    <ColorMeter :color="props.row.color" />
                </b-table-column>
                <b-table-column field="spectrum" label="Farbspektrum" centered>
                    {{ props.row.spectrum }}
                </b-table-column>
            </template>
        </b-table>
    </div>
</template>

<script>
import View from "@/mixins/View";
import ColorMeter from "@/components/ColorMeter/ColorMeter";

export default {
    name: "SmarthomeLightbulbList",
    mixins: [View],
    components: {
        ColorMeter
    },
    data() {
        return {
            busy: false,
            filter: {
                group: null,
                onOff: null,
                term: null
            }
        };
    },
    computed: {
        lightbulbs() {
            return this.filterData(this.$store.getters.getLightbulbs);
        },
        groups() {
            return this.$store.getters.getGroups;
        }
    },
    created() {
        this.fetchData();
    },
    mounted() {
        this.eventBus.$on("refresh", this.fetchData);
    },
    beforeDestroy() {
        this.eventBus.$off("refresh", this.fetchData);
    },
    methods: {
        async fetchData() {
            this.busy = true;
            await this.$store.dispatch("fetchSmarthomeData");
            this.busy = false;
        },
        toggleLightbulb(id) {
            this.$store.dispatch("toggleLightbulb", id);
        },
        changeBrightness(brightness, id) {
            this.$store.dispatch("changeBrightness", {
                id: id,
                brightness: brightness
            });
        },
        filterData(data) {
            if (this.filter.group) {
                data = data.filter(item => item.group.id === this.filter.group);
            }
            if (this.filter.onOff) {
                data = data.filter(item => item.isOn === this.filter.onOff);
            }
            if (this.filter.term && this.filter.term !== "") {
                data = data.filter(
                    item =>
                        item.name
                            .toLowerCase()
                            .includes(this.filter.term.toLowerCase()) ||
                        item.group.name
                            .toLowerCase()
                            .includes(this.filter.term.toLowerCase())
                );
            }
            return data;
        },
        addGroupFilter(groupId) {
            this.filter.group = groupId;
        }
    }
};
</script>
