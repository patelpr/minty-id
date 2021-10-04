<template>
  <v-container>
    <v-row><AddCard /></v-row
  ></v-container>
</template>

<script>
import AddCard from "../components/AddCard.vue";
export default {
  components: {
    AddCard,
  },
  data() {
    return {
      options: {
        width: 200,
        height: 200,
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
    };
  },
};
</script>

<style></style>
