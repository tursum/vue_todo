<template>
  <li class="color-option" :style="{backgroundColor: color}" @click="toggleColor" :class="{active: isActive}"></li>
</template>

<script>
  import {computed} from 'vue';
  import {useStore} from 'vuex';

  export default {
    name: 'ColorOption',
    props: {
      color: {
        type: String
      }
    },
    setup(props) {
      const store = useStore();

      let isActive = computed(() => {
        return store.state.colors.find(c => c == props.color);
      })

      function toggleColor() {
        store.commit('toggleColor', props.color);
      }

      return {
        toggleColor,
        isActive
      }
    }
  }
</script>

<style scoped lang="sass">
  .color-option
    width: 100%
    height: 20px
    border-radius: 3px
    opacity: 0.75
    margin: 5px 0
    cursor: pointer
    border: 1px solid #ddd
    &.active
      box-shadow: 1px 1px 3px black
    @media (max-width: 767px)
      width: 30px
      margin: 0 5px
    
</style>