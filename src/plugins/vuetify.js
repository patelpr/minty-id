import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    light: {
      primary: "#1f4563",
      secondary: "#1f4563",
      accent: "#7ed957",
      error: "#ffeb3b",
      warning: "#f44336",
      info: "#4caf50",
      success: "#607d8b",
    },
    // dark: {
    //   primary: "#7ed957",
    //   secondary: "#1f4563",
    //   accent: "#7ed957",
    //   error: "#ffeb3b",
    //   warning: "#f44336",
    //   info: "#4caf50",
    //   success: "#607d8b",
    // },
  },
});
