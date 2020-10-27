import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/schedule',
    component: Layout,
    redirect: '/',
    name: 'Schedule',
    meta: { title: 'Schedule', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'scheduleStudent',
        name: 'ScheduleStudent',
        component: () => import('@/views/schedule/student/schedule'),
        meta: { title: 'ScheduleStudent', icon: 'table' }
      },
      {
        path: 'student',
        name: 'Student',
        component: () => import('@/views/schedule/student/studentGrades'),
        meta: { title: 'Student', icon: 'table' }
      },
      {
        path: 'scheduleTeacher',
        name: 'scheduleTeacher',
        component: () => import('@/views/schedule/teacher/schedule'),
        meta: { title: 'ScheduleTeacher', icon: 'table' }
      },
      {
        path: 'Teacher',
        name: 'Teacher',
        component: () => import('@/views/schedule/teacher/TeacherGrades'),
        meta: { title: 'Teacher', icon: 'table' }
      },
      {
        path: 'EditStudentGrades',
        name: 'EditStudentGrades',
        component: () => import('@/views/schedule/teacher/EditStudentGrades'),
        meta: { title: 'EditStudentGrades', icon: 'table' }
      }
    ]
  },

  {
    path: '/cursos',
    component: Layout,
    children: [{
      path: 'courses',
      name: 'courses',
      component: () => import('@/views/courses/index'),
      meta: { title: 'Cursos', icon: 'table' }
    }]
  },

  {
    path: '/salones',
    component: Layout,
    children: [{
      path: 'classrooms',
      name: 'classrooms',
      component: () => import('@/views/classrooms/index'),
      meta: { title: 'Salones', icon: 'table' }
    }]
  },

  {
    path: '/clases',
    component: Layout,
    children: [{
      path: 'classes',
      name: 'classes',
      component: () => import('@/views/classes/index'),
      meta: { title: 'Clases', icon: 'table' }
    }]
  },

  // Subject Routes
  {
    path: '/subject',
    component: Layout,
    name: 'Subject',
    meta: {
      title: 'Subject',
      icon: 'nested'
    },
    children: [
      {
        path: 'form',
        name: 'Form',
        component: () => import('@/views/subject/form'),
        meta: { title: 'Subject Form', icon: 'form' }
      },
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/subject/list'),
        meta: { title: 'Subject List', icon: 'table' }
      },
      {
        path: 'teacherform',
        name: 'Teacher Form',
        component: () => import('@/views/subject/teacherform'),
        meta: { title: 'Teacher Form', icon: 'form' }
      },
      {
        path: 'teacherlist',
        name: 'Teacher List',
        component: () => import('@/views/subject/teacherlist'),
        meta: { title: 'Teacher List', icon: 'user' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    name: 'User',
    meta: {
      title: 'User',
      icon: 'nested'
    },
    children: [
      {
        path: 'details',
        name: 'User Details',
        component: () => import('@/views/user/details'),
        meta: { title: 'User Details', icon: 'user' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
