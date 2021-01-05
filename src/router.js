import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "dashboard",
            component: () => import("./views/Dashboard.vue"),
        },
        {
            path: "/smarthome",
            name: "smarthome",
            component: () => import("./views/Smarthome.vue"),
            redirect: {
                name: "smarthome.views.devices",
            },
            children: [
                {
                    path: "views/grid",
                    name: "smarthome.views.grid",
                    component: () =>
                        import(
                            "./components/SmarthomeGridView/SmarthomeGridView.vue"
                        ),
                },
                {
                    path: "views/devices",
                    alias: "views",
                    name: "smarthome.views.devices",
                    component: () =>
                        import(
                            "./components/SmarthomeLightbulbList/SmarthomeLightbulbList.vue"
                        ),
                },
                {
                    path: "views/groups",
                    name: "smarthome.views.groups",
                    component: () =>
                        import(
                            "./components/SmarthomeGroupList/SmarthomeGroupList.vue"
                        ),
                },
                {
                    path: "automation/time",
                    alias: "automation",
                    name: "smarthome.automation.time",
                    component: () =>
                        import(
                            "./components/SmarthomeGridView/SmarthomeGridView.vue"
                        ),
                },
                {
                    path: "automation/ambient",
                    name: "smarthome.automation.ambient",
                    component: () =>
                        import(
                            "./components/SmarthomeLightbulbList/SmarthomeLightbulbList.vue"
                        ),
                },
            ],
        },
        {
            path: "/system",
            name: "system",
            component: () => import("./views/System.vue"),
            redirect: {
                name: "system.overview",
            },
            children: [
                {
                    path: "overview",
                    name: "system.overview",
                    component: () =>
                        import(
                            "./components/SystemOverviewView/SystemOverviewView.vue"
                        ),
                },
                {
                    path: "metrics",
                    name: "system.metrics",
                    component: () =>
                        import(
                            "./components/SystemMetricsView/SystemMetricsView.vue"
                        ),
                },
                {
                    path: "controls",
                    name: "system.controls",
                    component: () =>
                        import(
                            "./components/SystemControlView/SystemControlView.vue"
                        ),
                },
                {
                    path: "devices",
                    name: "system.devices",
                    component: () =>
                        import(
                            "./components/SystemDeviceView/SystemDeviceView.vue"
                        ),
                },
                {
                    path: "log",
                    name: "system.log",
                    component: () => import("./components/LogView/LogView.vue"),
                },
            ],
        },
        {
            path: "/settings",
            name: "settings",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("./views/Settings.vue"),
        },
    ],
});
