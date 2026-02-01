import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Projects from '../views/Projects.vue'
import Contact from '../views/Contact.vue'
import Admin from '../views/Admin.vue'
import AdminLogin from '../views/AdminLogin.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guard for admin routes
router.beforeEach((to, from, next) => {
  console.log('Navigation guard:', to.path, 'requiresAuth:', to.meta.requiresAuth)

  const isAuthenticated = localStorage.getItem('adminAuth') === 'true'
  console.log('Is authenticated:', isAuthenticated)

  // Protect admin routes
  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      console.log('Access denied - redirecting to login')
      next({ path: '/admin/login', replace: true })
      return
    } else {
      console.log('Access granted')
      next()
      return
    }
  }

  // Redirect to admin if already logged in and trying to access login page
  if (to.path === '/admin/login' && isAuthenticated) {
    console.log('Already logged in - redirecting to admin')
    next({ path: '/admin', replace: true })
    return
  }

  next()
})

export default router
