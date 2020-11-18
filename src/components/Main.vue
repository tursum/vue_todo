<template>
  <main class="main">
    <div class="wall">
      <button class="create-record-button" @click="createRecord">+</button>
      <ul class="wall-records">
        <Record v-for="record in visibleRecords" :record="record" :key="record.id" />
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

      function createRecord() {
        store.commit('createRecord');
      }

      return {
        visibleRecords,
        createRecord
      }
    }
  }
</script>

<style scoped lang="sass">
  .main
    width: 100%

  .wall-records
    padding: 0 30px

  .create-record-button
    border: 1px solid #ddd
    background-color: #fff
    width: 150px
    height: 40px
    font-size: 24px
    margin: 15px auto
    display: block
    cursor: pointer
</style>