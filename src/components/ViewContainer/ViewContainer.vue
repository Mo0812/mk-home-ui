<template>
    <div class="view-container">
        <div class="columns">
            <div v-if="hasSidebar" class="column is-one-quarter">
                <Sidebar>
                    <slot name="sidebar"></slot>
                </Sidebar>
            </div>
            <div class="column"><slot></slot></div>
        </div>
    </div>
</template>

<script>
import Sidebar from "@/components/Sidebar/Sidebar";

export default {
    name: "ViewContainer",
    props: {
        hasSidebar: {
            type: Boolean,
            default: true
        }
    },
    components: {
        Sidebar
    }
};
</script>
