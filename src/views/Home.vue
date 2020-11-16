<template>
  <div class="home">
    <p>Count: {{count}}, double: {{double}}</p>
    <button @click="increment"></button>
    <Sample />
  </div>
</template>

<script>

import {ref, computed, onMounted} from 'vue';
import Sample from '@/components/Sample';

export default {
  name: 'Home',
  components: {
    Sample
  },
  setup() {
    const count = ref(0);
    const double = computed(() => count.value * 2);

    function increment() {
      count.value++;
    }

    onMounted(() => console.log('mounted'));

    return {
      count,
      double,
      increment
    }
  }
}
</script>