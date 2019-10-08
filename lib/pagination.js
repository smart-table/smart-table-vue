import {paginationDirective} from 'smart-table-core';
import mixin from './mixin'

export default Object.assign({
    props: {
      smartTable: {
        type: Object,
        required: true,
      },
    },
  },
  mixin(paginationDirective,
    'onSummaryChange',
    ['selectPage', 'selectNextPage', 'selectPreviousPage', 'isPreviousPageEnabled', 'isNextPageEnabled'])
);