<template>
  <q-page class="q-pa-lg">
    <q-pull-to-refresh @refresh="refresh">
      <div class="row q-gutter-lg">
        <Dishe v-for="dishe in dishes" :key="dishe.id" :dishe="dishe" />

        <AddButton @click="showFormDishe = true" />

        <q-dialog v-model="showFormDishe">
          <FormDishe :action="constants.ADD_DISHE" @close="showFormDishe = false" />
        </q-dialog>
      </div>
    </q-pull-to-refresh>
  </q-page>
</template>

<script setup>
import Dishe from '../components/Dishe.vue';
import FormDishe from '../components/FormDishe.vue';
import AddButton from '../components/AddButton.vue';
import { mapGetters, useStore } from 'vuex';
import { ADD_DISHE } from "../constants/actions";
import { TASKS_ACTIONS_ADD_DISHE, TASKS_ACTIONS_UPDATE_DISHE, TASKS_GETTERS_GET_DISHES } from "../constants/store/tasks";
import { computed, ref } from 'vue';

const showFormDishe = ref(false);
const constants = ref({
  ADD_DISHE
});

const store = useStore();

const dishes = computed(() => store.getters[TASKS_GETTERS_GET_DISHES]);

function refresh(done) {
  setTimeout(() => {
    // Add
    this.$store.dispatch(TASKS_ACTIONS_ADD_DISHE, {
      name: "Nouveau plat",
      description: null,
      note: 4,
      image: null
    });

    // Update 
    this.$store.dispatch(TASKS_ACTIONS_UPDATE_DISHE, {
      id: 3,
      image: "https://i.imgur.com/RbKjUjB.jpg",
      name: "[UPDATED] Petits choux",
      description:
          "Le chou de Bruxelles est une variété de chou, plante herbacée de la famille des Brassicaceae. C’est vraiement pas bon...",
      note: 2
    });
    done()
  } , 1000)
}
</script>
