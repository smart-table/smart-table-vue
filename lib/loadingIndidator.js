import {workingIndicator} from 'smart-table-core';
import mixin from './mixin';

export default Object.assign({
  props: ['smartTable']
}, mixin(workingIndicator, 'onExecutionChange'));