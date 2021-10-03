<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-15">
          <v-toolbar color="primary"
            ><v-spacer></v-spacer>
            <h2>Add A Link</h2>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-row>
            <v-col cols="12" md="6">
              <v-container>
                <v-card-subtitle>
                  <b>Customize your QR</b>
                </v-card-subtitle>
                <QR :options="link.options" />
                <v-divider class=" mb-4" />

                <v-row>
                  <v-col cols="4">
                    <template>
                      <v-row align="center">
                        <v-col cols="12">
                          <v-select
                            :items="[
                              'rounded',
                              'dots',
                              'classy',
                              'classy-rounded',
                              'square',
                              'extra-rounded',
                            ]"
                            v-model="link.options.dotsOptions.type"
                            :menu-props="{ bottom: true, offsetY: true }"
                            label="Dots Type"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </template>
                  </v-col>
                  <v-col cols="4">
                    <template>
                      <v-row align="center">
                        <v-col cols="12">
                          <v-select
                            v-model="link.options.cornersSquareOptions.type"
                            :items="['dot', 'square', 'extra-rounded']"
                            :menu-props="{ bottom: true, offsetY: true }"
                            label="Corner Square Type"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </template>
                  </v-col>
                  <v-col cols="4">
                    <template>
                      <v-row align="center">
                        <v-col cols="12">
                          <v-select
                            :items="['dot', 'square']"
                            v-model="link.options.cornersDotOptions.type"
                            :menu-props="{ bottom: true, offsetY: true }"
                            label="Corner Dot Type"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </template>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <v-menu offset-y>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          :color="link.options.dotsOptions.color"
                          fab
                          v-on="on"
                        >
                        </v-btn>
                      </template>
                      <v-color-picker
                        v-model="link.options.dotsOptions.color"
                        hide-inputs
                      ></v-color-picker>
                    </v-menu>
                    <v-card-text>Dots Color</v-card-text>
                  </v-col>
                  <v-col cols="4">
                    <v-menu offset-y>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          :color="link.options.cornersSquareOptions.color"
                          fab
                          v-on="on"
                        >
                        </v-btn>
                      </template>
                      <v-color-picker
                        v-model="link.options.cornersSquareOptions.color"
                        hide-inputs
                      ></v-color-picker>
                    </v-menu>
                    <v-card-text>Corner Square Color</v-card-text>
                  </v-col>
                  <v-col cols="4">
                    <v-menu offset-y>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          :color="link.options.cornersDotOptions.color"
                          fab
                          v-on="on"
                        >
                        </v-btn>
                      </template>
                      <v-color-picker
                        v-model="link.options.cornersDotOptions.color"
                        hide-inputs
                      ></v-color-picker>
                    </v-menu>
                    <v-card-text> Corner Dots Color</v-card-text>
                  </v-col>
                </v-row>
              </v-container> </v-col
            ><v-col cols="12" md="6">
              <v-form class="pa-5">
                <v-text-field
                  label="Link URL"
                  persistent-hint
                  hint="http://facebook.com/account"
                  v-model="link.link"
                  @blur="(e) => ((link.options.data = link.link), log(e))"
                  :rules="[
                    (v) => !!v || 'Need a link!',
                    (v) =>
                      /^http:\/\/|^https:\/\//gi.test(v) ||
                      'Needs to have http:// at the beginning',
                  ]"
                  required
                >
                </v-text-field>
                <!-- 
                <v-text-field
                  label="Link Logo"
                  persistent-hint
                  hint="Get the favicon link to the website you are adding"
                  v-model="link.options.image"
                >
                </v-text-field> -->

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
          </v-row>
          <v-card-actions>
            <v-btn color="primary" @click="addLink()">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */

import ColorPicker from "./ColorPicker.vue";
import firebase from "firebase";
import QRCodeStyling from "qr-code-styling";
import QR from "./qr.vue";
import axios from "axios";

export default {
  data() {
    return {
      qrCode: new QRCodeStyling(this.options),
      link: {
        options: {
          width: 175,
          height: 175,
          type: "svg",
          data: "http://mintyid.netlify.app",
          image: "",
          margin: 2,
          qrOptions: {
            typeNumber: 0,
            mode: "Byte",
            errorCorrectionLevel: "H",
          },
          imageOptions: {
            hideBackgroundDots: true,
            imageSize: 0.4,
            margin: 0,
            crossOrigin: "anonymous",
          },
          dotsOptions: {
            color: "#41b583",
            // gradient: {
            //   type: 'linear', // 'radial'
            //   rotation: 0,
            //   colorStops: [{ offset: 0, color: '#8688B2' }, { offset: 1, color: '#77779C' }]
            // },
            type:
              "rounded" /* 'rounded' 'dots' 'classy' 'classy-rounded' 'square' 'extra-rounded' */,
          },
          backgroundOptions: {
            color: "#ffffff",
            // gradient: {
            //   type: 'linear', // 'radial'
            //   rotation: 0,
            //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
            // },
          },
          cornersSquareOptions: {
            color: "#35495E",
            type: "extra-rounded" /*'dot' 'square' 'extra-rounded' */,
            // gradient: {
            //   type: 'linear', // 'radial'
            //   rotation: 180,
            //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
            // },
          },
          cornersDotOptions: {
            color: "#35495E",
            type: "dot" /* 'dot' 'square' */,
            // gradient: {
            //   type: 'linear', // 'radial'
            //   rotation: 180,
            //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
            // },
          },
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
    QR,
    ColorPicker,
  },
  methods: {
    log(e) {
      console.log(e);
    },
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
      } finally {
        this.link = {};
        this.$router.push("/");
      }
    },
  },
};
</script>

<style></style>
