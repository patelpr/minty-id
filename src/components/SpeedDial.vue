<template>
  <v-speed-dial
    v-model="fab"
    bottom
    right
    fixed
    open-on-hover
    open-delay="10"
    direction="left"
    transition="slide-y-reverse-transition"
  >
    <template v-slot:activator>
      <v-btn v-model="fab" color="#7ed957" fab>
        <v-icon v-if="fab">
          mdi-close
        </v-icon>
        <v-icon v-else>
          mdi-account-circle
        </v-icon>
      </v-btn>
    </template>
    <v-btn v-if="user" fab small @click="signOut()"
      ><v-icon>mdi-exit-run</v-icon></v-btn
    >
    <v-btn fab to="/" small><v-icon>mdi-link</v-icon></v-btn>

    <v-btn
      small
      v-if="user"
      fab
      :to="{
        path: '/user/' + user.uid,
      }"
      ><v-icon>mdi-account</v-icon></v-btn
    >
  </v-speed-dial>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      fab: false,
      user: null,
    };
  },
  methods: {
    signOut() {
      firebase.auth().signOut();
      this.$router.push("/");
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user ? user : null;
    });
  },
};
</script>

<style></style>
