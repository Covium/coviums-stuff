// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import vue from "eslint-plugin-vue";

export default withNuxt({
  rules: {
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "always",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
  },
  plugins: {
    vue,
  },
});
