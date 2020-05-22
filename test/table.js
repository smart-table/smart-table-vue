import {smartTable} from 'smart-table-core';
import * as VueTestUtils from '@vue/test-utils';
import stMixins from '../dist/smart-table-vue.js';

const {shallowMount} = VueTestUtils;
const sleep = ms => new Promise(resolve => setTimeout(() => {
    resolve();
}, ms));
const tableComponent = {
    mixins: [stMixins.table],
    props: {
        order: {
            type: Array,
            required: true,
        },
    },
    render(h) {
        return h('table', {}, [
            h('tbody', {}, this.displayed.map(({value}) =>
                h('tr', {}, this.order.map(prop =>
                    h('td', {}, value[prop]),
                )),
            )),
        ]);
    },
};

export default (test) => {
    const tableData = [
        { surname: "Renard",  name: "Laurent" },
        { surname: "Lazo", name: "Jan" },
        { surname: "Leponge", name: "Bob" },
    ];
    const tableOrder = ['surname', 'name'];
    test('component using table mixin renders a complete table when mounted with initial data', async (t) => {
        const wrapper = shallowMount(tableComponent, {
            propsData: {
                smartTable: smartTable({
                    data: tableData,
                }),
                order: tableOrder,
            },
        });
        await sleep(20);

        const trNodes = wrapper.findAll('tr');
        t.equal(trNodes.wrappers.length, tableData.length, 'component rendered all table rows');
        const tdNodes = trNodes.at(0).findAll('td');
        t.equal(tdNodes.wrappers.length,
                Object.keys(tableData[0]).length,
                'First table row rendered all columns');
        t.equal(tdNodes.at(0).text(), tableData[0][tableOrder[0]], 'table column displays correct value');

        wrapper.destroy();
    });
    test('component using table mixin sorts table via table directive api', async (t) => {
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
        t.equal(wrapper.find('tr').find('td').text(), tableData[0].surname, 'table is not sorted');

        wrapper.vm.smartTable.sort({
            pointer: tableOrder[0],
            direction: 'asc',
        });
        await sleep(20);
        t.equal(wrapper.find('tr').find('td').text(), tableData[1].surname, 'First table column is sorted in ascending order');

        wrapper.vm.smartTable.sort({
            pointer: tableOrder[0],
            direction: 'desc',
        });
        await sleep(20);
        t.equal(wrapper.find('tr').find('td').text(), tableData[0].surname, 'First table column is sorted in descending order');

        wrapper.vm.smartTable.sort({
            pointer: tableOrder[1],
            direction: 'asc',
        });
        await sleep(20);
        t.equal(wrapper.find('tr').findAll('td').at(1).text(), tableData[2].name, 'Second table column is sorted in ascending order');

        wrapper.vm.smartTable.sort({
            pointer: tableOrder[1],
            direction: 'desc',
        });
        await sleep(20);
        t.equal(wrapper.find('tr').findAll('td').at(1).text(), tableData[0].name, 'Second table column is sorted in descending order');

        wrapper.destroy();
    });
    test('component using table mixin filters table via table directive api', async (t) => {
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
        t.equal(wrapper.find('tr').find('td').text(), tableData[0].surname, 'First table row is not filtered');

        wrapper.vm.smartTable.filter({
            name: [{value: 'J'}],
        });
        await sleep(20);
        t.equal(wrapper.find('tr').find('td').text(), tableData[1].surname, 'Second table row is not filtered');

        wrapper.destroy();
    });
    test('component using table mixin searches table via table directive api', async (t) => {
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
        t.equal(wrapper.find('tr').find('td').text(), tableData[2].surname, 'Third table row remains after table is searched');

        wrapper.destroy();
    });
};
