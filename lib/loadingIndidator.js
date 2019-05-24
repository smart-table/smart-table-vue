import {workingIndicatorDirective} from 'smart-table-core';
import mixin from './mixin';

export default Object.assign({
  props: ['smartTable']
}, mixin(workingIndicatorDirective, 'onExecutionChange'));