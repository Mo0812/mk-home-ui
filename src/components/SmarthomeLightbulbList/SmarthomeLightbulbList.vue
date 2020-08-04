<template>
    <div class="smarthome-lightbulb-list">
        <SmarthomeFilter v-model="filter" />
        <b-table
            class="lightbulb-table"
            :items="lightbulbs"
            :fields="fields"
            :busy="busy"
            primary-key="id"
            stacked="sm"
            small
            striped
            responsive
        >
            <template v-slot:empty>
                <div class="content has-text-grey has-text-centered">
                    <p>
                        <b-icon icon="emoticon-sad" size="is-large"> </b-icon>
                    </p>
                    <p>Nothing here.</p>
                </div>
            </template>
            <template v-slot:cell(group)="data">
                <a href="#" @click="addGroupFilter(data.item.group.id)">{{
                    data.item.group.name
                }}</a>
            </template>
            <template v-slot:cell(isAlive)="data">
                <template v-if="data.item.isAlive">
                    <b-icon icon="hdd-network-fill" />
                </template>
                <template v-else>
                    <b-icon icon="exclamation-square" variant="danger" />
                </template>
            </template>
            <template v-slot:cell(isOn)="data">
                <b-button
                    :disabled="data.item.busy"
                    variant="light"
                    @click="toggleLightbulb(data.item.id)"
                >
                    <b-icon
                        icon="power"
                        :variant="data.item.isOn ? 'success' : 'danger'"
                    />
                </b-button>
            </template>
            <template v-slot:cell(brightness)="data">
                <template v-if="data.item.isDimmable">
                    <b-input
                        class="brightness-switcher"
                        type="range"
                        :value="data.item.brightness.current"
                        :min="0"
                        :max="100"
                        :disabled="data.item.busy"
                        variant="is-warning"
                        @change="changeBrightness($event, data.item.id)"
                    /><span class="tag"
                        >{{ data.item.brightness.current }}%</span
                    ></template
                >
                <template v-else>
                    <span class="tag">Gerät nicht dimmbar</span>
                </template>
            </template>
            <template v-slot:cell(color)="data">
                <ColorMeter :color="data.item.color" />
            </template>
            <template v-slot:cell(spectrum)="data">
                {{ data.item.spectrum }}
            </template>
        </b-table>
    </div>
</template>

<script>
import SmarthomeView from "@/mixins/SmarthomeView";
import ColorMeter from "@/components/ColorMeter/ColorMeter";
import SmarthomeFilter from "@/components/SmarthomeFilter/SmarthomeFilter";

import "./SmarthomeLightbulbList.scss";

export default {
    name: "SmarthomeLightbulbList",
    mixins: [SmarthomeView],
    components: {
        ColorMeter,
        SmarthomeFilter
    },
    data() {
        return {
            fields: [
                {
                    key: "id",
                    label: "ID",
                    sortable: true
                },
                {
                    key: "name",
                    label: "Name",
                    sortable: true
                },
                {
                    key: "group",
                    label: "Group",
                    sortable: true
                },
                {
                    key: "isAlive",
                    label: "connected",
                    sortable: false,
                    class: "text-center"
                },
                {
                    key: "isOn",
                    label: "activated",
                    sortable: true,
                    class: "text-center"
                },
                {
                    key: "brightness",
                    label: "Brightness",
                    sortable: false,
                    class: "text-center"
                },
                {
                    key: "color",
                    label: "Color",
                    sortable: false,
                    class: "text-center"
                },
                {
                    key: "spectrum",
                    label: "Spectrum",
                    sortable: true,
                    class: "text-center"
                }
            ],
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
    methods: {
        toggleLightbulb(id) {
            this.$store.dispatch("toggleLightbulb", id);
        },
        changeBrightness(event, id) {
            let brightness = event;
            this.$store.dispatch("changeBrightness", {
                id: id,
                brightness: brightness
            });
        },
        filterData(data) {
            if (this.filter.group) {
                data = data.filter(item => item.group.id === this.filter.group);
            }
            if (this.filter.onOff !== null) {
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
