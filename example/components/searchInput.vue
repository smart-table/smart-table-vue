<template>
  <label>
    Search:
    <input type="search" v-model="searchText" placeholder="Case sensitive search"/>
  </label>
</template>

<script>
  import search from '../../lib/search';
  import {debounce} from './helper';

  const commit = debounce((dir, val) => {
    dir.search(val)
  }, 300);

  export default {
    mixins: [search],
    data: function () {
      return {searchText: ''}
    },
    created(){
      this.commit = debounce((val) => this.search(val), 300)
    },
    watch: {
      searchText: function (val) {
        this.commit(val);
      }
    }
  }
</script>