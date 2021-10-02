<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <Login /><v-spacer /><v-btn v-if="user" text to="/profile"
        >My Profile</v-btn
      ><v-spacer /><AddCard v-if="user" />
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Login from "./views/Login.vue";
import firebase from "firebase";
import AddCard from "./components/AddCard.vue";
export default {
  data() {
    return { user: null };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  components: {
    AddCard,
    Login,
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
