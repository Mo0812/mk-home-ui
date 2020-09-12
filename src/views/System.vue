<template>
    <ViewContainer>
        <template v-slot:sidebar><SystemMenu /></template>
        <section class="system">
            <router-view></router-view>
        </section>
    </ViewContainer>
</template>

<script>
import View from "@/mixins/View";
import SystemMenu from "@/components/SystemMenu/SystemMenu";

export default {
    name: "system",
    mixins: [View],
    components: {
        SystemMenu
    },
    data() {
        return {};
    }
};
</script>
