<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3"> </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-toolbar color="primary"
            ><v-spacer></v-spacer>
            <h2>Add A Link</h2>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-row
            ><v-col cols="12" md="6">
              <v-form class="pa-5">
                <v-text-field
                  label="Link URL"
                  v-model="link.link"
                  :rules="[
                    (v) => !!v || 'Need a link!',
                    (v) =>
                      /^http:\/\/|^https:\/\//gi.test(v) ||
                      'Needs to have http:// at the beginning',
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
            </v-col>
            <v-col cols="12" md="6">
              <v-container>
                <qrcode-vue
                  :value="link.link"
                  renderAs="svg"
                  size="200"
                  level="H"
                  background="#fff"
                  :foreground="link.qr.fore"
                ></qrcode-vue
                ><v-divider />
                <v-color-picker
                  hide-inputs
                  v-model="link.qr.fore"
                ></v-color-picker>
              </v-container>
            </v-col>
          </v-row>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false">Close</v-btn>
            <v-btn color="primary" @click="addLink()">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="3"> </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */

import firebase from "firebase";
import QrcodeVue from "qrcode.vue";
export default {
  data() {
    return {
      link: {
        qr: {
          fore: "#000",
          back: "#fff",
        },
      },
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
      this.user = user ? user : null;
    });
  },
  components: {
    QrcodeVue,
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
