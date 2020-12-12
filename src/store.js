import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

const url = process.env.VUE_APP_SERVER_URL;

Vue.use(Vuex);

let state = {
    websocket: {
        connection: false
    },
    smarthome: {
        lightbulbs: [],
        groups: []
    },
    system: {
        metrics: {},
        controls: {}
    },
    log: {
        app: [],
        error: []
    }
};
let getters = {
    websocketConnected: state => state.websocket.connection,
    getLightbulbs: state => state.smarthome.lightbulbs,
    getGroups: state => state.smarthome.groups,
    getSystemControls: state => state.system.controls,
    getLog: state => state.log
};
let mutations = {
    WEBSOCKET_CONNECTION: (state, payload) => {
        state.websocket.connection = payload;
    },
    LIGHTBULBS: (state, payload) => {
        state.smarthome.lightbulbs = payload;
    },
    GROUPS: (state, payload) => {
        state.smarthome.groups = payload;
    },
    UPDATE_LIGHTBULB_ONOFF_TOGGLE: (state, payload) => {
        let device = state.smarthome.lightbulbs.filter(
            item => item.id == payload
        );
        if (device.length > 0) {
            let currentLightbulb = device[0];
            currentLightbulb.busy = true;
            currentLightbulb.isOn = !currentLightbulb.isOn;
            currentLightbulb.busy = false;
        }
    },
    UPDATE_LIGHTBULB_ONOFF: (state, payload) => {
        let device = state.smarthome.lightbulbs.filter(
            item => item.id == payload.id
        );
        if (device.length > 0) {
            let currentLightbulb = device[0];
            currentLightbulb.busy = true;
            currentLightbulb.isOn = payload.isOn;
            currentLightbulb.busy = false;
        }
    },
    UPDATE_LIGHTBULB_BRIGHTNESS: (state, payload) => {
        let device = state.smarthome.lightbulbs.filter(
            item => item.id == payload.id
        );
        if (device.length > 0) {
            let currentLightbulb = device[0];
            currentLightbulb.busy = true;
            currentLightbulb.brightness = {
                current: payload.brightness,
                initial: payload.brightness
            };
            currentLightbulb.busy = false;
        }
    },
    RESET_LIGHTBULB_BRIGHTNESS: (state, payload) => {
        let device = state.smarthome.lightbulbs.filter(
            item => item.id == payload.id
        );
        if (device.length > 0) {
            let currentLightbulb = device[0];
            currentLightbulb.busy = true;
            currentLightbulb.brightness.current = payload.brightness.initial;
            currentLightbulb.busy = false;
        }
    },
    SYSTEM_CONTROLS: (state, payload) => {
        state.system.controls = payload;
    },
    APP_LOG: (state, payload) => {
        state.log.app = payload;
    },
    ERROR_LOG: (state, payload) => {
        state.log.error = payload;
    }
};
let actions = {
    setWebsocketConnection(context, payload) {
        context.commit("WEBSOCKET_CONNECTION", payload);
    },
    async fetchSmarthomeData(context, payload) {
        let response = await axios({
            method: "GET",
            url: `${url}/smarthome/list`
        });
        if (response.status == 200) {
            let groups = Object.entries(response.data.groups).map(
                ([key, item]) => {
                    return {
                        id: item.instanceId,
                        name: item.name,
                        isOn: item.onOff,
                        groupMember: item.deviceIDs
                    };
                }
            );
            context.commit("GROUPS", groups);

            let lightbulbs = Object.entries(response.data.lightbulbs)
                .filter(([key, item]) => key != 65551)
                .map(([key, item]) => {
                    let groupInfo = groups.filter(group =>
                        group.groupMember.includes(item.instanceId)
                    );
                    let group = groupInfo.length > 0 ? groupInfo[0] : null;
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
                        group: group,
                        busy: false
                    };
                });
            context.commit("LIGHTBULBS", lightbulbs);
        }
    },
    async toggleLightbulb(context, payload) {
        try {
            await axios({
                method: "PUT",
                url: `${url}/smarthome/device/toggle`,
                data: { device: payload }
            });

            context.commit("UPDATE_LIGHTBULB_ONOFF_TOGGLE", payload);
        } catch (e) {}
    },
    async putLightbulbOn(context, payload) {
        try {
            await axios({
                method: "PUT",
                url: `${url}/smarthome/device/on`,
                data: { device: payload }
            });

            context.commit("UPDATE_LIGHTBULB_ONOFF", {
                id: payload,
                isOn: true
            });
        } catch (e) {}
    },
    async putLightbulbOff(context, payload) {
        try {
            await axios({
                method: "PUT",
                url: `${url}/smarthome/device/off`,
                data: { device: payload }
            });

            context.commit("UPDATE_LIGHTBULB_ONOFF", {
                id: payload,
                isOn: false
            });
        } catch (e) {}
    },
    async changeLightbulbBrightness(context, payload) {
        try {
            await axios({
                method: "PUT",
                url: `${url}/smarthome/device/brightness`,
                data: { device: payload.id, brightness: payload.brightness }
            });
            context.commit("UPDATE_LIGHTBULB_BRIGHTNESS", payload);
        } catch (e) {
            context.commit("RESET_LIGHTBULB_BRIGHTNESS", payload);
        }
    },
    async putGroupOn(context, payload) {
        try {
            await axios({
                method: "PUT",
                url: `${url}/smarthome/group/on`,
                data: { group: payload }
            });

            context.getters.getLightbulbs
                .filter(lightbulb => lightbulb.group.id === payload)
                .forEach(lightbulb =>
                    context.commit("UPDATE_LIGHTBULB_ONOFF", {
                        id: lightbulb.id,
                        isOn: true
                    })
                );
        } catch (e) {}
    },
    async putGroupOff(context, payload) {
        try {
            await axios({
                method: "PUT",
                url: `${url}/smarthome/group/off`,
                data: { group: payload }
            });

            context.getters.getLightbulbs
                .filter(lightbulb => lightbulb.group.id === payload)
                .forEach(lightbulb =>
                    context.commit("UPDATE_LIGHTBULB_ONOFF", {
                        id: lightbulb.id,
                        isOn: false
                    })
                );
        } catch (e) {}
    },
    async changeGroupBrightness(context, payload) {
        try {
            await axios({
                method: "PUT",
                url: `${url}/smarthome/group/brightness`,
                data: { group: payload.id, brightness: payload.brightness }
            });
            context.getters.getLightbulbs
                .filter(lightbulb => lightbulb.group.id === payload.id)
                .forEach(lightbulb =>
                    context.commit("UPDATE_LIGHTBULB_BRIGHTNESS", {
                        id: lightbulb.id,
                        brightness: payload.brightness
                    })
                );
        } catch (e) {
            context.getters.getLightbulbs
                .filter(lightbulb => lightbulb.group.id === payload.id)
                .forEach(lightbulb =>
                    context.commit("RESET_LIGHTBULB_BRIGHTNESS", {
                        id: lightbulb.id,
                        brightness: {
                            initial: lightbulb.brightness.initial,
                            current: payload.brightness
                        }
                    })
                );
        }
    },
    async fetchSystemControls(context, payload) {
        let response = await axios({
            method: "GET",
            url: `${url}/system/display/status`
        });
        if (response.status == 200) {
            context.commit("SYSTEM_CONTROLS", response.data);
        }
    },
    async putDisplayOnOff(context, payload) {
        try {
            const response = await axios({
                method: "PUT",
                url: `${url}/system/display/` + (payload ? "on" : "off")
            });
            context.commit("SYSTEM_CONTROLS", response.data);
        } catch (e) {
            context.commit(
                "SYSTEM_CONTROLS",
                context.getters.getSystemControls
            );
        }
    },
    async changeDisplayBrightness(context, payload) {
        try {
            const response = await axios({
                method: "PUT",
                url: `${url}/system/display/brightness`,
                data: { brightness: payload }
            });
            context.commit("SYSTEM_CONTROLS", response.data);
        } catch (e) {
            context.commit(
                "SYSTEM_CONTROLS",
                context.getters.getSystemControls
            );
        }
    },
    async fetchAppLog(context) {
        let response = await axios({
            method: "GET",
            url: `${url}/logging/app`
        });
        if (response.status == 200) {
            context.commit("APP_LOG", response.data);
        }
    },
    async fetchErrorLog(context) {
        let response = await axios({
            method: "GET",
            url: `${url}/logging/error`
        });
        if (response.status == 200) {
            context.commit("ERROR_LOG", response.data);
        }
    }
};

export default new Vuex.Store({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
});
