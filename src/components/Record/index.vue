<template>
  <li class="record-cover" :key="record.id">
    <article class="record" :style="{backgroundColor: color}">
      <header class="record-header">
        <input type="text" :value="recordTitle" @input="changeRecordTitle" class="record-title" />
        <div class="record-creation">
          <p class="record-creation-date">{{record.creationDate}}</p>
          <p class="record-creation-time">{{record.creationTime}}</p>
        </div>
        <p class="record-important" v-if="record.isImportant">important</p>
      </header>
      <main class="record-content">
        <Point v-for="(point, id) in record.points" :key="id" :point="point" />
      </main>
      <footer>
        <p class="record-tags">
          <span class="tag" v-for="tag in record.tags">#{{tag}}</span>
        </p>
      </footer>
    </article>
  </li>
</template>

<script>
  import {ref, computed} from 'vue';
  import {useStore} from 'vuex';

  import Group from './RecordGroup';
  import Point from './RecordPoint';

  import colors from '../../assets/js/colors';

  export default {
    name: 'Record',
    components: {
      Group,
      Point
    },
    props: {
      record: Object
    },
    setup(props) {
      const store = useStore();
      
      let recordTitle = ref(props.record.title);
      let color = ref(colors[props.record.color]);

      function changeRecordTitle(e) {
        store.commit('changeRecordTitle', {record: props.record, newRecordTitle: e.target.value});
      }

      return {
        recordTitle,
        color,
        changeRecordTitle
      }
    }
  }
</script>

<style scoped lang="sass">
  .record-cover
    margin-bottom: 20px

  .record
    padding: 15px
    &:last-child
      margin-bottom: 0

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

  .record-creation
    display: flex

  .record-creation-date
    margin-right: 15px

  .record-important
    font-size: 10px
    font-weight: 700

  .record-content
    margin-bottom: 15px

  .tag
    margin-right: 10px
</style>