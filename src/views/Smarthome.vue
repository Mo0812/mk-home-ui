<template>
    <ViewContainer :hasSidebar="false">
        <template v-slot:sidebar>
            <SmarthomeMenu />
        </template>
        <section class="smarthome">
            <router-view></router-view>
        </section>
    </ViewContainer>
</template>

<script>
import View from "@/mixins/View";
import SmarthomeMenu from "@/components/SmarthomeMenu/SmarthomeMenu";

export default {
    name: "smarthome",
    mixins: [View],
    components: {
        SmarthomeMenu
    },
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() {},
    beforeDestroy() {},
    methods: {}
};
</script>
