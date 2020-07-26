import Vue from "vue";
import Router from "vue-router";
import Smarthome from "./views/Smarthome.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "smarthome",
            component: Smarthome
        },
        {
            path: "/smarthome",
            name: "smarthome",
            component: Smarthome
        },
        {
            path: "/monitoring",
            name: "monitoring",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("./views/Monitoring.vue")
        }
    ]
});
