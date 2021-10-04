<template>
  <v-app>
    <v-app-bar app>
      <v-img src="../public/mintyID.svg" height="125px"></v-img>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
        <SpeedDial />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase";
import SpeedDial from "./components/SpeedDial.vue";
export default {
  data() {
    return { user: null };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user ? user : null;
    });
  },
  components: {
    SpeedDial,
  },
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
