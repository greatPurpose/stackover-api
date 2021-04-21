import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "@/assets/scss/material-kit.scss";
import globalMixins from "./globalMixins";
import VueLazyload from "vue-lazyload";

export default {
  install(Vue) {
    Vue.use(VueMaterial);
    Vue.use(globalMixins);
    Vue.use(VueLazyload, {
      observer: true,
      // optional
      observerOptions: {
        rootMargin: "0px",
        threshold: 0.1
      }
    });
  }
};
