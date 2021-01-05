<template>
    <b-modal id="system-device-modal" size="lg">
        <template v-if="lDevice">
            <b-form-group
                label-cols="4"
                description="The port for accessing the Websocket services"
                label="Websocket Port"
                label-for="ws_port"
            >
                <b-select v-model="lDevice.type">
                    <option :value="null">Choose device type...</option>
                </b-select>
            </b-form-group>
            <b-form-group
                label-cols="4"
                description="A nicename to describe the device"
                label="Nicename"
                label-for="nicename"
            >
                <b-form-input
                    id="nicename"
                    v-model="lDevice.nicename"
                    trim
                ></b-form-input>
            </b-form-group>
            <b-form-group
                label-cols="4"
                description="The IP address of the attached device"
                label="IP Address"
                label-for="ip_addr"
            >
                <b-form-input
                    id="ip_addr"
                    v-model="lDevice.ip_addr"
                    trim
                ></b-form-input>
            </b-form-group>
            <b-form-group
                label-cols="4"
                description="The port for accessing the REST and Web interfaces"
                label="Port"
                label-for="port"
            >
                <b-form-input
                    id="port"
                    v-model="lDevice.port"
                    trim
                ></b-form-input>
            </b-form-group>
            <b-form-group
                label-cols="4"
                description="The port for accessing the Websocket services"
                label="Websocket Port"
                label-for="ws_port"
            >
                <b-form-input
                    id="ws_port"
                    v-model="lDevice.ws_port"
                    trim
                ></b-form-input>
            </b-form-group>
        </template>
    </b-modal>
</template>

<script>
export default {
    name: "SystemDeviceModal",
    props: ["device"],
    data() {
        return {
            lDevice: null,
        };
    },
    watch: {
        device: {
            handler(val) {
                this.lDevice = val;
            },
            immediate: true,
            deep: true,
        },
    },
};
</script>
