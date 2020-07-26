<template>
    <ViewContainer>
        <template v-slot:sidebar>
            <SmarthomeMenu />
        </template>
        <section class="smarthome">
            <link
                rel="stylesheet"
                href="https://cdn.materialdesignicons.com/5.3.45/css/materialdesignicons.min.css"
            />
            <b-table :data="lightbulbs" :striped="true">
                <template slot-scope="props">
                    <b-table-column field="id" label="ID" sortable>
                        {{ props.row.id }}
                    </b-table-column>
                    <b-table-column field="name" label="Name" sortable>
                        {{ props.row.name }}
                    </b-table-column>
                    <b-table-column field="group" label="Gruppe" sortable>
                        {{ props.row.group.name }}
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
                                :type="
                                    props.row.isOn ? 'is-success' : 'is-danger'
                                "
                            />
                        </b-button>
                    </b-table-column>
                    <b-table-column
                        field="brightness"
                        label="Helligkeit"
                        centered
                    >
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
                    <b-table-column
                        field="spectrum"
                        label="Farbspektrum"
                        centered
                    >
                        {{ props.row.spectrum }}
                    </b-table-column>
                </template>
            </b-table>
        </section>
    </ViewContainer>
</template>

<script>
import axios from "axios";
import View from "@/mixins/View";
import SmarthomeMenu from "@/components/SmarthomeMenu/SmarthomeMenu";
import ColorMeter from "@/components/ColorMeter/ColorMeter";

export default {
    name: "smarthome",
    mixins: [View],
    components: {
        SmarthomeMenu,
        ColorMeter
    },
    data() {
        return {
            busy: false
        };
    },
    computed: {
        lightbulbs() {
            return this.$store.getters.getLightbulbs;
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
        }
    }
};
</script>
