<template>
  <v-container
    ><v-row v-for="link in links" :key="link.id"
      ><v-spacer /> <v-col cols="12" md="4"><LinkCard :link="link" /> </v-col
      ><v-spacer /></v-row
  ></v-container>
</template>

<script>
import firebase from "firebase";
import LinkCard from "../components/LinkCard.vue";
export default {
  data() {
    return {
      links: [],
      id: "",
    };
  },
  components: {
    LinkCard,
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.id = user;
      }
    });
    console.log(this.id);
  },
  methods: {
    async getLinks() {
      try {
        await firebase
          .firestore()
          .collection("users")
          .doc(this.id.id)
          .collection("links")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              let tempDoc = doc.data();
              tempDoc.id = doc.id;
              this.links.push(tempDoc);
            });
          });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style></style>
