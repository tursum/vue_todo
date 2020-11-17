import {createStore} from 'vuex';

export default createStore({
  state:/*() {
    return*/ {
      mode: 'today',
      colors: [
        {
          color: '#eed',
          isActive: true,
          quantity: 2
        },
        {
          color: '#dde',
          isActive: false,
          quantity: 7
        }
      ],
      tags: [],
      records: [
        {
          title: 'Моя первая запись',
          color: null,
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
        }
      ]
    }
   /*}*/
});
