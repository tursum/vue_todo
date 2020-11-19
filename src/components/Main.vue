<template>
  <main class="main">
    <div class="wall">
      <button class="create-record-button" @click="createRecord">+</button>
      <ul class="wall-records" v-if="visibleRecords.length > 0">
        <Record v-for="record in visibleRecords.slice().reverse()" :record="record" :key="record.id" />
      </ul>
      <p class="wall-record-warn" v-else-if="isRecordsHere">Записи есть, но фильтр настроен слишком строго.</p>
      <p class="wall-record-warn" v-else>Записей нет. Чтобы создать новую, кликните на кнопку выше.</p>
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

      let visibleRecords = computed(() => {
        let records = store.state.records;
        let mode = store.state.mode;
        let colors = store.state.colors;

        if (mode == 'important') {
          records = records.filter(record => record.isImportant);
        }

        if (colors.length > 0) {
           records = records.filter(record => {
            let colorMatch = false;

            colors.forEach(color => {
              if (record.color == color) colorMatch = true;
            });

            return colorMatch;
          });
        }

        return records;
      });

      let isRecordsHere = computed(() => store.state.records.length > 0);

      function createRecord() {
        store.commit('createRecord', store.state.mode == 'important');
      }

      return {
        visibleRecords,
        createRecord,
        isRecordsHere
      }
    }
  }
</script>

<style scoped lang="sass">
  .main
    width: 100%

  .wall-records
    padding: 0 30px
    @media (max-width: 767px)
      padding: 0

  .create-record-button
    border: 1px solid #ddd
    background-color: #fff
    width: 150px
    height: 40px
    font-size: 24px
    margin: 15px auto
    display: block
    cursor: pointer

  .wall-record-warn
    text-align: center
</style>