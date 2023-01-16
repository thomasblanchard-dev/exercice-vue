import { TASKS_ACTIONS_LOAD_DISHES, TASKS_MUTATIONS_ADD_DISHE, TASKS_MUTATIONS_DELETE_DISHE, TASKS_MUTATIONS_UPDATE_DISHE, TASKS_STORAGE_KEY } from "../constants/store/tasks";

const localStoragePlugin = (store) => {

    const tasksFromLocalStorage = localStorage.getItem(TASKS_STORAGE_KEY);

    if (tasksFromLocalStorage) {
        try {
            const parsedLocalStore = JSON.parse(tasksFromLocalStorage);
            store.dispatch(TASKS_ACTIONS_LOAD_DISHES, parsedLocalStore);
        } catch (e) {
            console.log(e);
            console.error('Les éléments du local storage sont corrompus, ils vont être supprimés.');
            localStorage.removeItem(TASKS_STORAGE_KEY);
        }
    }

    store.subscribe((mutation, state) => {
        switch (mutation.type) {
            case TASKS_MUTATIONS_ADD_DISHE:
            case TASKS_MUTATIONS_UPDATE_DISHE:
            case TASKS_MUTATIONS_DELETE_DISHE:
                localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.tasks));
                break;
        }
    });
}

export default localStoragePlugin;