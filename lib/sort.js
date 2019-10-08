import {sortDirective} from 'smart-table-core';
import mixin from './mixin';

const propsToConf = ({stSort, smartTable, stSortCycle}) => ({
  pointer: stSort,
  table: smartTable,
  cycle: stSortCycle === true || stSortCycle === 'true',
});

export default Object.assign({
  props: {
    smartTable: {
      type: Object,
      required: true,
    },
    stSort: {
      type: String,
      required: true,
    },
    stSortCycle: {
      type: [Boolean, String],
      default: false,
    },
  },
}, mixin(sortDirective,
  'onSortToggle',
  ['toggle'],
  propsToConf
));