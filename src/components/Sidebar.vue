<template>
  <aside class="sidebar">

    <ul class="modes-list">
      <li><a href="#">Сегодня</a></li>
      <li><a href="#">Все</a></li>
      <li><a href="#">Группы</a></li>
      <li><a href="#">Проекты</a></li>
    </ul>

    <ul class="filters">
      <li class="filter filter-colors">
        <p class="filter-name">Цвета</p>
        <ul class="filter-options-list">
          <ColorOption v-for="color in colors" :color="color" />
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

      const colors = computed(() => {
        return new Set(store.state.records.map(record => record.color));
      });
      
      return {
        colors
      }
    }
  }
</script>

<style scoped lang="sass">
  .sidebar
    width: 200px
</style>