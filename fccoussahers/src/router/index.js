import {createRouter, createWebHistory} from 'vue-router'
import Home from '../pages/Home.vue'
import Bureau from '../pages/Bureau.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Bureau',
        name: 'Bureau',
        component: Bureau
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;