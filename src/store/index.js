import {createStore} from 'vuex';

function printConsole(func, text) {
  console.log('%c%s', 'background: #dcffcc;', func, text)
}

export default createStore({
  state: {
    mode: 'today',
    colors: [],
    tags: [],
    records: [
      {
        id: 0,
        title: 'Моя первая запись',
        creationDate: '17.11.2020',
        creationTime: '15:49',
        color: 'red',
        isImportant: true,
        isDone: false,
        tags: ['первый тег', 'второй тег'],
        points: [
          {
            text: 'Первый пункт выполнен',
            isDone: true
          },
          {
            text: 'Второй пункт не выполнен',
            isDone: false
          }
        ]
      },
      {
        id: 1,
        title: 'Моя первая запись',
        creationDate: '17.11.2020',
        creationTime: '15:49',
        color: 'red',
        isImportant: false,
        isDone: false,
        tags: ['первый тег', 'второй тег'],
        points: [
          {
            text: 'Первый пункт выполнен',
            isDone: true
          },
          {
            text: 'Второй пункт не выполнен',
            isDone: false
          }
        ]
      },
      {
        id: 2,
        title: 'Моя первая запись',
        creationDate: '17.11.2020',
        creationTime: '15:49',
        color: 'blue',
        isImportant: true,
        isDone: false,
        tags: ['первый тег', 'второй тег'],
        points: [
          {
            text: 'Первый пункт выполнен',
            isDone: true
          },
          {
            text: 'Второй пункт не выполнен',
            isDone: false
          }
        ]
      }
    ]
  },
  mutations: {
    changeRecordTitle(state, props) {
      props.record.title = props.newRecordTitle;
      printConsole('changeRecordStyle:', props.newRecordTitle);
    },
    togglePointDone(state, point) {
      point.isDone = !point.isDone;
      printConsole('togglePointDone:', point.isDone);
    },
    changePointText(state, props) {
      props.point.text = props.newPointText;
      printConsole('changePointText:', props.newPointText);
    },
  }
});
