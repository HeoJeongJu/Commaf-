import { createRouter, createWebHistory } from "vue-router";
import ListView from "../components/ListVue.vue";
import ItemView from "../components/ItemVue.vue";
import HomePage from "../components/HomePage.vue";
import QuizView from "../components/quiz/QuizView.vue";
import QuizStart from "../components/quiz/QuizStart.vue";
import ResultView from "../components/quiz/ResultView.vue";

const routes = [ 
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: HomePage
    },
    {
        path: '/start',
        name: 'start',
        component: QuizStart
    },
    {
        path: '/quiz',
        name: 'quiz',
        component: QuizView
    },
    {
        path: '/item',
        name: 'item',
        component: ListView
    },
    {
        path: '/item/:id',
        component: ItemView
    },
    {
        path: '/result',
        component: ResultView
    }

]

export const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;