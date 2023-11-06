import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import Books from '../components/Books.vue'
import BooksEingabe from '../components/BooksEingabe.vue'



const routes: Array<RouteRecordRaw> = [
  {
    path: '/books',
    name: 'books',
    component: Books
  },

  {
    path: '/books-eingabe',
    name: 'SecondWindow',
    component: BooksEingabe
  }


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
