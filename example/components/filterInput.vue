<template>
  <label>
    {{label}}
    <input :type="type" v-model="filterText" :placeholder="placeholder"/>
  </label>
</template>

<script>
  import filter from '../../lib/filter';
  import {debounce} from './helper';

  const commit = debounce((dir, val) => {
    dir.filter(val);
  }, 300);

  export default {
    props: ['placeholder', 'label', 'type'],
    mixins: [filter],
    data: function () {
      return {filterText: ''};
    },
    created(){
      this.commit = debounce((val) => this.filter(val), 300)
    },
    watch: {
      filterText: function (val) {
        this.commit(val);
      }
    }
  }
</script>