<template>
  <aside class="sidebar">

    <ul class="modes-list">
      <li><a href="#" @click="changeMode('all')" class="mode-option" :class="{active: mode == 'all'}">Все</a></li>
      <li><a href="#" @click="changeMode('important')" class="mode-option" :class="{active: mode == 'important'}">Важные</a></li>
    </ul>

    <ul class="filters">
      <li class="filter filter-colors" v-if="colors.size > 0">
        <ul class="filter-options-list">
          <ColorOption v-for="(color, index) in colors" :color="color" :key="index" />
        </ul>
      </li>
    </ul>

  </aside>
</template>

<script>
  import {computed} from 'vue';
  import {useStore} from 'vuex';
  import ColorOption from '@/components/ColorOption';

  export default {
    name: 'Sidebar',
    components: {
      ColorOption
    },
    setup() {
      const store = useStore();

      let colors = computed(() => {
        let clrs = new Set(store.state.records.map(record => record.color));
        return clrs;
      });

      let mode = computed(() => {
        return store.state.mode;
      });

      function changeMode(mode) {
        store.commit('changeMode', mode);
      }
      
      return {
        colors,
        changeMode,
        mode
      }
    }
  }
</script>

<style scoped lang="sass">
  .sidebar
    width: 200px
    padding: 20px 10px
    border-right: 1px solid #ddd

    @media (max-width: 767px)
      border-right: none
      border-bottom: 1px solid #ddd
      width: 100%

  .modes-list
    margin-bottom: 10px

    @media (max-width: 767px)
      display: flex
      justify-content: space-between

  .mode-option.active
    font-weight: 700

  .filter-options-list
    @media (max-width: 767px)
      display: flex
      justify-content: center

</style>