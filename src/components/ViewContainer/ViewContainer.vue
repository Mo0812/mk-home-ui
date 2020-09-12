<template>
    <div class="view-container">
        <b-row>
            <b-col v-if="hasSidebar" cols="2">
                <Sidebar>
                    <slot name="sidebar"></slot>
                </Sidebar>
            </b-col>
            <b-col><slot></slot></b-col>
        </b-row>
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
