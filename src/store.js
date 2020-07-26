import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

let state = {
    smarthome: {
        lightbulbs: [],
        groups: []
    }
};
let getters = {
    getLightbulbs: state => state.smarthome.lightbulbs,
    getGroups: state => state.smarthome.groups
};
let mutations = {
    LIGHTBULBS: (state, payload) => {
        state.smarthome.lightbulbs = payload;
    },
    GROUPS: (state, payload) => {
        state.smarthome.groups = payload;
    },
    UPDATE_LIGHTBULB_ONOFF: (state, payload) => {
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
    }
};
let actions = {
    async fetchSmarthomeData(context, payload) {
        let response = await axios({
            method: "GET",
            url: "http://192.168.178.49:8000/list"
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
                url: "http://192.168.178.49:8000/toggle",
                data: { device: payload }
            });

            context.commit("UPDATE_LIGHTBULB_ONOFF", payload);
        } catch (e) {}
    },
    async changeBrightness(context, payload) {
        try {
            await axios({
                method: "PUT",
                url: "http://192.168.178.49:8000/brightness",
                data: { device: payload.id, brightness: payload.brightness }
            });
            context.commit("UPDATE_LIGHTBULB_BRIGHTNESS", payload);
        } catch (e) {
            context.commit("RESET_LIGHTBULB_BRIGHTNESS", payload);
        }
    }
};

export default new Vuex.Store({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
});
