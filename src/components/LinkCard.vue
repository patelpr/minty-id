<template>
  <v-card>
    <v-container>
      <v-row
        ><v-col cols="1"
          ><v-icon x-large>{{ link.icon }}</v-icon></v-col
        ><v-divider vertical></v-divider
        ><v-col cols="7"
          ><v-card-title> {{ link.name }} </v-card-title
          ><v-card-title>{{ link.link }}</v-card-title></v-col
        >
        <v-divider vertical></v-divider>
        <v-col cols="3"> <QR :options="link.options" /> </v-col>
        <v-divider vertical />
        <v-col cols="1">
          <v-btn @click="deleteLink(link.id)" icon>
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
          <v-btn :href="link.link" target="_blank" icon>
            <v-icon>mdi-arrow-right-bold</v-icon>
          </v-btn>
          <!-- <v-btn to="/edit/" icon> <v-icon>mdi-pencil</v-icon> </v-btn> -->
        </v-col>
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
