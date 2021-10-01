import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false
const firebaseConfig = {
  apiKey: "AIzaSyB4CixswGzVmPW_zhL1tiYTlifX--UlKAI",
  authDomain: "minty-id.firebaseapp.com",
  projectId: "minty-id",
  storageBucket: "minty-id.appspot.com",
  messagingSenderId: "425465910831",
  appId: "1:425465910831:web:85bfc13786516ec319d8da",
};
firebase.initializeApp(firebaseConfig);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
