<script setup lang="ts">
import { ref } from 'vue';
 
const title = 'Hola Vue';
const count = ref(0);
 
function increment() {
  count.value++;
}
</script>
 
<template>
  <div class="card">
    <h2>{{ title }}</h2>
    <button @click="increment">Contador: {{ count }}</button>
  </div>
</template>
 
<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 1rem;
}
</style>