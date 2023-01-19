import { store } from "quasar/wrappers";
import { createPinia } from "pinia";
import localStoragePlugin from "./plugins/localStorage";

// Importer votre module ici et l'ajouter au Store (ligne 19)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default store((/* { ssrContext } */) => {
  const pinia = createPinia();

  // You can add Pinia plugins here
  pinia.use(localStoragePlugin);

  return pinia;
});
