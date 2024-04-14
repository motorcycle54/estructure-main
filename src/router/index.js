import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const About = () => import('../views/aboutView/AboutView.vue');
const RecepcionPide = () => import('../views/recepcionPide/RecepcionPide.vue');
const EmisionPide = () => import('../views/emisionPide/EmisionPide.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/recepcion-pide',
    name: 'recepcion Pide',
    component: RecepcionPide

  },
  {
    path: '/emision-pide',
    name: 'emision Pide',
    component: EmisionPide
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
