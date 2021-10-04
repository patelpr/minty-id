<template>
  <v-container>
    <QR :options="options" />
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
import QR from "../components/qr.vue";
export default {
  data() {
    return {
      links: [],
      id: "",
      options: {
        width: 300,
        height: 300,
        type: "svg",
        data: "http://mintyid.netlify.app",
        image: "/mintyqrcode.png",
        margin: 2,
        qrOptions: {
          typeNumber: 0,
          mode: "Byte",
          errorCorrectionLevel: "H",
        },
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: 0.2,
          margin: 0,
          crossOrigin: "anonymous",
        },
        dotsOptions: {
          color: "#fff",
          // gradient: {
          //   type: 'linear', // 'radial'
          //   rotation: 0,
          //   colorStops: [{ offset: 0, color: '#8688B2' }, { offset: 1, color: '#77779C' }]
          // },
          type:
            "rounded" /* 'rounded' 'dots' 'classy' 'classy-rounded' 'square' 'extra-rounded' */,
        },
        backgroundOptions: {
          color: "#0009",
          // gradient: {
          //   type: 'linear', // 'radial'
          //   rotation: 0,
          //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
          // },
        },
        cornersSquareOptions: {
          color: "#fff",
          type: "square" /*'dot' 'square' 'extra-rounded' */,
          // gradient: {
          //   type: 'linear', // 'radial'
          //   rotation: 180,
          //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
          // },
        },
        cornersDotOptions: {
          color: "#fff",
          type: "dot" /* 'dot' 'square' */,
          // gradient: {
          //   type: 'linear', // 'radial'
          //   rotation: 180,
          //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
          // },
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
