<template>
  <q-card class="card">
    <q-img :src="dishe.image || 'image-placeholder.png'" basic contain>
      <div class="absolute-bottom text-h6">
        {{ dishe.name }}
      </div>
    </q-img>

    <q-card-section>
      <q-rating
        :model-value="dishe.note"
        size="2em"
        color="orange"
        readonly
        class="q-mt-sm"
      />
    </q-card-section>

    <q-card-section :class="!dishe.description ? 'text-italic' : ''">
      {{ dishe.description || "Aucune description fournie" }}
    </q-card-section>

    <q-card-actions class="absolute-bottom" align="right">
      <q-btn @click="showFormDishe = true" icon="edit" color="blue" flat
        >Modifier</q-btn
      >
      <q-btn @click="showDeleteConfirmationDialog = true" icon="delete" color="red" flat>Supprimer</q-btn>
    </q-card-actions>

    <q-dialog v-model="showDeleteConfirmationDialog">
      <ConfirmationModal 
        content="Êtes-vous sûr de vouloir retirer ce plat ?"
        @confirm="deleteDishe"
        confirmText="Confimer"
        cancelText="Annuler"/>
    </q-dialog>


    <q-dialog v-model="showFormDishe">
      <FormDishe :action="updateAction" :item="dishe" @close="showFormDishe = false" />
    </q-dialog>
  </q-card>
</template>

<script setup lang="ts">
import { UPDATE_DISHE } from '../constants/actions';
import FormDishe from "components/FormDishe.vue";
import ConfirmationModal from "./ConfirmationModal.vue";
import { ref } from 'vue';
import { Dishe } from '../types/dishe';
import { useTasksStore } from 'src/stores/modules/tasks';

const taskStore = useTasksStore();
const props = defineProps<{
  dishe: Dishe
}>();
const showDeleteConfirmationDialog = ref(false);
const showFormDishe = ref(false);
const updateAction = ref<typeof UPDATE_DISHE>(UPDATE_DISHE);

function deleteDishe() {
  taskStore.deleteDishe(props.dishe.id)
}
</script>

<style>
.card {
  min-height: 400px;
  max-width: 250px;
  width: 250px;
  transition: background 0.3s;
}
.card-clickable {
  cursor: pointer;
}
.card-clickable:hover {
  background: #bdbdbd !important;
}
.card .q-img {
  max-height: 180px;
}
.card .q-img__image {
  background-size: cover !important;
}
.card .q-rating__icon {
  opacity: 0.2;
}
.card .q-rating__icon--active {
  opacity: 1;
}
</style>
