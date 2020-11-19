<template>
  <li class="record-cover">
    <article class="record">
      <div class="color-line" :style="{backgroundColor: color}"></div>
      <transition name="fade">
        <div v-if="record.isImportant" class="important-line">
          <p v-if="record.isImportant" class="is-important">important</p>
        </div>
      </transition>
      <header class="record-header">
        <form @submit.prevent="submitRecord">
          <input type="text" ref="titleInput" :value="recordTitle" @input="changeRecordTitle" class="record-title" :class="{done: isDone}" @blur="blurRecord" />
        </form>
        <div class="record-creation">
          <p class="record-creation-date">{{record.creationDate}}</p>
          <p class="record-creation-time">{{record.creationTime}}</p>
        </div>
      </header>
      <main class="record-content">
        <button class="create-point-button" @click="createPoint">+</button>
        <ul>
          <Point v-for="(point, id) in record.points" :id="id" :point="point" :record="record" />
        </ul>
      </main>
      <footer class="record-footer">
        <button class="footer-button button-important" @click="toggleImportant">{{record.isImportant ? 'Не важная?' : 'Важная?'}}</button>
        <button class="footer-button button-color">
          Цвет
          <ul class="color-menu">
            <RecordColorOption v-for="(color, index) in colors" :key="index" :color="color" :recordId="record.id" :recordColor="record.color" @changeRecordColor="changeRecordColor(color)" />
          </ul>
        </button>
        <button class="footer-button button-complete" @click="completeRecord">Завершить</button>
        <button class="footer-button button-remove" @click="removeRecord">Удалить</button>
      </footer>
    </article>
  </li>
</template>

<script>
  import {ref, computed, onMounted} from 'vue';
  import {useStore} from 'vuex';

  import Point from './RecordPoint';
  import RecordColorOption from './RecordColorOption';

  import {colors} from '../../assets/js/colors';

  export default {
    name: 'Record',
    components: {
      Point,
      RecordColorOption
    },
    props: {
      record: Object
    },
    setup(props) {
      const store = useStore();

      let titleInput = ref(null);
      
      let recordTitle = computed(() => props.record.title);
      let isImportant = computed(() => props.record.isImportant);
      let color = computed(() => props.record.color);

      let isDone = computed(() => {
        let done = props.record.isDone;

        let points = props.record.points;

        if (points.length > 0) {
          let isUndonePoints = points.filter(i => i.isDone == false).length == 0;

          if (done != isUndonePoints) {
            store.commit('toggleRecordDone', props.record);
          }
        }

        return props.record.isDone;
      });

      function changeRecordTitle(e) {
        store.commit('changeRecordTitle', {record: props.record, newRecordTitle: e.target.value});
      }

      function toggleImportant() {
        store.commit('toggleImportant', props.record);
      }

      function changeRecordColor(color) {
        store.commit('changeRecordColor', {record: props.record, color});
      }

      function completeRecord() {
        store.commit('completeRecord', props.record);
      }

      function removeRecord() {
        store.commit('removeRecord', props.record);
      }

      function createPoint() {
        store.commit('createPoint', props.record);
      }

      function submitRecord(e) {
        e.target.children[0].blur();

        if (props.record.points.length == 0) {
          store.commit('createPoint', props.record);
        }
      }

      function blurRecord(e) {
        if (e.target.value == '') {
          store.commit('changeRecordTitle', {record: props.record, newRecordTitle: 'Новая задача'});
        }
      }

      onMounted(() => {
        if (props.record.autofocus) {
          titleInput.value.focus();
          store.commit('removeRecordAutofocus', props.record);
        }
      });

      return {
        colors,
        recordTitle,
        isImportant,
        color,
        isDone,
        changeRecordTitle,
        toggleImportant,
        changeRecordColor,
        completeRecord,
        removeRecord,
        createPoint,
        titleInput,
        submitRecord,
        blurRecord
      }
    }
  }
</script>

<style scoped lang="sass">
  .record-cover
    margin-bottom: 20px
    @media (max-width: 767px)
      margin-bottom: 40px

  .record
    padding: 15px
    border: 1px solid #ddd
    position: relative
    &:last-child
      margin-bottom: 0

  .color-line
    height: 10px
    position: absolute
    top: 0
    left: 0
    right: 0
    opacity: 0.5

  .important-line
    height: 10px
    position: absolute
    top: 0
    left: 0
    right: 0
    z-index: 2
    background-image: repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) 5px, transparent 5px, transparent 15px)

  .is-important
    font-size: 10px
    font-weight: 700
    display: inline
    align-items: center
    position: absolute
    top: 0
    right: 0
    height: 10px
    padding: 0 10px
    background-color: rgba(255, 255, 255, 0.8)

  .fade-enter-active, .fade-leave-active
    transition: opacity .5s

  .fade-enter, .fade-leave-to
    opacity: 0

  .record-header
    margin-bottom: 15px

  .record-title
    width: 100%
    font-size: 20px
    background-color: transparent
    border: 1px solid transparent
    &:focus, &:hover
      border-color: #ccc
      background-color: rgba(255, 255, 255, 0.5)
    &.done
      text-decoration: line-through

  .record-creation
    display: flex

  .record-creation-date
    margin-right: 15px

  .important-checkbox
    margin-right: 10px

  .record-content
    margin-bottom: 15px

  .create-point-button
    border: 1px solid #ddd
    background-color: #fff
    width: 30px
    height: 20px
    cursor: pointer
    margin-bottom: 15px
    display: block

  .record-footer
    position: absolute
    bottom: -11px
    right: 20px
    background-color: transparent
    @media (max-width: 365px)
      bottom: -31px

  .footer-button
    padding: 3px 10px
    margin-left: 10px
    background-color: #fff
    border: none
    cursor: pointer

  .color-menu
    position: absolute
    display: none
    padding: 5px
    top: -20px
    transform: translateX(-50%)
    left: 50%

  .button-color
    position: relative
    &:hover > .color-menu
      display: flex
</style>