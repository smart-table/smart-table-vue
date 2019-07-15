<template>
  <td colspan="2">
    <button :disabled="isPreviousDisabled" @click="selectPage(1)">1</button>
    <button :disabled="isPreviousDisabled" v-on:click="selectPreviousPage">Previous</button>
    <span> - Page {{stState.page}} - </span>
    <button :disabled="isNextDisabled" v-on:click="selectNextPage">Next</button>
    <button :disabled="isNextDisabled" @click="selectPage(pageCount)">{{pageCount}}</button>
  </td>
</template>

<script>
  import pagination from '../../lib/pagination';
  export default {
    mixins: [pagination],
    data() {
      return {
        isPreviousDisabled: true,
        isNextDisabled: true,
        pageCount: 1,
      }
    },
    watch: {
      stState: function () {
        this.isPreviousDisabled = !this.stDirective.isPreviousPageEnabled();
        this.isNextDisabled = !this.stDirective.isNextPageEnabled();
        this.pageCount = this.stDirective.state().pageCount;
      }
    }
  }
</script>
