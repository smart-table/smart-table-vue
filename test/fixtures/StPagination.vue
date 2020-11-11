<template>
    <div>
        <span id="page">{{stState.page}}</span>
        <span id="size">{{stState.size}}</span>
        <span id="filtered-count">{{stState.filteredCount}}</span>
    </div>
</template>

<script>
import StMixins from '../../dist/smart-table-vue.js';

export default {
    name: 'StPagination',
    mixins: [StMixins.pagination],
};
</script>
