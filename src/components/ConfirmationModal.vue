<template>
    <q-card>
        <q-card-section>
            {{content}}
        </q-card-section>
        <q-card-actions align="right">
            <q-btn flat :label="cancelText" color="primary" v-close-popup />
            <q-btn flat :label="confirmText" color="primary" v-close-popup @click="$emit('confirm')" />
        </q-card-actions>
    </q-card>
</template>

<script setup lang="ts">
  defineProps(['content', 'confirmText', 'cancelText']);
  defineEmits(['confirm']);
</script>