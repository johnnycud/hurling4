import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Media from '@/components/Media'
import Players from '@/components/Players/Players'
import CreatePlayer from '@/components/Players/CreatePlayer'
import Signin from '@/components/User/Signin'
import Profile from '@/components/User/Profile'
import Player from '@/components/Players/Player'
import AuthGuard from './auth-guard'

Vue.use(Router)
    /* eslint-disable */
export default new Router({
    routes: [{
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/players',
            name: 'Players',
            component: Players
        },
        {
            path: '/player/new',
            name: 'CreatePlayer',
            component: CreatePlayer,
            beforeEnter: AuthGuard
        },
        {
            path: '/players/:id',
            name: 'Player',
            props: true,
            component: Player
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            beforeEnter: AuthGuard
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup
        },
        {
            path: '/signin',
            name: 'Signin',
            component: Signin
        },
        {
            path: '/media',
            name: 'Media',
            component: Media
        },
        {
            path: '/media/new',
            name: 'AddMedia',
            component: AddMedia,
            beforeEnter: AuthGuard
        },
    ],
    mode: 'history'
})