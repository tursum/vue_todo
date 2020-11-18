import {createStore} from 'vuex';

function printConsole(func, text) {
  console.log('%c%s', 'background: #dcffcc;', func, text || 'no param')
}

class Record {
  constructor() {
    let currentDate = new Date;
    this.id = Record.counter++;
    this.title = '';
    this.creationDate = currentDate.getDate() + '.' + (currentDate.getMonth() + 1) + '.' + currentDate.getFullYear();
    this.creationTime = currentDate.getHours() + ':' + currentDate.getMinutes();
    this.color = 'white';
    this.isImportant = false;
    this.isDone = false;
    this.points = [];
    this.autofocus = true;
  }

  static counter = 0;
}

export default createStore({
  state: {
    mode: 'today',
    colors: [],
    tags: [],
    records: []
  },
  mutations: {
    createRecord(state) {
      state.records.push(new Record);
    },
    toggleRecordDone(state, record) {
      record.isDone = !record.isDone;
      printConsole('toggleRecordDone:', record.isDone);
    },
    changeRecordTitle(state, props) {
      props.record.title = props.newRecordTitle;
      printConsole('changeRecordStyle:', props.newRecordTitle);
    },
    toggleImportant(state, record) {
      record.isImportant = !record.isImportant;
      printConsole('toggleImportant:', record.isImportant);
    },
    changeRecordColor(state, props) {
      props.record.color = props.color;
      printConsole('changeRecordColor', props.color);
    },
    togglePointDone(state, point) {
      point.isDone = !point.isDone;
      printConsole('togglePointDone:', point.isDone);
    },
    changePointText(state, props) {
      props.point.text = props.newPointText;
      printConsole('changePointText:', props.newPointText);
    },
    completeRecord(state, record) {
      record.points.forEach(point => point.isDone = true);
    },
    removeRecord(state, record) {
      let recordPosition = state.records.findIndex(r => record == r);
      state.records.splice(recordPosition, 1);
    },
    createPoint(state, record) {
      record.points.push({
        text: '',
        isDone: false,
        autofocus: true
      })
    },
    removePoint(state, props) {
      let pointPosition = props.record.points.findIndex(p => p == props.point);
      props.record.points.splice(pointPosition, 1);
    },
    removeRecordAutofocus(state, record) {
      record.autofocus = false;
    },
    removePointAutofocus(state, point) {
      point.autofocus = false;
    }
  }
});
