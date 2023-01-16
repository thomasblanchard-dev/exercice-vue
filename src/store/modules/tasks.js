import { ADD_DISHE, DELETE_DISHE } from "../../constants/actions";
import { TASKS_GETTERS_GET_NEW_DISHE_ID } from "../../constants/store/tasks";


export const tasks = {
    namespaced: true,
    state: {
        dishes: [
            {
                id: 1,
                image: "https://i.imgur.com/0umadnY.jpg",
                name: "Burger",
                description:
                    "Un hamburger est un sandwich composé d'une ou plusieurs tranches de viande hachée, généralement du bœuf, placées dans un petit pain ou une brioche.",
                note: 4
            },
            {
                id: 2,
                image: "https://i.imgur.com/b9zDbyb.jpg",
                name: "Pizza",
                description:
                    "La pizza est un plat savoureux d'origine italienne, consistant en une base généralement ronde et aplatie de pâte levée à base de blé.",
                note: 5
            },
            {
                id: 3,
                image: "https://i.imgur.com/RbKjUjB.jpg",
                name: "Petits choux",
                description:
                    "Le chou de Bruxelles est une variété de chou, plante herbacée de la famille des Brassicaceae. C’est vraiement pas bon...",
                note: 1
            },
            {
                id: 4,
                image: "https://i.imgur.com/xAuhNVg.jpg",
                name: "BBQ Ribs",
                description:
                    "Les BBQ ribs ou barbecue ribs sont des grands classiques très appréciés partout dans le monde.",
                note: 5
            }
        ],
    },
    getters: {
        getDishes: state => state.dishes,
        getNewDisheId: state => state.dishes.length === 0 ? 1 : (Math.max(...state.dishes.map(d => d.id)) + 1)
    },
    mutations: {
        [ADD_DISHE](state, dishe) {
            state.dishes.push({ ...dishe, id: this.getters[TASKS_GETTERS_GET_NEW_DISHE_ID] })
        },
        [DELETE_DISHE](state, disheId) {
            state.dishes = state.dishes.filter(d => d.id != disheId)
        }
    },
    actions: {
        [ADD_DISHE]({ commit }, dishe) {
            commit(ADD_DISHE, dishe);
        },
        [DELETE_DISHE]({ commit }, disheId) {
            commit(DELETE_DISHE, disheId);
        }
    }
};