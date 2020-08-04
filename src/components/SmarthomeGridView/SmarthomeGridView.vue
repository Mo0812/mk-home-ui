<template>
    <div class="smarthome-grid-view">
        <SmarthomeFilter v-model="filter" />
        <b-row cols-md="3" cols-lg="4" class="">
            <b-col v-for="device in lightbulbs" :key="device.id" class="py-3">
                <div class="bg-danger text-dark p-2">
                    {{ device.name }}
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import View from "@/mixins/View";
import ColorMeter from "@/components/ColorMeter/ColorMeter";
import SmarthomeFilter from "@/components/SmarthomeFilter/SmarthomeFilter";

export default {
    name: "SmarthomeGridView",
    mixins: [View],
    components: {
        ColorMeter,
        SmarthomeFilter
    },
    data() {
        return {
            busy: false,
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
        toggleLightbulb(id) {
            this.$store.dispatch("toggleLightbulb", id);
        },
        changeBrightness(brightness, id) {
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
                console.log(data);
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
