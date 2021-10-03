<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn :color="color" fab v-on="on"> </v-btn>
    </template>
    <v-color-picker
      v-model="color"
      hide-inputs
      @change="(e) => $emit('colorChange', e)"
    ></v-color-picker>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      color: "#41b583",
    };
  },
};
</script>

<style></style>
