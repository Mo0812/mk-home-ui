<template>
    <div class="color-meter" :style="{ backgroundColor: parsedColor }"></div>
</template>

<script>
import "./ColorMeter.scss";

export default {
    name: "ColorMeter",
    props: ["color"],
    computed: {
        parsedColor() {
            return this.generateColorCode(this.color);
        }
    },
    methods: {
        generateColorCode(hex) {
            return "#" + hex;
        }
    }
};
</script>
