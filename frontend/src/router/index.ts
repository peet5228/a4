import { createRouter, createWebHistory } from 'vue-router'
import RegisterForm from '@/RegisterForm.vue'
import LoginForm from '@/LoginForm.vue'
import UserLayout from '@/components/UserLayout.vue'

//commit
import Committee from '@/views/Committee/index.vue'
import Show_score from '@/views/Committee/Show_score.vue'
import Show_eva from '@/views/Committee/Show_eva.vue'
import Save_score from '@/views/Committee/Save_score.vue'

//eva
import Evaluatee from '@/views/Evaluatee/index.vue'
import Edit_eva from '@/views/Evaluatee/Edit_eva.vue'

import Selfeva from '@/views/Evaluatee/Selfeva.vue'
import Check_score from '@/views/Evaluatee/Check_score.vue'
import Check_eva from '@/views/Evaluatee/Check_eva.vue'
import Check_commit from '@/views/Evaluatee/Check_commit.vue'

//staff
import Index from '@/views/Staff/index.vue'
import ManageEva from '@/views/Staff/ManageEva.vue'
import ManageCommit from '@/views/Staff/ManageCommit.vue'
import Topic from '@/views/Staff/Topic.vue'

import Indicate from '@/views/Staff/Indicate.vue'

import Round_eva from '@/views/Staff/Round_eva.vue'
import Eva from '@/views/Staff/Eva.vue'
import Eva_commit from '@/views/Staff/Eva_commit.vue'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/regis',
      name: 'RegisterForm',
      component: RegisterForm,
    },
    {
      path: '/login',
      name: 'LoginForm',
      component: LoginForm,
    },
    {
      path: '/',
      redirect: '/login',
    },

    //Staff
    {
      path: '/Staff',
      component: UserLayout,
      children:[
        {
          path: '/Staff',
          name: 'Staff',
          component: Index,
        },
        {
          path: '/ManageEva',
          name: 'ManageEva',
          component: ManageEva,
        },
        {
          path: '/ManageCommit',
          name: 'ManageCommit',
          component: ManageCommit,
        },
        {
          path: '/Topic',
          name: 'Topic',
          component: Topic,
        },
        {
          path: '/Indicate',
          name: 'Indicate',
          component: Indicate,
        },
        {
          path: '/Round_eva',
          name: 'Round_eva',
          component: Round_eva,
        },
        {
          path: '/Eva',
          name: 'Eva',
          component: Eva,
        },
        {
          path: '/Eva_commit/:id_eva',
          name: 'Eva_commit',
          component: Eva_commit,
        },
      ]
    },

    // Commit
    {
      path: '/Committee',
      component: UserLayout,
      children:[
        {
          path: '/Committee',
          name: 'Committee',
          component: Committee,
        },
        {
          path: '/Show_score/:id_eva',
          name: 'Show_score',
          component: Show_score,
        },
        {
          path: '/Show_eva',
          name: 'Show_eva',
          component: Show_eva,
        },
        {
          path: '/Save_score/:id_eva',
          name: 'Save_score',
          component: Save_score,
        },
      ]
    },
    
    //eva
    {
      path: '/Evaluatee',
      component: UserLayout,
      children:[
        {
          path: '/Evaluatee',
          name: 'Evaluatee',
          component: Evaluatee,
        },
        {
          path: '/Edit_eva',
          name: 'Edit_eva',
          component: Edit_eva,
        },
        {
          path: '/Selfeva',
          name: 'Selfeva',
          component: Selfeva,
        },
        {
          path: '/Check_score',
          name: 'Check_score',
          component: Check_score,
        },
        {
          path: '/Check_eva',
          name: 'Check_eva',
          component: Check_eva,
        },
        {
          path: '/Check_commit',
          name: 'Check_commit',
          component: Check_commit,
        },
      ]
    },
  ],
})

export default router
