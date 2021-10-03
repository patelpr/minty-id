<template>
  <v-container>
    <div v-if="links.length >= 1">
      <v-row v-for="link in links" :key="link.id"
        ><v-spacer /> <v-col cols="12" md="8"><LinkCard :link="link" /> </v-col
        ><v-spacer
      /></v-row>
    </div>
    <div v-else>
      <v-row :to="{ name: 'Add' }">
        <v-spacer></v-spacer>
        <v-col cols="12" md="6">
          <v-card
            ><v-card-title primary-title>
              Add Some links Here!
            </v-card-title>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </div>
  </v-container>
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
    this.id = this.$route.params.id;
    this.getLinks();
  },
  methods: {
    async getLinks() {
      try {
        await firebase
          .firestore()
          .collection("users")
          .doc(this.id)
          .collection("links")
          .onSnapshot((querySnapshot) => {
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
