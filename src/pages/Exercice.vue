<template>
  <q-page class="q-pa-lg">
    <q-pull-to-refresh @refresh="refresh">
      <div class="row q-gutter-lg">
        <Dishe v-for="dishe in taskStore.dishes" :key="dishe.id" :dishe="dishe" />

        <AddButton @click="showFormDishe = true" />

        <q-dialog v-model="showFormDishe">
          <FormDishe :action="constants.ADD_DISHE" @close="showFormDishe = false" />
        </q-dialog>
      </div>
    </q-pull-to-refresh>
  </q-page>
</template>

<script setup lang="ts">
import Dishe from '../components/Dishe.vue';
import FormDishe from '../components/FormDishe.vue';
import AddButton from '../components/AddButton.vue';
import { ADD_DISHE } from "../constants/actions";
import { ref } from 'vue';
import { useTasksStore } from '../stores/modules/tasks';

const showFormDishe = ref(false);
const constants = ref({
  ADD_DISHE
});

const taskStore = useTasksStore();

function refresh(done: () => void) {
  setTimeout(() => {
    // Add
    taskStore.addDishe({
      id: taskStore.getNewDisheId,
      name: "Nouveau plat",
      description: '',
      note: 4,
      image: ''
    });

    // Update 
    taskStore.updateDishe({
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
