<template>
    <div class="point">
      <input type="checkbox" :checked="isDone" @click="togglePointDone" class="point-is-done">
      <input type="text" :value="pointText" :class="{done: isDone}" @input="changePointText" class="point-text">
    </div>
</template>

<script>
  import {ref, computed} from 'vue';
  import {useStore} from 'vuex';

  export default {
    name: 'RecordPoint',
    props: {
      point: Object
    },
    setup(props) {
      const store = useStore();

      let pointText = computed(() => props.point.text);
      let isDone = computed(() => props.point.isDone);

      function togglePointDone() {
        store.commit('togglePointDone', props.point);
      }

      function changePointText(e) {
        store.commit('changePointText', {point: props.point, newPointText: e.target.value})
      }

      return {
        pointText,
        isDone,
        togglePointDone,
        changePointText
      }
    }
  }
</script>

<style scoped lang="sass">
  .point
    display: flex
    align-items: center

  .point-text
    background-color: transparent
    border: 1px solid transparent
    &:hover, &:focus
      border-color: #ddd
      background-color: rgba(255, 255, 255, 0.5)
    &.done
      text-decoration: line-through

  .point-is-done
    margin-right: 10px
</style>