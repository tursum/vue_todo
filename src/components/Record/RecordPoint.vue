<template>
    <li :key="id">
      <form class="point" @submit.prevent="submitPoint">
        <input type="checkbox" :checked="isDone" @click="togglePointDone" class="point-is-done">
        <input ref="pointInput" type="text" :value="pointText" :class="{done: isDone}" @input="changePointText" @blur="blurPoint" class="point-text">
      </form>
    </li>
</template>

<script>
  import {ref, computed, onMounted} from 'vue';
  import {useStore} from 'vuex';

  export default {
    name: 'RecordPoint',
    props: {
      point: Object,
      record: Object,
      id: Number
    },
    setup(props) {
      const store = useStore();

      let pointInput = ref(null);

      let pointText = computed(() => props.point.text);
      let isDone = computed(() => props.point.isDone);

      function togglePointDone() {
        store.commit('togglePointDone', props.point);
      }

      function changePointText(e) {
        store.commit('changePointText', {point: props.point, newPointText: e.target.value})
      }

      function submitPoint(e) {
        console.log(3);
        e.target.children[1].blur();
        if ((e.target.children[1].value != '') && (props.id == props.record.points.length - 1)) {
          store.commit('createPoint', props.record);
        }
      }

      function blurPoint(e) {
        console.log(4);
        if (e.target.value == '') {
          store.commit('removePoint', {record: props.record, point: props.point});
        }
      }

      onMounted(() => {
        if (props.point.autofocus) {
          pointInput.value.focus();
          store.commit('removePointAutofocus', props.point);
        }
      });

      return {
        pointText,
        isDone,
        togglePointDone,
        changePointText,
        pointInput,
        submitPoint,
        blurPoint
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
    width: 100%
    &:hover, &:focus
      border-color: #ddd
      background-color: rgba(255, 255, 255, 0.5)
    &.done
      text-decoration: line-through

  .point-is-done
    margin-right: 10px
</style>