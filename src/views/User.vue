<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" md="6">
        <v-card
          ><v-card-title primary-title> Your Account's QR Code </v-card-title>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <QR :options="options" :down="true" />
    <div v-if="links.length >= 1">
      <v-row v-for="link in links" :key="link.id"
        ><v-spacer /> <v-col cols="12" md="8"><LinkCard :link="link" /> </v-col
        ><v-spacer
      /></v-row>
    </div>
    <div v-else>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="12" md="6">
          <v-card to="/"
            ><v-card-title primary-title> Add Some links Here! </v-card-title>
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
import QR from "../components/qr.vue";
export default {
  data() {
    return {
      links: [],
      id: "",
      options: {
        width: 300,
        height: 300,
        type: "canvas",
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
          imageSize: 0.2,
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
    };
  },
  components: {
    LinkCard,
    QR,
  },
  created() {
    this.id = this.$route.params.id;
    this.options.data = "https://minty.id/#/user/" + this.id;
    this.getLinks();
  },
  methods: {
    async getLinks() {
      this.links = [];
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
