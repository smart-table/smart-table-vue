import {slice} from 'smart-table-core';
import mixin from './mixin'

export default Object.assign({
    props: ['smartTable']
  },
  mixin(slice,
    'onSummaryChange',
    ['selectPage', 'selectNextPage', 'selectPreviousPage', 'isPreviousPageEnabled', 'isNextPageEnabled'])
);