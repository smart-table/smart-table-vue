<template>
  <div>
    <label>
      taller than:
      <input max="200" v-model="lowerBound" min="150" type="range">
    </label>
    <label>
      smaller than:
      <input max="200" v-model="higherBound" min="150" type="range">
    </label>
  </div>
</template>

<script>
  import {debounce} from './helper'

  export default {
    props: ['smartTable'],
    data: function () {
      return {
        lowerBound: '',
        higherBound: ''
      };
    },
    created(){
      this.commit = debounce(() => {
        this.smartTable.filter({
          size: [{
            operator: 'gte',
            value: this.lowerBound,
            type: 'number'
          }, {
            operator: 'lte',
            value: this.higherBound,
            type: 'number'
          }]
        });
      }, 300);
    },
    watch: {
      lowerBound: function () {
        this.commit();
      },
      higherBound: function () {
        this.commit();
      }
    }
  }
</script>