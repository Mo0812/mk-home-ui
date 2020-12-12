<template>
    <section class="log">
        <b-form-group class="text-center">
            <b-form-radio-group
                id="btn-radios-1"
                v-model="showLog"
                :options="showLogOptions"
                buttons
                name="radios-btn-default"
            ></b-form-radio-group>
        </b-form-group>
        <b-input-group size="sm" class="mb-3">
            <b-input v-model="filter" placeholder="Filter table..." />
            <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                    >Clear</b-button
                >
            </b-input-group-append></b-input-group
        >
        <b-table
            class="log-view-table"
            :fields="fields"
            :items="items"
            :filter="filter"
            small
            striped
            bordered
            :busy="busy"
            :responsive="true"
        >
            <template #cell(message)="row">
                <span class="word-break">{{ row.value }}</span>
            </template>

            <template #table-busy>
                Lädt...
            </template>
        </b-table>
    </section>
</template>

<script>
import View from "@/mixins/View";
import { mapGetters } from "vuex";

import "./LogView.scss";

export default {
    name: "SystemLogView",
    mixins: [View],
    data() {
        return {
            fields: [
                { key: "level", text: "Error level", sortable: true },
                { key: "message", text: "Error message" },
                { key: "timestamp", text: "Timestamp", sortable: true }
            ],
            filter: null,
            showLog: "app",
            showLogOptions: [
                { text: "App", value: "app" },
                { text: "Error", value: "error" }
            ]
        };
    },
    computed: {
        ...mapGetters({ log: "getLog" }),
        items() {
            if (this.showLog == "app") {
                return this.log.app;
            } else {
                return this.log.error;
            }
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
            await this.$store.dispatch("fetchAppLog");
            await this.$store.dispatch("fetchErrorLog");
            this.busy = false;
        }
    }
};
</script>
