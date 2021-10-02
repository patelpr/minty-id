<template>
  <v-card :href="link.link" target="_blank">
    <v-container>
      <v-row
        ><v-col cols="2" justify-space-between
          ><v-icon>{{ link.icon }}</v-icon></v-col
        ><v-divider vertical></v-divider
        ><v-col cols="10"
          ><v-card-title primary-title> {{ link.name }} </v-card-title
          ><v-card-subtitle>{{ link.link }}</v-card-subtitle></v-col
        >
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
