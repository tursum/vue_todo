<template>
  <main class="main">
    <div class="wall">
      <ul class="wall-records">
        <Record v-for="record in visibleRecords" :record="record" />
      </ul>
    </div>
  </main>
</template>

<script>
  import {computed} from 'vue';
  import {useStore} from 'vuex';

  import Record from './Record/';

  export default {
    name: 'Main',
    components: {
      Record
    },
    setup() {
      const store = useStore();

      const visibleRecords = computed(() => {
        return store.state.records;
      });

      return {
        visibleRecords
      }
    }
  }
</script>

<style scoped lang="sass">
  .main
    background-color: #ddd
    width: 100%

  .wall-records
    padding: 15px 30px
</style>