<template>
  <th v-bind:class="[activeClass]" v-on:click="toggle">
    <slot></slot>
  </th>
</template>

<script>
  import sort from '../../lib/sort';
  export default {
    mixins: [sort],
    data() {
      return {
        activeClass: '',
      }
    },
    watch: {
      stState: function (val) {
        const {pointer, direction} = val;
        if (pointer === this.stSort) {
          this.activeClass = direction === 'asc' ? 'st-sort-asc' : (direction === 'desc' ? 'st-sort-desc' : '');
        } else {
          this.activeClass = '';
        }
      }
    }
  }
</script>
