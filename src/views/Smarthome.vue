<template>
    <section class="smarthome">
        <link
            rel="stylesheet"
            href="https://cdn.materialdesignicons.com/5.3.45/css/materialdesignicons.min.css"
        />
        <b-table :data="lightbulbs">
            <template slot-scope="props">
                <b-table-column field="id" label="ID">
                    {{ props.row.id }}
                </b-table-column>
                <b-table-column field="name" label="Name">
                    {{ props.row.name }}
                </b-table-column>
                <b-table-column field="isAlive" label="verbunden" centered>
                    <template v-if="props.row.isAlive">
                        <b-icon icon="lan-connect" />
                    </template>
                    <template v-else>
                        <b-icon icon="lan-disconnect" type="is-danger" />
                    </template>
                </b-table-column>
                <b-table-column field="isOn" label="eingeschaltet" centered>
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
                            v-model="props.row.brightness.current"
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
                <b-table-column field="color" label="Lichtfarbe" centered>
                    <ColorMeter :color="props.row.color" />
                </b-table-column>
                <b-table-column field="spectrum" label="Farbspektrum" centered>
                    {{ props.row.spectrum }}
                </b-table-column>
            </template>
        </b-table>
    </section>
</template>
<script>
import axios from "axios";

import ColorMeter from "@/components/ColorMeter/ColorMeter";

export default {
    name: "smarthome",
    components: {
        ColorMeter
    },
    data() {
        return {
            lightbulbs: []
        };
    },
    created() {
        this.fetchLightbulbs();
    },
    methods: {
        async fetchLightbulbs() {
            let response = await axios({
                method: "GET",
                url: "http://192.168.178.49:8000/list"
            });
            if (response.status == 200) {
                this.lightbulbs = Object.entries(response.data.lightbulbs)
                    .filter(([key, item]) => key != 65551)
                    .map(([key, item]) => {
                        let lightInfo = item.lightList[0];
                        return {
                            id: item.instanceId,
                            name: item.name,
                            isAlive: item.alive,
                            isOn: lightInfo.onOff,
                            isDimmable: lightInfo.isDimmable,
                            brightness: {
                                current: lightInfo.dimmer,
                                initial: lightInfo.dimmer
                            },
                            color: lightInfo.color,
                            spectrum: lightInfo.spectrum,
                            busy: false
                        };
                    });
            }
        },
        async toggleLightbulb(id) {
            let device = this.lightbulbs.filter(item => item.id == id);
            if (device.length > 0) {
                let currentLightbulb = device[0];
                currentLightbulb.busy = true;

                try {
                    let response = await axios({
                        method: "PUT",
                        url: "http://192.168.178.49:8000/toggle",
                        data: { device: id }
                    });

                    currentLightbulb.isOn = !currentLightbulb.isOn;
                } catch (e) {}
                currentLightbulb.busy = false;
            }
        },
        async changeBrightness(brightness, id) {
            let device = this.lightbulbs.filter(item => item.id == id);
            if (device.length > 0) {
                let currentLightbulb = device[0];
                currentLightbulb.busy = true;

                try {
                    let response = await axios({
                        method: "PUT",
                        url: "http://192.168.178.49:8000/brightness",
                        data: { device: id, brightness: brightness }
                    });
                    currentLightbulb.brightness = {
                        current: brightness,
                        initial: brightness
                    };
                } catch (e) {
                    currentLightbulb.brightness.current =
                        currentLightbulb.brightness.initial;
                }
                currentLightbulb.busy = false;
            }
        }
    }
};
</script>
