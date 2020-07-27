<template>
    <div id="app" class="container is-fluid">
        <link
            rel="stylesheet"
            href="https://cdn.materialdesignicons.com/5.3.45/css/materialdesignicons.min.css"
        />
        <Navbar />
        <main class="main-view">
            <router-view />
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
