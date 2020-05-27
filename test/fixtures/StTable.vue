<template>
    <table>
        <tbody>
            <tr v-for="item in displayed">
                <td v-for="prop in order">{{item.value[prop]}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import StMixins from '../../dist/smart-table-vue.js';

export default {
    name: 'StTable',
    mixins: [StMixins.table],
    props: {
        order: {
            type: Array,
            required: true,
            validator: arr => arr.length,
        },
    },
};
</script>
