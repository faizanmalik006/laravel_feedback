import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../components/DefaultLayout.vue"
import AuthLayout from "../components/AuthLayout.vue"
import Dashboard from "../views/Dashboard.vue"
import Feedbacks from "../views/Feedbacks.vue"
import FeedbackView from "../views/FeedbackView.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import store from "../store"


const routes = [
    {
        path: '/',
        redirect:'/dashboard',
        name: 'Dashboard',
        component : DefaultLayout,
        meta : {requiresAuth: true},
        children : [
            {
                path : '/dashboard',
                name : 'Dashboard',
                component : Dashboard 
            },
            {
                path : '/feedbacks/create',
                name : 'FeedbackCreate',
                component : FeedbackView
            },
            {
                path : '/feedbacks',
                name : 'Feedbacks',
                component : Feedbacks 
            },
        ]
    },
    {
        path: '/auth',
        redirect: '/login',
        name: 'Auth',
        component : AuthLayout,
        meta : {isGuest : true},
        children : [
            {
                path: '/register',
                name: 'Register',
                component: Register
            },
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
        ]
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next)=>{
    if(to.meta.requiresAuth && !store.state.user.token){
        next({name : 'Login'})
    }
    else if(store.state.user.token && to.meta.isGuest) {
        next({name:'Dashboard'});
    }
    else{
        next();
    }
})


export default router;