<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="pb-15">
          <v-toolbar color="#7ed957"
            ><v-spacer /> <v-card-title><b>LOGIN</b></v-card-title
            ><v-spacer
          /></v-toolbar>

          <Auth />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
      this.user = user ? user : null;
      user && this.$router.push("/");
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
