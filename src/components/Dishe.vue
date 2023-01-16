<template>
  <q-card class="card">
    <q-img :src="dishe.image" basic contain>
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

    <q-card-section>
      {{ dishe.description }}
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
      <form-dishe action="modifier" />
    </q-dialog>
  </q-card>
</template>

<script>
import { TASKS_ACTIONS_DELETE_DISHE } from "../constants/store/tasks";

export default {
  props: ["dishe"],
  data() {
    return {
      showDeleteConfirmationDialog: false,
      showFormDishe: false
    };
  },
  methods: {
    deleteDishe() {
      this.$store.dispatch(TASKS_ACTIONS_DELETE_DISHE, this.dishe.id)
    }
  },
  components: {
    "form-dishe": require("components/FormDishe.vue").default
  }
};
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
