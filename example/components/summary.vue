<template>
  <td colspan="3">showing items <strong>{{(stState.page - 1) * stState.size + (stState.filteredCount > 0 ? 1 : 0)}}</strong> -
    <strong>{{Math.min(stState.filteredCount,
      stState.page * stState.size)}}</strong> of <strong>{{stState.filteredCount}}</strong> matching items
  </td>
</template>

<script>
  import summary from '../../lib/summary';
  export default {
    mixins: [summary]
  }
</script>