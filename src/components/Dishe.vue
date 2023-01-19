<template>
  <q-card class="card">
    <q-img :src="dishe.image || 'image-placeholder.png'" basic contain>
      <div class="absolute-bottom text-h6">
        {{ dishe.name }}
      </div>
    </q-img>

    <q-card-section>
      <q-rating
        :value="dishe.note"
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
      <q-card>
        <q-card-section>
          Êtes-vous sûr de vouloir retirer ce plat ?
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" v-close-popup />
          <q-btn flat label="Valider" color="primary" v-close-popup @click="deleteDishe" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showFormDishe">
      <formDishe :action="constants.UPDATE_DISHE" :item="dishe" @close="showFormDishe = false" />
    </q-dialog>
  </q-card>
</template>

<script setup>
import { UPDATE_DISHE } from '../constants/actions';
import { TASKS_ACTIONS_DELETE_DISHE } from "../constants/store/tasks";
import { useStore } from 'vuex';
import formDishe from "components/FormDishe.vue";
import { ref } from '@vue/reactivity';

const store = useStore();
const props = defineProps(["dishe"]);
const showDeleteConfirmationDialog = ref(false);
const showFormDishe = ref(false);
const constants = ref({
  UPDATE_DISHE
});

function deleteDishe() {
  store.dispatch(TASKS_ACTIONS_DELETE_DISHE, props.dishe.id)
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
