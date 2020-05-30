import {smartTable} from 'smart-table-core';
import {shallowMount} from '@vue/test-utils';
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
        const wrapper = shallowMount(tableComponent, {
            propsData: {
                smartTable: smartTable({
                    data: tableData,
                }),
                order: tableOrder,
            },
        });
        await sleep(20);

        const tdNodes = wrapper.findAll('tr > td');
        t.equal(tdNodes.wrappers.length,
                tableData.length * tableOrder.length,
                'component rendered all table rows and columns');
        t.equal(tdNodes.at(0).text(), tableData[0][tableOrder[0]], 'table column displays correct value');

        wrapper.destroy();
    });
    test('component sorts table via table directive api', async (t) => {
        const wrapper = shallowMount(tableComponent, {
            propsData: {
                smartTable: smartTable({
                    data: tableData,
                }),
                order: tableOrder,
            },
        });
        await sleep(20);

        wrapper.vm.smartTable.sort({
            pointer: tableOrder[0],
            direction: 'none',
        });
        await sleep(20);
        t.equal(wrapper.find('tr > td').text(), tableData[0].surname, 'table is not sorted');

        wrapper.vm.smartTable.sort({
            pointer: tableOrder[0],
            direction: 'asc',
        });
        await sleep(20);
        t.equal(wrapper.find('tr > td').text(), tableData[1].surname, 'First table column is sorted in ascending order');

        wrapper.vm.smartTable.sort({
            pointer: tableOrder[0],
            direction: 'desc',
        });
        await sleep(20);
        t.equal(wrapper.find('tr > td').text(), tableData[0].surname, 'First table column is sorted in descending order');

        wrapper.vm.smartTable.sort({
            pointer: tableOrder[1],
            direction: 'asc',
        });
        await sleep(20);
        t.equal(wrapper.findAll('tr > td').at(1).text(), tableData[2].name, 'Second table column is sorted in ascending order');

        wrapper.vm.smartTable.sort({
            pointer: tableOrder[1],
            direction: 'desc',
        });
        await sleep(20);
        t.equal(wrapper.findAll('tr > td').at(1).text(), tableData[0].name, 'Second table column is sorted in descending order');

        wrapper.destroy();
    });
    test('component filters table via table directive api', async (t) => {
        const wrapper = shallowMount(tableComponent, {
            propsData: {
                smartTable: smartTable({
                    data: tableData,
                }),
                order: tableOrder,
            },
        });
        await sleep(20);

        wrapper.vm.smartTable.filter({
            surname: [{value: 'L'}],
        });
        await sleep(20);
        t.equal(wrapper.findAll('tr').length, 2, 'First table row is filtered');

        wrapper.vm.smartTable.filter({
            name: [{value: 'L'}],
        });
        await sleep(20);
        t.equal(wrapper.find('tr > td').text(), tableData[0].surname, 'First table row is not filtered');

        wrapper.vm.smartTable.filter({
            name: [{value: 'J'}],
        });
        await sleep(20);
        t.equal(wrapper.find('tr > td').text(), tableData[1].surname, 'Second table row is not filtered');

        wrapper.destroy();
    });
    test('component searches table via table directive api', async (t) => {
        const wrapper = shallowMount(tableComponent, {
            propsData: {
                smartTable: smartTable({
                    data: tableData,
                }),
                order: tableOrder,
            },
        });
        await sleep(20);

        wrapper.vm.smartTable.search({
            scope: ['name'],
            value: 'o',
        });
        await sleep(20);
        t.equal(wrapper.find('tr > td').text(), tableData[2].surname, 'Third table row remains after table is searched');

        wrapper.destroy();
    });
    test('component can select page and change page size via table directive api', async (t) => {
        const wrapper = shallowMount(tableComponent, {
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
        await sleep(20);
        t.equal(wrapper.findAll('tr').length, 1, 'First page displays the first table item only');

        wrapper.vm.smartTable.slice({
            page: 2,
            size: 2,
        });
        await sleep(20);
        t.equal(wrapper.findAll('tr').length, 1, 'Second page displays the last item only');

        wrapper.vm.smartTable.slice({
            page: 2,
            size: tableData.length,
        });
        await sleep(20);
        t.equal(wrapper.findAll('tr').length, 0, 'Second page displays nothing when the page size is equal to the table data length');

        wrapper.destroy();
    });
};
