import View from "@/mixins/View";

export default {
    mixins: [View],
    data() {
        return {};
    },
    created() {
        this.fetchData();
    },
    mounted() {
        this.eventBus.$on("refresh", this.refreshData);
    },
    beforeDestroy() {
        this.eventBus.$off("refresh", this.refreshData);
    },
    methods: {
        async fetchData(always = false) {
            this.busy = true;
            let websocketConnected = this.$store.getters.websocketConnected;
            if (!websocketConnected || always) {
                await this.$store.dispatch("fetchSmarthomeData");
            }
            this.busy = false;
        },
        refreshData() {
            this.fetchData(true);
        }
    }
};
