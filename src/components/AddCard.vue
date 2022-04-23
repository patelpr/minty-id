<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="pb-7 mb-15" flat>
          <v-toolbar dark color="#1f4563" flat
            ><v-spacer></v-spacer>
            <h2 v-if="user">Add A Link</h2>
            <h2 v-else>Make a QR Code</h2>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-row>
            <v-spacer></v-spacer>

            <v-col cols="12" md="6">
              <v-container>
                <v-card-subtitle>
                  <b>Customize your QR</b>
                </v-card-subtitle>
                <v-form class="pa-5">
                  <v-text-field
                    label="Link URL"
                    persistent-hint
                    hint="http://facebook.com/account"
                    v-model="link.link"
                    @blur="
                      (e) => (
                        (link.options.data =
                          link.link || 'http://mintyid.netlify.app'),
                        log(e)
                      )
                    "
                    :rules="[
                      (v) => !!v || 'Need a link!',
                      (v) =>
                        /^http:\/\/|^https:\/\//gi.test(v) ||
                        'Needs to have http://',
                    ]"
                    required
                  >
                  </v-text-field>

                  <v-text-field
                    label="Link Name"
                    hint="Facebook / Twitter / TikTok..etc"
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
                  <v-switch
                    v-model="link.options.image"
                    label="Logo"
                    value="/mintyqrcode.png"
                  ></v-switch>
                </v-form>

                <v-divider class="mb-10" />
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="4">
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
                    <v-col cols="12" sm="4">
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
                    <v-col cols="12" sm="4">
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
                    <v-col cols="12" sm="4">
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
                    <v-col cols="12" sm="4">
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
                    <v-col cols="12" sm="4">
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
                </v-container>
              </v-container>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" md="6">
              <v-container fill-height fluid>
                <v-row>
                  <v-col
                    ><v-row align="center" justify="center"
                      ><QR :options="link.options" /></v-row
                  ></v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
          <v-card-actions v-if="user">
            <v-btn color="#7ed957" block :disabled="!user" @click="addLink()"
              ><b>Add</b></v-btn
            >
          </v-card-actions>
          <div v-else>
            <Auth />
            <h4>You will need to sign it to save it!</h4>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Auth from "../components/Auth.vue";

import firebase from "firebase";
import QRCodeStyling from "qr-code-styling";
import QR from "./QR.vue";

export default {
  data() {
    return {
      qrCode: new QRCodeStyling(this.options),
      link: {
        options: {
          width: 300,
          height: 300,
          type: "svg",
          data: "http://mintyid.netlify.app",
          image: "/mintyqrcode.png",
          margin: 0,
          qrOptions: {
            typeNumber: 0,
            mode: "Byte",
            errorCorrectionLevel: "Q",
          },
          imageOptions: {
            hideBackgroundDots: true,
            imageSize: 0.4,
            margin: 0,
            crossOrigin: "anonymous",
          },
          dotsOptionsHelper: {
            colorType: { single: true, gradient: false },
            gradient: {
              linear: true,
              radial: false,
              color1: "#6a1a4c",
              color2: "#6a1a4c",
              rotation: "0",
            },
          },
          dotsOptions: {
            color: "#1f4563",
            type: "rounded" /* 'rounded' 'dots' 'classy' 'classy-rounded' 'square' 'extra-rounded' */,
          },
          backgroundOptions: {
            color: "#ffffff",
          },
          cornersSquareOptions: {
            color: "#1f4563",
            type: "square" /*'dot' 'square' 'extra-rounded' */,
          },
          cornersSquareOptionsHelper: {
            colorType: { single: true, gradient: false },
            gradient: {
              linear: true,
              radial: false,
              color1: "#000000",
              color2: "#000000",
              rotation: "0",
            },
          },
          cornersDotOptionsHelper: {
            colorType: { single: true, gradient: false },
            gradient: {
              linear: true,
              radial: false,
              color1: "#000000",
              color2: "#000000",
              rotation: "0",
            },
          },
          cornersDotOptions: {
            color: "#1f4563",
            type: "dot" /* 'dot' 'square' */,
          },
          backgroundOptionsHelper: {
            colorType: { single: true, gradient: false },
            gradient: {
              linear: true,
              radial: false,
              color1: "#ffffff",
              color2: "#ffffff",
              rotation: "0",
            },
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
    Auth,
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
        this.$router.push("/user/" + firebase.auth().currentUser.uid);
      }
    },
  },
};
</script>

<style></style>
