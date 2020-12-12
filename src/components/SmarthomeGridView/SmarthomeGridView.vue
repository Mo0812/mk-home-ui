<template>
    <div class="smarthome-grid-view">
        <b-row cols-md="3" cols-lg="4" class="">
            <b-col v-for="device in lightbulbs" :key="device.id" class="py-3">
                <div
                    class="grid-item text-dark p-2"
                    @click="toggleLightbulb(device.id)"
                >
                    <h5 class="device-name">{{ device.name }}</h5>
                    <p class="device-group">{{ device.group.name }}</p>
                    <p class="device-status">
                        <b-form-checkbox
                            v-model="device.isOn"
                            name="device-is-on"
                            switch
                        />
                    </p>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import SmarthomeView from "@/mixins/SmarthomeView";

import "./SmarthomeGridView.scss";

export default {
    name: "SmarthomeGridView",
    mixins: [SmarthomeView],
    components: {},
    data() {
        return {
            filter: {
                group: null,
                onOff: null,
                term: null
            }
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
    methods: {
        toggleLightbulb(id) {
            this.$store.dispatch("toggleLightbulb", id);
        },
        changeBrightness(brightness, id) {
            this.$store.dispatch("changeLightbulbBrightness", {
                id: id,
                brightness: brightness
            });
        }
    }
};
</script>
