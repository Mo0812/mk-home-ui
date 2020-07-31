<template>
    <div class="smarthome-lightbulb-list">
        <!--<div class="filter">
            <div class="columns">
                <div class="column full">
                    <b-input
                        placeholder="Search..."
                        type="search"
                        icon="magnify"
                        v-model="filter.term"
                    ></b-input>
                </div>
            </div>
        </div>-->
        <b-table
            :data="parsedGroups"
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
                <!--<b-table-column field="group" label="Gruppe" sortable>
                    <a href="#" @click="addGroupFilter(props.row.group.id)">{{
                        props.row.group.name
                    }}</a>
                </b-table-column>-->
                <b-table-column
                    field="isOn"
                    label="eingeschaltet"
                    centered
                    sortable
                >
                    <b-button
                        :disabled="props.row.busy"
                        @click="toggleLightbulbs(props.row.id)"
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
                            :value="props.row.brightness"
                            :min="0"
                            :max="100"
                            :disabled="props.row.busy"
                            type="is-warning"
                            @change="changeBrightness($event, props.row.id)"
                            lazy
                        /><span class="tag"
                            >{{ props.row.brightness }}%</span
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
                    <template v-if="props.row.color">
                        <ColorMeter :color="props.row.color"
                    /></template>
                    <template v-else>
                        <span class="tag">Lichtfarbe nicht definiert</span>
                    </template>
                </b-table-column>
            </template>
        </b-table>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import View from "@/mixins/View";
import ColorMeter from "@/components/ColorMeter/ColorMeter";

export default {
    name: "SmarthomeGroupList",
    mixins: [View],
    components: {
        ColorMeter
    },
    data() {
        return {
            busy: false,
            filter: {
                term: null
            }
        };
    },
    computed: {
        ...mapGetters({ lightbulbs: "getLightbulbs", groups: "getGroups" }),
        parsedGroups() {
            return this.filterData(this.processSmarthomeData(this.groups));
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
        processSmarthomeData(data) {
            return data.map(group => {
                group.groupMember = group.groupMember
                    .map(deviceId => {
                        let devices = this.lightbulbs.filter(
                            item => item.id === deviceId
                        );
                        if (devices.length > 0) {
                            return devices[0];
                        } else {
                            return null;
                        }
                    })
                    .filter(groupMember => groupMember !== null);

                group.isOn =
                    group.groupMember.filter(device => device.isOn).length > 0;
                group.isDimmable =
                    group.groupMember.length > 0 &&
                    group.groupMember.filter(device => device.isDimmable)
                        .length > 0;
                group.brightness =
                    group.groupMember.length > 0
                        ? Math.round(
                              (group.groupMember.reduce(
                                  (acc, currentDevice) =>
                                      acc + currentDevice.brightness.current,
                                  0
                              ) /
                                  group.groupMember.length +
                                  Number.EPSILON) *
                                  100
                          ) / 100
                        : 0;
                group.color =
                    group.groupMember.length > 0
                        ? group.groupMember[0].color
                        : null;
                group.busy =
                    group.groupMember.filter(device => device.busy).length > 0;
                return group;
            });
        },
        toggleLightbulbs(groupId) {
            let group = this.groups.filter(group => group.id === groupId);
            group.forEach(currentGroup =>
                currentGroup.groupMember.forEach(device => {
                    if (currentGroup.isOn) {
                        this.$store.dispatch("putLightbulbOff", device.id);
                    } else {
                        this.$store.dispatch("putLightbulbOn", device.id);
                    }
                })
            );
        },
        changeBrightness(brightness, groupId) {
            let group = this.groups.filter(group => group.id === groupId);
            group.forEach(currentGroup =>
                currentGroup.groupMember.forEach(device => {
                    this.$store.dispatch("changeBrightness", {
                        id: device.id,
                        brightness: brightness
                    });
                })
            );
        },
        filterData(data) {
            if (this.filter.term && this.filter.term !== "") {
                data = data.filter(item =>
                    item.name
                        .toLowerCase()
                        .includes(this.filter.term.toLowerCase())
                );
            }
            return data;
        }
    }
};
</script>
