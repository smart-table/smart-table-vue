import {summaryDirective} from 'smart-table-core';
import mixin from './mixin';

export default Object.assign({
    props: {
      smartTable: {
        type: Object,
        required: true,
      }
    }
  },
  mixin(summaryDirective, 'onSummaryChange')
);