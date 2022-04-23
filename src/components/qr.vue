<template>
  <span>
    <div id="qr-code" ref="qrCode"></div>
    <div>
      <v-btn class="mb-3" v-if="down" v-on:click="download">Download</v-btn>
    </div>
  </span>
</template>

<script>
import QRCodeStyling from "qr-code-styling";

export default {
  mounted: function () {
    this.qrCode.append(this.$refs["qrCode"]);
  },
  watch: {
    ["options.data"]: function () {
      this.qrCode.update(this.options);
    },
    ["options.image"]: function () {
      this.qrCode.update(this.options);
    },
    ["options.dotsOptions.color"]: function () {
      this.qrCode.update(this.options);
    },
    ["options.cornersSquareOptions.color"]: function () {
      this.qrCode.update(this.options);
    },
    ["options.cornersDotOptions.color"]: function () {
      this.qrCode.update(this.options);
    },
    ["options.dotsOptions.type"]: function () {
      this.qrCode.update(this.options);
    },
    ["options.cornersSquareOptions.type"]: function () {
      this.qrCode.update(this.options);
    },
    ["options.cornersDotOptions.type"]: function () {
      this.qrCode.update(this.options);
    },
  },
  props: {
    keyRender: {
      type: Number,
    },
    options: {
      type: Object,
    },
    down: {
      type: Boolean,
    },
  },

  data() {
    return {
      qrCode: new QRCodeStyling(this.options),
      extension: "png",
    };
  },
  methods: {
    download() {
      this.down && this.qrCode.download({ extension: this.extension });
    },
  },
};
</script>

<style></style>
