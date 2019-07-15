import {searchDirective} from 'smart-table-core';
import mixin from './mixin';

const mapPropsToConf = ({smartTable, stSearchScope}) => ({table: smartTable, scope: stSearchScope});

export default Object.assign({
  props: {
    smartTable: {
      type: Object,
      required: true,
    },
    stSearchScope: {
      type: Array,
      default: () => [],
    },
  },
}, mixin(searchDirective, 'onSearchChange', ['search'], mapPropsToConf));