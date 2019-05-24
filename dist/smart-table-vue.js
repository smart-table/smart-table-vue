(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('smart-table-core')) :
  typeof define === 'function' && define.amd ? define(['smart-table-core'], factory) :
  (global = global || self, global['smart-table-vue'] = factory(global.smartTableCore));
}(this, function (smartTableCore) { 'use strict';

  function mixin (directive, proxyEvent, delegateMethods = [], propsToConf = ({smartTable}) => ({table: smartTable})) {
    const output = {
      data: function () {
        return {
          stState: {}
        };
      },
      created(){
        this.stDirective = directive(propsToConf(this));
        this.stDirective[proxyEvent](state => {
          this.stState = state;
        });
      },
      destroyed(){
        this.stDirective.off();
      },
      methods: {}
    };

    for (let method of delegateMethods) {
      output.methods[method] = function (...args) {
        return this.stDirective[method](...args)
      };
    }

    return output;
  }

  const mapPropsToConf = ({smartTable, stFilter, stFilterType = 'string', stFilterOperator = 'includes'}) => ({
    table: smartTable,
    pointer: stFilter,
    type: stFilterType,
    operator: stFilterOperator
  });

  var filter = Object.assign({
      props: ['smartTable', 'stFilter', 'stFilterType', 'stFilterOperator']
    },
    mixin(smartTableCore.filter,
      'onFilterChange',
      ['filter'],
      mapPropsToConf
    ));

  var loadingIndicator = Object.assign({
    props: ['smartTable']
  }, mixin(smartTableCore.workingIndicator, 'onExecutionChange'));

  var pagination = Object.assign({
      props: ['smartTable']
    },
    mixin(smartTableCore.slice,
      'onSummaryChange',
      ['selectPage', 'selectNextPage', 'selectPreviousPage', 'isPreviousPageEnabled', 'isNextPageEnabled'])
  );

  const mapPropsToConf$1 = ({smartTable, stSearchScope}) => ({table: smartTable, scope: stSearchScope});

  var search = Object.assign({
    props: ['smartTable', 'stSearchScope'],
  }, mixin(smartTableCore.search, 'onSearchChange', ['search'], mapPropsToConf$1));

  const propsToConf = ({stSort, smartTable, stSortCycle}) => ({
    pointer: stSort,
    table: smartTable,
    cycle: stSortCycle === 'true'
  });

  var sort = Object.assign({
    props: ['smartTable', 'stSort', 'stSortCycle'],
  }, mixin(smartTableCore.sort,
    'onSortToggle',
    ['toggle'],
    propsToConf
  ));

  var summary = Object.assign({
      props: ['smartTable']
    },
    mixin(smartTableCore.summary, 'onSummaryChange')
  );

  var table = {
    props: ['smartTable'],
    data(){
      return {
        displayed: []
      };
    },
    created(){
      this.smartTable.onDisplayChange(displayed => this.displayed = displayed);
    },
    destroyed(){
      this.smartTable.off();
    },
    mounted(){
      this.smartTable.exec();
    }
  };

  var index = {
    filter,
    loadingIndicator,
    pagination,
    search,
    sort,
    summary,
    table
  };

  return index;

}));
//# sourceMappingURL=smart-table-vue.js.map
