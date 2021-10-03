<template>
  <v-card :href="link.link" target="_blank">
    <v-container>
      <v-row
        ><v-col cols="2"
          ><v-icon x-large>{{ link.icon }}</v-icon></v-col
        ><v-divider vertical></v-divider
        ><v-col cols="8"
          ><v-card-title> {{ link.name }} </v-card-title
          ><v-card-title>{{ link.link }}</v-card-title></v-col
        >
        <v-divider vertical></v-divider>
        <v-col cols="2"> QR CODE </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: ["link"],
};
</script>

<style></style>
