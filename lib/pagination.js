import {sliceFactory} from 'smart-table-core';
import mixin from './mixin'

export default Object.assign({
    props: ['smartTable']
  },
  mixin(sliceFactory,
    'onSummaryChange',
    ['selectPage', 'selectNextPage', 'selectPreviousPage', 'isPreviousPageEnabled', 'isNextPageEnabled'])
);