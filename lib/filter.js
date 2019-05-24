import {filterDirective} from 'smart-table-core';
import mixin from './mixin';

const mapPropsToConf = ({smartTable, stFilter, stFilterType = 'string', stFilterOperator = 'includes'}) => ({
  table: smartTable,
  pointer: stFilter,
  type: stFilterType,
  operator: stFilterOperator
});

export default Object.assign({
    props: ['smartTable', 'stFilter', 'stFilterType', 'stFilterOperator']
  },
  mixin(filterDirective,
    'onFilterChange',
    ['filter'],
    mapPropsToConf
  ));