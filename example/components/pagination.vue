<template>
  <td colspan="2">
    <button :disabled="isPreviousDisabled" v-on:click="selectPreviousPage">Previous</button>
    <span> - Page {{stState.page}} - </span>
    <button :disabled="isNextDisabled" v-on:click="selectNextPage">Next</button>
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
      }
    },
    watch: {
      stState: function () {
        this.isPreviousDisabled = !this.stDirective.isPreviousPageEnabled();
        this.isNextDisabled = !this.stDirective.isNextPageEnabled();
      }
    }
  }
</script>
