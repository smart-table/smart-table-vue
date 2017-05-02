import {sort} from 'smart-table-core';
import mixin from './mixin';

const propsToConf = ({stSort, smartTable, stSortCycle}) => ({
  pointer: stSort,
  table: smartTable,
  cycle: stSortCycle === 'true'
});

export default Object.assign({
  props: ['smartTable', 'stSort', 'stSortCycle'],
}, mixin(sort,
  'onSortToggle',
  ['toggle'],
  propsToConf
));