import { defineStore } from "pinia";
import { Dishe } from "../../types/dishe";
import { computed, ref } from "vue";

const initialDishes: Dishe[] = [
  {
    id: 1,
    image: "https://i.imgur.com/0umadnY.jpg",
    name: "Burger",
    description:
      "Un hamburger est un sandwich composé d'une ou plusieurs tranches de viande hachée, généralement du bœuf, placées dans un petit pain ou une brioche.",
    note: 4,
  },
  {
    id: 2,
    image: "https://i.imgur.com/b9zDbyb.jpg",
    name: "Pizza",
    description:
      "La pizza est un plat savoureux d'origine italienne, consistant en une base généralement ronde et aplatie de pâte levée à base de blé.",
    note: 5,
  },
  {
    id: 3,
    image: "https://i.imgur.com/RbKjUjB.jpg",
    name: "Petits choux",
    description:
      "Le chou de Bruxelles est une variété de chou, plante herbacée de la famille des Brassicaceae. C’est vraiement pas bon...",
    note: 1,
  },
  {
    id: 4,
    image: "https://i.imgur.com/xAuhNVg.jpg",
    name: "BBQ Ribs",
    description:
      "Les BBQ ribs ou barbecue ribs sont des grands classiques très appréciés partout dans le monde.",
    note: 5,
  },
];

export const useTasksStore = defineStore("tasks", () => {
  // State
  const dishes = ref(initialDishes);

  // Getters
  const getDishes = computed((state) => dishes.value);
  const getNewDisheId = computed((state) =>
    dishes.value.length === 0
      ? 1
      : Math.max(...dishes.value.map((d) => d.id)) + 1
  );

  // Actions

  function loadDishes(state: { dishes: Dishe[] }) {
    dishes.value = state.dishes;
  }
  function addDishe(dishe: Dishe) {
    dishes.value.push(dishe);
  }
  function updateDishe(dishe: Dishe) {
    const toUpdate = dishes.value.find((d) => d.id === dishe.id);
    if (toUpdate) {
      Object.assign(toUpdate, dishe);
    }
  }
  function deleteDishe(disheId: number) {
    dishes.value = dishes.value.filter((d) => d.id != disheId);
  }

  return {
    dishes,
    getDishes,
    getNewDisheId,
    deleteDishe,
    addDishe,
    updateDishe,
    loadDishes,
  };
});
