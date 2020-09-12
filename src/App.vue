<template>
    <div id="app">
        <Navbar />
        <main class="main-view">
            <b-container fluid> <router-view /></b-container>
        </main>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";

import "@/assets/scss/style.scss";

export default {
    name: "app",
    components: {
        Navbar
    }
};
</script>
