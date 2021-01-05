<template>
    <section class="system-devices">
        <div class="system-devices-section">
            <h5>Devices</h5>
            <b-table
                striped
                hover
                :items="devices"
                @row-clicked="selectDevice"
            ></b-table>
            <SystemDeviceModal :device="selectedDevice" />
        </div>
    </section>
</template>

<script>
import View from "@/mixins/View";
import { mapGetters } from "vuex";
import SystemDeviceModal from "./SystemDeviceModal";

export default {
    name: "SystemDeviceView",
    mixins: [View],
    components: {
        SystemDeviceModal,
    },
    data() {
        return {
            selectedDevice: null,
        };
    },
    computed: {
        ...mapGetters({ devices: "getSystemDevices" }),
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
            await this.$store.dispatch("fetchSystemDevices");
            this.busy = false;
        },
        async selectDevice(item) {
            this.selectedDevice = item;
            this.$root.$emit("bv::show::modal", "system-device-modal");
        },
    },
};
</script>
