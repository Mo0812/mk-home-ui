<template>
    <ViewContainer :hasSidebar="false"> <h3>Dashboard</h3></ViewContainer>
</template>

<script>
import View from "@/mixins/View";

export default {
    name: "dashboard",
    mixins: [View],
    components: {},
    data() {
        return {};
    },
    created() {},
    methods: {}
};
</script>
