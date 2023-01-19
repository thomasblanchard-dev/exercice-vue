<template>
  <q-card class="form-card">
    <q-form ref="form" @submit="onSubmit">
      <q-card-section>
        <div class="text-h6 heading">{{ action }} Plat</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-mb-md">
          <q-input 
            filled 
            v-model="dishe.name" 
            label="Nom (Burger)" 
            class="col" 
            lazy-rules="ondemand"
            :rules="[
              val => val && val.length > 0 || 'Le nom de votre plat est obligatoire',
              val => val.length <= 20 || 'Le nom de votre plat est limité à 20 caractères'
            ]" 
          />
        </div>

        <div class="row q-mb-md">
          <q-input
            filled
            v-model="dishe.description"
            label="Description"
            type="textarea"
            class="col"
            lazy-rules="ondemand"
            :rules="[
              val => val.length <= 135 || 'Le description de votre plat est limité à 135 caractères'
            ]" 
          />
        </div>

        <div class="row q-mb-md">
          <q-input
            filled
            v-model="dishe.image"
            label="URL de l'image"
            class="col"
          />
          <q-img
            :src="dishe.image ? dishe.image : 'image-placeholder.png'"
            class="q-ml-sm"
            contain
          />
        </div>

        <div class="q-mb-md">
          <div class="row">
            <p class="q-mb-none">Note:</p>
          </div>
          <div class="row">
            <q-rating v-model="dishe.note" size="2em" color="orange" />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn type="reset" label="Annuler" color="grey" v-close-popup />
        <q-btn type="submit" label="Sauver" color="primary"/>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ADD_DISHE, UPDATE_DISHE } from '../constants/actions';
import { TASKS_ACTIONS_ADD_DISHE, TASKS_ACTIONS_UPDATE_DISHE, TASKS_GETTERS_GET_NEW_DISHE_ID } from '../constants/store/tasks';
import { useStore } from 'vuex';
import { Dishe } from '../types/dishe';

const props = defineProps<{
  action: typeof ADD_DISHE | typeof UPDATE_DISHE;
  item?: Dishe;
}>();

const emit = defineEmits(['close']);
const store = useStore();
    
if (props.action === UPDATE_DISHE && !props.item) {
  throw `Erreur : item est obligatoire pour utiliser le composant FormDishe avec l'action ${UPDATE_DISHE}`;
}

const form = ref<{value: {validate: () => boolean}} | null>(null);
const dishe = ref<Dishe>(props.action === UPDATE_DISHE 
  ? {...props.item as Dishe} 
  : {
    id: store.getters[TASKS_GETTERS_GET_NEW_DISHE_ID],
    name: "",
    description: "",
    note: 1,
    image: ""
  });

async function onSubmit() {
  let isValid = false;

  if(form !== null) {
    isValid = await form.value.validate();
  }
  if(isValid) {
    if (props.action === ADD_DISHE) store.dispatch(TASKS_ACTIONS_ADD_DISHE, dishe.value);
    if (props.action === UPDATE_DISHE) store.dispatch(TASKS_ACTIONS_UPDATE_DISHE, dishe.value);
    emit('close');
  }
}
</script>

<style>
.form-card {
  min-width: 400px;
}
.form-card .heading {
  text-transform: capitalize;
}
.form-card .q-card-section {
  width: 100%;
}
.thumbnail {
  max-width: 50px;
  max-height: 50px;
}
.form-card .q-img {
  height: 56px;
  width: 56px;
  border-radius: 10px;
}
.form-card .q-img__image {
  background-size: cover !important;
}
.form-card .q-rating__icon {
  opacity: 0.2;
}
.form-card .q-rating__icon--active {
  opacity: 1;
}
</style>
