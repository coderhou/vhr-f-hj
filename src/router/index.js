import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'


Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        hidden:true
    }, {
        path: '/login',
        name: 'Login2',
        component: Login,
        hidden:true
    }, {
        path: '/home',
        name: 'Home',
        component: Home,
        hidden:true
    },
]

const router = new VueRouter({
    routes
})

export default router
