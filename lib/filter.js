import {filterDirective} from 'smart-table-core';
import mixin from './mixin';

const mapPropsToConf = ({smartTable, stFilter, stFilterType, stFilterOperator}) => ({
  table: smartTable,
  pointer: stFilter,
  type: stFilterType,
  operator: stFilterOperator
});

export default Object.assign({
    props: {
      smartTable: {
        type: Object,
        required: true,
      },
      stFilter: {
        type: String,
        required: true,
      },
      stFilterOperator: {
        type: String,
        default: 'includes',
      },
      stFilterType: {
        type: String,
        default: 'string',
      },
    },
  },
  mixin(filterDirective,
    'onFilterChange',
    ['filter'],
    mapPropsToConf
  ));