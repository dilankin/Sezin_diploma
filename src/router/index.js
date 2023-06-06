import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import TheraView from '../views/TheraView.vue'
import ArticlesView from '../views/ArticlesView.vue'
import FunctionView from '../views/FunctionView.vue'
import QuestionsView from '../views/QuestionsView.vue'
import ChatMl from '../views/ChatMl.vue'
import TerapistCard from '../views/TerapistCard.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/profile',
    name: 'ProfileView',
    component: ProfileView
  },
  {
    path: '/therapist',
    name: 'TheraView',
    component: TheraView
  },
  {
    path: '/therapist/:slug',
    name: 'TheraViewSlug',
    component: TerapistCard
  },
  {
    path: '/articles',
    name: 'ArticlesView',
    component: ArticlesView
  },
  {
    path: '/functions',
    name: 'FunctionView',
    component: FunctionView
  },
  {
    path: '/questions',
    name: 'QuestionsView',
    component: QuestionsView
  },
  {
    path: '/chat',
    name: 'ChatMl',
    component: ChatMl
  },
  {
    path: "/account",
    name: "account",
    component: () => import("../views/users_system/TerapevtView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/account/:slug",
    name: "accountSlug",
    component: () => import("../views/users_system/TerapevtView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/users_system/AdminView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin/:slug",
    name: "adminslug",
    component: () => import("../views/users_system/AdminView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Проверяем, есть ли у нас хэш-адрес в объекте to
    if (to.hash) {
      
        const el = document.querySelector(to.hash);
        if (el) {
        const scrollTop = el.getBoundingClientRect().top + window.pageYOffset - 85;
        window.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
        return null;
      }

    } else {
      document.getElementById('app').scrollIntoView({ behavior: 'smooth' })
      // return { top: 0 }
    }
  }
})


router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("access_token")) {
      next();
    } else {
      next({ name: "home" });
    }
  } else {
    next();
  }
});

export default router

