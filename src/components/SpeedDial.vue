<template>
  <v-speed-dial
    v-model="fab"
    bottom
    right
    absolute
    direction="left"
    transition="slide-y-reverse-transition"
  >
    <template v-slot:activator>
      <v-btn v-model="fab" color="blue darken-2" dark fab>
        <v-icon v-if="fab">
          mdi-close
        </v-icon>
        <v-icon v-else>
          mdi-account-circle
        </v-icon>
      </v-btn>
    </template>
    <Login />
    <AddCard />
    <v-btn
      v-if="user"
      fab
      :to="{
        path: '/' + user.uid,
      }"
      ><v-icon>mdi-account</v-icon></v-btn
    >
  </v-speed-dial>
</template>

<script>
import Login from "../views/Login.vue";
import AddCard from "../components/AddCard.vue";
import firebase from "firebase";
export default {
  data() {
    return {
      fab: false,
      user: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user ? user : null;
    });
  },
  components: {
    Login,
    AddCard,
  },
};
</script>

<style></style>
