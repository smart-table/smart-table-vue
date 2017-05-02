<template>
  <div id="overlay" v-bind:class="{ 'st-working':stState.working}">
    Processing ...
  </div>
</template>

<script>
  import loading from '../../lib/loadingIndidator';
  export default {
    mixins: [loading],
  }
</script>