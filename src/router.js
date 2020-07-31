import Vue from "vue";
import Router from "vue-router";
import Smarthome from "./views/Smarthome.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "dashboard",
            component: () => import("./views/Dashboard.vue")
        },
        {
            path: "/smarthome",
            name: "smarthome",
            component: () => import("./views/Smarthome.vue"),
            redirect: {
                name: "smarthome.devices"
            },
            children: [
                {
                    path: "devices",
                    name: "smarthome.devices",
                    component: () =>
                        import(
                            "./components/SmarthomeLightbulbList/SmarthomeLightbulbList.vue"
                        )
                },
                {
                    path: "groups",
                    name: "smarthome.groups",
                    component: () =>
                        import(
                            "./components/SmarthomeGroupList/SmarthomeGroupList.vue"
                        )
                }
            ]
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
