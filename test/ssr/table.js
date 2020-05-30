import {smartTable} from 'smart-table-core';
import {render} from '@vue/server-test-utils';
import tableComponent from '../fixtures/StTable.vue';
import {sleep, defaultTableState} from '../helpers.js';

export default ({test}) => {
    const tableData = [
        { surname: "Renard",  name: "Laurent" },
        { surname: "Lazo", name: "Jan" },
        { surname: "Leponge", name: "Bob" },
    ];
    const tableOrder = ['surname', 'name'];
    test('component renders a complete table when mounted with initial data', async (t) => {
        const wrapper = await render(tableComponent, {
            propsData: {
                smartTable: smartTable({
                    data: tableData,
                }),
                order: tableOrder,
            },
        });

        const tdNodes = wrapper.find('tr > td');
        t.equal(tdNodes.length,
                tableData.length * tableOrder.length,
                'component rendered all table rows and columns');
        t.equal(tdNodes.first().text(), tableData[0][tableOrder[0]], 'table column displays correct value');
    });
    test('component supports pagination', async (t) => {
        const wrapper = await render(tableComponent, {
            propsData: {
                smartTable: smartTable({
                    data: tableData,
                    tableState: Object.assign(defaultTableState(), {
                        slice: {page: 1, size: 1},
                    }),
                }),
                order: tableOrder,
            },
        });
        t.equal(wrapper.find('tr').length, 1, 'First page displays the first table item only');
    });
};
