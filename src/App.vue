<template>
  <v-app>
    <v-app-bar dense>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-img src="../public/mintyID.svg" height="125px"></v-img>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group active-class="deep-blue--text text--accent-4">
          <v-list-item href="/#/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="user" :href="'/#/user/' + user.uid">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item v-if="user" @click="signOut">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return { user: null, drawer: false };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user ? user : null;
    });
  },
  methods: {
    signOut() {
      firebase.auth().signOut();
      this.$router.push("/");
    },
  },
  components: {},
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Marko+One&display=swap");
body {
  overflow: hidden;
}
#app {
  font-family: "Marko One", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #1f4563;
}
</style>
