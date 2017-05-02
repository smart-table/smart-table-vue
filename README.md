# smart-table-vue

[https://smart-table.org](smart table) binding for [Vuejs](https://vuejs.org/). Refer to the [documentation website](https://smart-table.org/vuejs.html) for more details

Come as a set of convenient mixins so you can focus on your templates only.

## Getting started

### Installation

Through a package manager you can install the smart-table-vue package

``yarn add smart-table-vue``

or

``npm install --save smart-table-vue``

## Usage

```Javascript

import {sort, table as tableMixin} from 'smart-table-vue';
import {table} from 'smart-table-core';

//use "sort" mixin to add a sortable behavior
Vue.component('SortableHeader',{
    mixins:[sort],
    template:'<th v-on:click="toggle"><slot></slot></th>',

});

//use "table" mixin to add a table behavior
Vue.component('PersonTable',{
    mixins:[tableMixin],
    template:`
    <table>
      <thead>
          <tr>
            <th is="sortable-header" :smart-table="smartTable" st-sort="surname>Surname</th>
            <th is="sortable-header" :smart-table="smartTable" st-sort="name>Name</th>
          </tr>
      </thead>
      <tbody>
      <tr v-for="item in displayed">
        <td>{{item.surname}}</td>
        <td>{{item.name}}<td>
      </tr>
      </tbody>
    </table>
    `
});

const persons = table({
    data:[]
});


new Vue({
    el:'#container',
    template:``,
});
```

```Markup
<template>
    <table>
      <thead>
      <tr>
        <th>Surname</th>
        <th>Name</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in displayed">
        <td>{{item.surname}}</td>
        <td>{{item.firstname}}<td>
      </tr>
      </tbody>
    </table>
</template>

<script>
  import {table} from 'smart-table-vue';

  export default {
    mixins: [table],
    data () {
      return {
        searchScope: ['name.first', 'name.last']
      };
    }
  };
</script>
```

## Example

In this repository, you will find a [full example](./example) with pagination, sort, search and "advanced" filters.

run ``npm run build:example`` and serve the index.html file



