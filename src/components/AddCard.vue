<template>
  <v-dialog persistent transition="dialog-bottom-transition" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark fab large v-bind="attrs" v-on="on" icon
        ><v-icon>mdi-plus</v-icon></v-btn
      >
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark
          ><v-spacer></v-spacer>
          <h2>Add A Link</h2>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-form class="pa-5">
          <v-text-field
            label="Link URL"
            v-model="link.link"
            :rules="[
              (v) => !!v || 'Need a link!',
              (v) =>
                /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi.test(
                  v
                ) || 'Gotta be a link though.',
            ]"
            required
          >
          </v-text-field>
          <v-text-field
            label="Link Name"
            v-model="link.name"
            :rules="[(v) => !!v || 'What is this link called?']"
            required
          >
          </v-text-field>

          <v-combobox
            clearable
            label="Category"
            :items="categories"
          ></v-combobox>
          <v-combobox
            :items="icons"
            v-model="link.icon"
            label="Link Icon"
            :prepend-icon="link.icon"
            single-line
          ></v-combobox>
        </v-form>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog.value = false">Close</v-btn>
          <v-btn color="primary" @click="addLink()">Add</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      link: {},
      user: null,
      categories: ["Social Media", "Business", "Affiliate", "Personal"],
      icons: [
        "mdi-facebook",
        "mdi-facebook-messenger",
        "mdi-facebook-workplace",
        "mdi-google-plus",
        "mdi-linkedin",
        "mdi-microsoft-xbox",
        "mdi-reddit",
        "mdi-twitch",
        "mdi-twitter",
        "mdi-youtube",
      ],
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    });
  },

  methods: {
    async addLink() {
      try {
        await firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("links")
          .add(this.link);
      } catch (error) {
        console.error(error);
      }
      this.link = {};
    },
  },
};
</script>

<style></style>
