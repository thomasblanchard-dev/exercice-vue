import Vuex from "vuex";
import localStoragePlugin from "../plugins/localStorage";
import { tasks } from "./modules/tasks";

// Importer votre module ici et l'ajouter au Store (ligne 19)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      tasks,
    },

    plugins: [localStoragePlugin],

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
