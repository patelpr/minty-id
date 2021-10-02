<template>
  <v-app>
    <v-app-bar app>
      <v-spacer /><v-img
        src="../public/mintyID.svg"
        height="200px"
        width="500px"
      ></v-img
      ><v-spacer />
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <SpeedDial />
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
body {
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: rgb(12.159729%, 27.059937%, 38.819885%);
}
</style>
