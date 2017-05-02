<template>
  <smart-table :smart-table="smartTable"/>
</template>

<script>
  import table from 'smart-table-core';
  import SmartTable from './components/table.vue'

  export default {
    components: {
      SmartTable
    },
    data () {
      return {
        smartTable: table({data, tableState: {sort: {}, filter: {}, search: {}, slice: {page: 1, size: 15}}})
      };
    }
  };
</script>