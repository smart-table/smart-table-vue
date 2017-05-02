(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['smart-table-vue'] = factory());
}(this, (function () { 'use strict';

function proxyListener (eventMap) {
  return function ({emitter}) {

    const proxy = {};
    let eventListeners = {};

    for (let ev of Object.keys(eventMap)) {
      const method = eventMap[ev];
      eventListeners[ev] = [];
      proxy[method] = function (...listeners) {
        eventListeners[ev] = eventListeners[ev].concat(listeners);
        emitter.on(ev, ...listeners);
        return proxy;
      };
    }

    return Object.assign(proxy, {
      off(ev){
        if (!ev) {
          Object.keys(eventListeners).forEach(eventName => proxy.off(eventName));
        }
        if (eventListeners[ev]) {
          emitter.off(ev, ...eventListeners[ev]);
        }
        return proxy;
      }
    });
  }
}

const TOGGLE_SORT = 'TOGGLE_SORT';

const PAGE_CHANGED = 'CHANGE_PAGE';
const EXEC_CHANGED = 'EXEC_CHANGED';
const FILTER_CHANGED = 'FILTER_CHANGED';
const SUMMARY_CHANGED = 'SUMMARY_CHANGED';
const SEARCH_CHANGED = 'SEARCH_CHANGED';

const filterListener = proxyListener({[FILTER_CHANGED]: 'onFilterChange'});

var filterDirective = function ({table, pointer, operator = 'includes', type = 'string'}) {
  return Object.assign({
      filter(input){
        const filterConf = {
          [pointer]: [
            {
              value: input,
              operator,
              type
            }
          ]

        };
        return table.filter(filterConf);
      }
    },
    filterListener({emitter: table}));
};

const searchListener = proxyListener({[SEARCH_CHANGED]: 'onSearchChange'});

var searchDirective = function ({table, scope = []}) {
  return Object.assign(
    searchListener({emitter: table}), {
      search(input){
        return table.search({value: input, scope});
      }
    });
};

const sliceListener = proxyListener({[PAGE_CHANGED]: 'onPageChange', [SUMMARY_CHANGED]: 'onSummaryChange'});

var sliceDirective = function ({table}) {
  let {slice:{page:currentPage, size:currentSize}} = table.getTableState();
  let itemListLength = table.length;

  const api = {
    selectPage(p){
      return table.slice({page: p, size: currentSize});
    },
    selectNextPage(){
      return api.selectPage(currentPage + 1);
    },
    selectPreviousPage(){
      return api.selectPage(currentPage - 1);
    },
    changePageSize(size){
      return table.slice({page: 1, size});
    },
    isPreviousPageEnabled(){
      return currentPage > 1;
    },
    isNextPageEnabled(){
      return Math.ceil(itemListLength / currentSize) > currentPage;
    }
  };
  const directive = Object.assign(api, sliceListener({emitter: table}));

  directive.onSummaryChange(({page:p, size:s, filteredCount}) => {
    currentPage = p;
    currentSize = s;
    itemListLength = filteredCount;
  });

  return directive;
};

const sortListeners = proxyListener({[TOGGLE_SORT]: 'onSortToggle'});
const directions = ['asc', 'desc'];

var sortDirective = function ({pointer, table, cycle = false}) {

  const cycleDirections = cycle === true ? ['none'].concat(directions) : [...directions].reverse();

  let hit = 0;

  const directive = Object.assign({
    toggle(){
      hit++;
      const direction = cycleDirections[hit % cycleDirections.length];
      return table.sort({pointer, direction});
    }

  }, sortListeners({emitter: table}));

  directive.onSortToggle(({pointer:p}) => {
    if (pointer !== p) {
      hit = 0;
    }
  });

  return directive;
};

const executionListener = proxyListener({[SUMMARY_CHANGED]: 'onSummaryChange'});

var summaryDirective = function ({table}) {
  return executionListener({emitter: table});
};

const executionListener$1 = proxyListener({[EXEC_CHANGED]: 'onExecutionChange'});

var workingIndicatorDirective = function ({table}) {
  return executionListener$1({emitter: table});
};

const search = searchDirective;
const slice = sliceDirective;
const summary = summaryDirective;
const sort = sortDirective;
const filter$1 = filterDirective;
const workingIndicator = workingIndicatorDirective;

var mixin = function (directive, proxyEvent, delegateMethods = [], propsToConf = ({smartTable}) => ({table: smartTable})) {
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
};

const mapPropsToConf = ({smartTable, stFilter, stFilterType = 'string', stFilterOperator = 'includes'}) => ({
  table: smartTable,
  pointer: stFilter,
  type: stFilterType,
  operator: stFilterOperator
});

var filter$$1 = Object.assign({
    props: ['smartTable', 'stFilter', 'stFilterType', 'stFilterOperator']
  },
  mixin(filter$1,
    'onFilterChange',
    ['filter'],
    mapPropsToConf
  ));

var loadingIndicator = Object.assign({
  props: ['smartTable']
}, mixin(workingIndicator, 'onExecutionChange'));

var pagination = Object.assign({
    props: ['smartTable']
  },
  mixin(slice,
    'onSummaryChange',
    ['selectPage', 'selectNextPage', 'selectPreviousPage', 'isPreviousPageEnabled', 'isNextPageEnabled'])
);

const mapPropsToConf$1 = ({smartTable, stSearchScope}) => ({table: smartTable, scope: stSearchScope});

var search$2 = Object.assign({
  props: ['smartTable', 'stSearchScope'],
}, mixin(search, 'onSearchChange', ['search'], mapPropsToConf$1));

const propsToConf = ({stSort, smartTable, stSortCycle}) => ({
  pointer: stSort,
  table: smartTable,
  cycle: stSortCycle === 'true'
});

var sort$1 = Object.assign({
  props: ['smartTable', 'stSort', 'stSortCycle'],
}, mixin(sort,
  'onSortToggle',
  ['toggle'],
  propsToConf
));

var summary$1 = Object.assign({
    props: ['smartTable']
  },
  mixin(summary, 'onSummaryChange')
);

var table$3 = {
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
  filter: filter$$1,
  loadingIndicator,
  pagination,
  search: search$2,
  sort: sort$1,
  summary: summary$1,
  table: table$3
};

return index;

})));
//# sourceMappingURL=smart-table-vue.js.map
