import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import DataPage from './components/DataPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/data', component: DataPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
