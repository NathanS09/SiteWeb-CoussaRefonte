import {createRouter, createWebHistory} from 'vue-router'
import Home from '../pages/Home.vue'
import Club from '../pages/Club.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Club',
        name: 'Club',
        component: Club
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;