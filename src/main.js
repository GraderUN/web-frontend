import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import getEnv from '@/utils/env'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import firebase from 'firebase'
import firebaseApp from '@/firebase/init'
require('dotenv').config()
import '@/icons' // icon
// import '@/permission' // permission control
import { createProvider } from './vue-apollo'

// import { createProvider } from './vue-apollo';
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import VueApollo from 'vue-apollo'
import dotenv from 'dotenv'
import Logo from '@/layout/components/Sidebar/Logo'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
dotenv.config()
const app = null
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false
// window?.configs?.[name] || process.env[name]
const GATEWAY = getEnv('VUE_APP_VARIABLE_1')
const GATEWAY2 = window?.configs?.VUE_APP_VARIABLE_2
const GATEWAY3 = process.env.NODE_ENV_VARIABLE_3
const GATEWAY4 = window?.configs?.NODE_ENV_VARIABLE_4

// const PORT = getEnv('VUE_APP_VARIABLE_2')
console.log(`Gateway: '${GATEWAY}'`)
console.log('GATEWAY1:')
console.log(GATEWAY)
console.log('GATEWAY2:')
console.log(GATEWAY2)
console.log('GATEWAY3:')
console.log(GATEWAY3)
console.log('GATEWAY4:')
console.log(GATEWAY4)

const httpLink = new HttpLink({
  uri: `${GATEWAY}`
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      el: '#app',
      apolloProvider,
      router,
      store,
      apolloProvider: createProvider(),
      render: h => h(App)
    })
  }
})

