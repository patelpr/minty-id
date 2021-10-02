<template>
  <v-dialog transition="dialog-top-transition" max-width="600" persistent>
    <template v-slot:activator="{ on, attrs }">
      <div v-if="!user">
        <v-btn text v-bind="attrs" v-on="on">Login</v-btn>
      </div>
      <div v-else>
        <v-btn text @click="signOut()">Logout</v-btn>
      </div>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>Login</v-toolbar>

        <Auth />

        <v-card-actions class="justify-end">
          <v-btn text @click="dialog.value = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import firebase from "firebase";
import Auth from "../components/Auth.vue";
export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  components: {
    Auth,
  },
  methods: {
    signOut() {
      firebase.auth().signOut();
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
