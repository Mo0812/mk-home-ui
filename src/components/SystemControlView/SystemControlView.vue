<template>
    <section class="system-control">
        <div class="system-control-section">
            <h5>Display</h5>
            <template v-if="controls.display">
                <b-form-group
                    label-cols="3"
                    label="Connected"
                    label-for="displayConnected"
                >
                    <template v-if="controls.display.connected">
                        <span
                            id="displayConnected"
                            class="tag bg-success text-white"
                            >connected</span
                        >
                    </template>
                    <template v-else>
                        <span
                            id="displayConnected"
                            class="tag bg-danger text-white"
                            >no display detected</span
                        >
                    </template>
                </b-form-group>
                <b-form-group
                    label-cols="3"
                    label="Backlight"
                    label-for="displayIsOn"
                >
                    <b-checkbox
                        id="displayIsOn"
                        :checked="controls.display.isOn"
                        @change="toggleDisplay"
                        :disabled="busy || !controls.display.connected"
                        switch
                    />
                </b-form-group>
                <b-form-group
                    label-cols="3"
                    label="Brightness"
                    label-for="displayBrightness"
                >
                    <b-input
                        id="displayBrightness"
                        class="brightness-switcher"
                        type="range"
                        :value="controls.display.brightness.current"
                        :min="0"
                        :max="255"
                        variant="warning"
                        :disabled="busy || !controls.display.connected"
                        @change="changeBrightness"
                    />
                    <span class="tag"
                        >{{
                            controls.display.brightness.percentage * 100
                        }}
                        %</span
                    >
                </b-form-group>
            </template>
            <template v-else-if="busy">
                Lädt...
            </template>
            <template v-else>
                <b-alert variant="warning" show
                    >Keine Informationen gefunden</b-alert
                >
            </template>
        </div>
    </section>
</template>

<script>
import View from "@/mixins/View";
import { mapGetters } from "vuex";

export default {
    name: "SystemControlView",
    mixins: [View],
    computed: {
        ...mapGetters({ controls: "getSystemControls" })
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
            await this.$store.dispatch("fetchSystemControls");
            this.busy = false;
        },
        async toggleDisplay(val) {
            this.busy = true;
            await this.$store.dispatch("putDisplayOnOff", val);
            this.busy = false;
        },
        async changeBrightness(val) {
            this.busy = true;
            await this.$store.dispatch("changeDisplayBrightness", val);
            this.busy = false;
        }
    }
};
</script>
