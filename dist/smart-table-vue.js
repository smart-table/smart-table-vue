(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global['smart-table-vue'] = factory());
}(this, function () { 'use strict';

    var SortDirection;
    (function (SortDirection) {
        SortDirection["ASC"] = "asc";
        SortDirection["DESC"] = "desc";
        SortDirection["NONE"] = "none";
    })(SortDirection || (SortDirection = {}));

    var Type;
    (function (Type) {
        Type["BOOLEAN"] = "boolean";
        Type["NUMBER"] = "number";
        Type["DATE"] = "date";
        Type["STRING"] = "string";
    })(Type || (Type = {}));
    var FilterOperator;
    (function (FilterOperator) {
        FilterOperator["INCLUDES"] = "includes";
        FilterOperator["IS"] = "is";
        FilterOperator["IS_NOT"] = "isNot";
        FilterOperator["LOWER_THAN"] = "lt";
        FilterOperator["GREATER_THAN"] = "gt";
        FilterOperator["GREATER_THAN_OR_EQUAL"] = "gte";
        FilterOperator["LOWER_THAN_OR_EQUAL"] = "lte";
        FilterOperator["EQUALS"] = "equals";
        FilterOperator["NOT_EQUALS"] = "notEquals";
        FilterOperator["ANY_OF"] = "anyOf";
    })(FilterOperator || (FilterOperator = {}));

    const proxyListener = (eventMap) => ({ emitter }) => {
        const eventListeners = {};
        const proxy = {
            off(ev) {
                if (!ev) {
                    Object.keys(eventListeners).forEach(eventName => proxy.off(eventName));
                }
                if (eventListeners[ev]) {
                    emitter.off(ev, ...eventListeners[ev]);
                }
                return proxy;
            }
        };
        for (const ev of Object.keys(eventMap)) {
            const method = eventMap[ev];
            eventListeners[ev] = [];
            proxy[method] = function (...listeners) {
                eventListeners[ev] = eventListeners[ev].concat(listeners);
                emitter.on(ev, ...listeners);
                return proxy;
            };
        }
        return proxy;
    };

    const TOGGLE_SORT = 'TOGGLE_SORT';
    const PAGE_CHANGED = 'CHANGE_PAGE';
    const EXEC_CHANGED = 'EXEC_CHANGED';
    const FILTER_CHANGED = 'FILTER_CHANGED';
    const SUMMARY_CHANGED = 'SUMMARY_CHANGED';
    const SEARCH_CHANGED = 'SEARCH_CHANGED';

    const filterListener = proxyListener({[FILTER_CHANGED]: 'onFilterChange'});

    var filterDirective = ({table, pointer, operator = 'includes', type = 'string'}) => Object.assign({
    	filter(input) {
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
    	},
    	state() {
    		return table.getTableState().filter;
    	}
    }, filterListener({emitter: table}));

    const searchListener = proxyListener({[SEARCH_CHANGED]: 'onSearchChange'});

    var searchDirective = ({table, scope = []}) => Object.assign(searchListener({emitter: table}), {
    	search(input, opts = {}) {
    		return table.search(Object.assign({}, {value: input, scope}, opts));
    	},
    	state() {
    		return table.getTableState().search;
    	}
    });

    const sliceListener = proxyListener({[PAGE_CHANGED]: 'onPageChange', [SUMMARY_CHANGED]: 'onSummaryChange'});

    function sliceDirective ({table}) {
    	let {slice: {page: currentPage, size: currentSize}} = table.getTableState();
    	let itemListLength = table.filteredCount;

    	const api = {
    		selectPage(p) {
    			return table.slice({page: p, size: currentSize});
    		},
    		selectNextPage() {
    			return api.selectPage(currentPage + 1);
    		},
    		selectPreviousPage() {
    			return api.selectPage(currentPage - 1);
    		},
    		changePageSize(size) {
    			return table.slice({page: 1, size});
    		},
    		isPreviousPageEnabled() {
    			return currentPage > 1;
    		},
    		isNextPageEnabled() {
    			return Math.ceil(itemListLength / currentSize) > currentPage;
    		},
    		state() {
    			return Object.assign(table.getTableState().slice, {filteredCount: itemListLength});
    		}
    	};
    	const directive = Object.assign(api, sliceListener({emitter: table}));

    	directive.onSummaryChange(({page: p, size: s, filteredCount}) => {
    		currentPage = p;
    		currentSize = s;
    		itemListLength = filteredCount;
    	});

    	return directive;
    }

    const debounce = (fn, time) => {
    	let timer = null;
    	return (...args) => {
    		if (timer !== null) {
    			clearTimeout(timer);
    		}
    		timer = setTimeout(() => fn(...args), time);
    	};
    };

    const sortListeners = proxyListener({[TOGGLE_SORT]: 'onSortToggle'});
    const directions = ['asc', 'desc'];

    function sortDirective ({pointer, table, cycle = false, debounceTime = 0}) {
    	const cycleDirections = cycle === true ? ['none'].concat(directions) : [...directions].reverse();
    	const commit = debounce(table.sort, debounceTime);
    	let hit = 0;

    	const directive = Object.assign({
    		toggle() {
    			hit++;
    			const direction = cycleDirections[hit % cycleDirections.length];
    			return commit({pointer, direction});
    		},
    		state() {
    			return table.getTableState().sort;
    		}
    	}, sortListeners({emitter: table}));

    	directive.onSortToggle(({pointer: p}) => {
    		hit = pointer !== p ? 0 : hit;
    	});

    	const {pointer: statePointer, direction = 'asc'} = directive.state();
    	hit = statePointer === pointer ? (direction === 'asc' ? 1 : 2) : 0;
    	return directive;
    }

    const summaryListener = proxyListener({[SUMMARY_CHANGED]: 'onSummaryChange'});

    var summaryDirective = ({table}) => summaryListener({emitter: table});

    const executionListener = proxyListener({[EXEC_CHANGED]: 'onExecutionChange'});

    var workingIndicatorDirective = ({table}) => executionListener({emitter: table});

    const search = searchDirective;
    const slice = sliceDirective;
    const summary = summaryDirective;
    const sort = sortDirective;
    const filter = filterDirective;
    const workingIndicator = workingIndicatorDirective;

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

    var filter$1 = Object.assign({
        props: ['smartTable', 'stFilter', 'stFilterType', 'stFilterOperator']
      },
      mixin(filter,
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

    var search$1 = Object.assign({
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
      filter: filter$1,
      loadingIndicator,
      pagination,
      search: search$1,
      sort: sort$1,
      summary: summary$1,
      table
    };

    return index;

}));
//# sourceMappingURL=smart-table-vue.js.map
