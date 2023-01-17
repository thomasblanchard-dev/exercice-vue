<template>
  <q-page class="q-pa-lg">
    <q-pull-to-refresh @refresh="refresh">
      <div class="row q-gutter-lg">
        <dishe v-for="dishe in dishes" :key="dishe.id" :dishe="dishe" />

        <add-button @click="showFormDishe = true" />

        <q-dialog v-model="showFormDishe">
          <form-dishe :action="constants.ADD_DISHE" @close="showFormDishe = false" />
        </q-dialog>
      </div>
    </q-pull-to-refresh>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';
import { ADD_DISHE } from "../constants/actions";
import { TASKS_ACTIONS_ADD_DISHE, TASKS_ACTIONS_UPDATE_DISHE, TASKS_GETTERS_GET_DISHES } from "../constants/store/tasks";

export default {
  data() {
    return {
      showFormDishe: false,
      constants: {
        ADD_DISHE
      }
    };
  },
  methods: {
    refresh(done) {
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
  },
  computed: {
    ...mapGetters({
      dishes: TASKS_GETTERS_GET_DISHES
    })
  },
  components: {
    dishe: require("components/Dishe.vue").default,
    "add-button": require("components/AddButton.vue").default,
    "form-dishe": require("components/FormDishe.vue").default
  }
};
</script>
