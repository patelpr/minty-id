<template>
  <v-card>
    <v-container>
      <v-row
        ><v-col cols="12" lg="1"
          ><v-icon x-large>{{ link.icon }}</v-icon>
          <v-divider></v-divider>
          <v-btn
            @click="deleteLink(link.id)"
            color="red"
            fab
            top
            right
            small
            absolute
          >
            <v-icon>mdi-delete-circle</v-icon>
          </v-btn>
          <v-btn :href="link.link" target="_blank" icon>
            <v-icon>mdi-arrow-right-bold</v-icon>
          </v-btn></v-col
        ><v-divider vertical></v-divider
        ><v-col cols="12" lg="7"
          ><v-card-title> {{ link.name }} </v-card-title
          ><v-card-title>{{ link.link }}</v-card-title></v-col
        >
        <v-divider vertical></v-divider>
        <v-col cols="12" lg="4"> <QR :options="link.options" :down="true"/> </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import firebase from "firebase";
import QR from "./qr.vue";
export default {
  data() {
    return {
      user: null,
    };
  },
  props: ["link"],
  components: {
    QR,
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(this.link);
      this.user = user ? user : null;
    });
  },
  methods: {
    deleteLink(e) {
      console.log(e);
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("links")
        .doc(e)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
  },
};
</script>

<style></style>
