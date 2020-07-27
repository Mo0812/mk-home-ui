<template>
    <ViewContainer>
        <template v-slot:sidebar>
            <SmarthomeMenu @change="changeView" />
        </template>
        <section class="smarthome">
            <template v-if="currentView === 'group-list'">
                <SmarthomeGroupList />
            </template>
            <template v-else>
                <SmarthomeLightbulbList />
            </template>
        </section>
    </ViewContainer>
</template>

<script>
import View from "@/mixins/View";
import SmarthomeMenu from "@/components/SmarthomeMenu/SmarthomeMenu";
import SmarthomeLightbulbList from "@/components/SmarthomeLightbulbList/SmarthomeLightbulbList";
import SmarthomeGroupList from "@/components/SmarthomeGroupList/SmarthomeGroupList";

export default {
    name: "smarthome",
    mixins: [View],
    components: {
        SmarthomeMenu,
        SmarthomeLightbulbList,
        SmarthomeGroupList
    },
    data() {
        return {
            currentView: null
        };
    },
    computed: {},
    created() {},
    mounted() {},
    beforeDestroy() {},
    methods: {
        changeView(id) {
            this.currentView = id;
        }
    }
};
</script>
