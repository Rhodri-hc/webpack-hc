import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./home.vue";
import Login from "./login.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            redirect: "/home"
        },
        {
            path: "/home",
            name: "Home",
            component: Home
        },
        {
            path: "/login",
            name: "Login",
            component: Login
        }
    ]
})

export default router;