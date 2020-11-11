import {smartTable} from 'smart-table-core';
import {render} from '@vue/server-test-utils';
import paginationComponent from '../fixtures/StPagination.vue';
import {sleep, defaultTableState} from '../helpers.js';

export default ({test}) => {
    const tableData = [
        { surname: "Renard",  name: "Laurent" },
        { surname: "Lazo", name: "Jan" },
        { surname: "Leponge", name: "Bob" },
    ];
    test('component has the correct page and size when mounted with initial data', async (t) => {
        const table = smartTable({
            data: tableData,
        });
        table.exec();
        await sleep(20);

        let wrapper = await render(paginationComponent, {
            propsData: {
                smartTable: table,
            },
        });
        t.equal(wrapper.find('#page').text(), '1', 'initial page is current table page');
        t.equal(wrapper.find('#size').text(), '', 'initial page size is current table page size');
        t.equal(wrapper.find('#filtered-count').text(), tableData.length + '', 'initial count of filtered items is all items in the table');

        table.slice({page: 2, size: 1});
        wrapper = await render(paginationComponent, {
            propsData: {
                smartTable: table,
            },
        });
        t.equal(wrapper.find('#page').text(), '2', 'page number is reactive to table directive updates');
        t.equal(wrapper.find('#size').text(), '1', 'page size is reactive to table directive updates');
        t.equal(wrapper.find('#filtered-count').text(), tableData.length + '', 'filtered item count is reactive to table directive updates');
    });
};
