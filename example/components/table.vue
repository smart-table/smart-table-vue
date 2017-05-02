<template>
  <div id="table-container">
    <Processing :smart-table="smartTable"></Processing>
    <table>
      <thead>
      <tr>
        <th colspan="5">
          <Search :smart-table="smartTable" :st-search-scope="searchScope"></Search>
        </th>
      </tr>
      <tr>
        <th is="sortable-header" :smart-table="smartTable" st-sort="name.last" st-sort-cycle="true">Name</th>
        <th is="sortable-header" :smart-table="smartTable" st-sort="name.first">First name</th>
        <th is="sortable-header" :smart-table="smartTable" st-sort="gender">Gender</th>
        <th is="sortable-header" :smart-table="smartTable" st-sort="birthDate">Birth date</th>
        <th is="sortable-header" :smart-table="smartTable" st-sort="size">Size</th>
      </tr>
      <tr>
        <th>
          <filter-input type="string" :smart-table="smartTable" st-filter="name.last" label="surname:"
                        placeholder="search surname"/>
        </th>
        <th>
          <filter-input type="string" :smart-table="smartTable" st-filter="name.first" label="name:"
                        placeholder="search name"/>
        </th>
        <th>
          <gender-select :smart-table="smartTable" st-filter="gender" st-filter-operator="is"/>
        </th>
        <th>
          <filter-input type="date" :smart-table="smartTable" st-filter="birthDate" st-filter-type="date"
                        st-filter-operator="gt"
                        label="born after:" placeholder="search birthdate"/>
        </th>
        <th>
          <size-range-input :smart-table="smartTable"/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr is="row" v-for="item in displayed" :item="item.value" :key="item.index"></tr>
      </tbody>
      <tfoot>
      <tr>
        <td is="smart-summary" :smart-table="smartTable"></td>
        <td is="Pagination" :smart-table="smartTable"></td>
      </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
  import tableMixin from '../../lib/table';
  import Row from './row.vue';
  import SortableHeader from './sorthableHeader.vue';
  import SmartSummary from './summary.vue';
  import Processing from './loadingIndicator.vue';
  import Pagination from './pagination.vue';
  import Search from './searchInput.vue';
  import FilterInput from './filterInput.vue';
  import GenderSelect from './genderSelect.vue';
  import SizeRangeInput from './sizeRangeFilter.vue';

  export default {
    mixins: [tableMixin],
    components: {
      Row,
      SortableHeader,
      SmartSummary,
      Pagination,
      Processing,
      Search,
      FilterInput,
      GenderSelect,
      SizeRangeInput
    },
    data () {
      return {
        searchScope: ['name.first', 'name.last']
      };
    }
  };
</script>