import {search} from 'smart-table-core';
import mixin from './mixin';

const mapPropsToConf = ({smartTable, stSearchScope}) => ({table: smartTable, scope: stSearchScope});

export default Object.assign({
  props: ['smartTable', 'stSearchScope'],
}, mixin(search, 'onSearchChange', ['search'], mapPropsToConf));