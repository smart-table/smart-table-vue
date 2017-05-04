# smart-table-vue

Smart table binding for [Vuejs](https://vuejs.org/). Refer to the [documentation website](https://smart-table.org/vuejs.html) for more details.

Checkout the [https://smart-table.github.io/smart-table-vue/example/](online demo]

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
Vue.component("SortableHeader", {
  mixins: [sort],
  template: `<th v-bind:class="[activeClass]"  v-on:click="toggle"><slot></slot></th>`,
  data: function() {
    return { activeClass: "" };
  },
  watch: {
    stState: function(val) {
      const { pointer, direction } = val;
      if (pointer === this.stSort) {
        this.activeClass = direction === "asc"
          ? "st-sort-asc"
          : direction === "desc" ? "st-sort-desc" : "";
      } else {
        this.activeClass = "";
      }
    }
  }
});

//use "table" mixin to add a table behavior
Vue.component("PersonTable", {
  mixins: [tableMixin],
  template: `
    <table>
      <thead>
          <tr>
            <th is="sortable-header" :smart-table="smartTable" st-sort="surname">Surname</th>
            <th is="sortable-header" :smart-table="smartTable" st-sort="name">Name</th>
          </tr>
      </thead>
      <tbody>
      <tr v-for="item in displayed">
        <td>{{item.value.surname}}</td>
        <td>{{item.value.name}}</td>
      </tr>
      </tbody>
    </table>
    `
});

const persons = table({
  data: [
    { surname: "Renard", name: "Laurent" },
    { surname: "Leponge", name: "Bob" }
  ]
});


//your app
new Vue({
  el: "#container",
  data: {
    smartTable: persons
  },
  template: `<Person-table :smart-table="smartTable"/>`
});

```

see with [CodePen](https://codepen.io/lorenzofox3/pen/GmEvLO?editors=1010)

## Example

In this repository, you will find a [full example](./example) with pagination, sort, search and "advanced" filters.

run ``npm run build:example`` and serve the index.html file



