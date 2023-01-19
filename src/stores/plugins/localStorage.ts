import { PiniaPluginContext } from "pinia";
import {
  TASKS_STORAGE_KEY,
  ADD_DISHE,
  UPDATE_DISHE,
  DELETE_DISHE,
} from "../../constants/actions";

const localStoragePlugin = ({ store }: PiniaPluginContext) => {
  const tasksFromLocalStorage = localStorage.getItem(TASKS_STORAGE_KEY);

  if (tasksFromLocalStorage) {
    try {
      const parsedLocalStore = JSON.parse(tasksFromLocalStorage);
      store.loadDishes(parsedLocalStore);
    } catch (e) {
      console.log(e);
      console.error(
        "Les éléments du local storage sont corrompus, ils vont être supprimés."
      );
      localStorage.removeItem(TASKS_STORAGE_KEY);
    }
  }

  store.$onAction(({ name, after }) => {
    after(() => {
      switch (name) {
        case ADD_DISHE:
        case UPDATE_DISHE:
        case DELETE_DISHE:
          localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(store.$state));
          break;
      }
    });
  });
};

export default localStoragePlugin;
