import {smartTable} from 'smart-table-core';
import stMixins from '../dist/smart-table-vue.js';
const {table: tableMixin} = stMixins;

export default (test) => {
    const shallowMount = window.VueTestUtils.shallowMount;
    const sleep = ms => new Promise(resolve => setTimeout(() => {
        resolve();
    }, ms));
    const tableData = [
        { surname: "Renard",  name: "Laurent" },
        { surname: "Leponge", name: "Bob" },
    ];
    test('component using table mixin renders a complete table when mounted with initial data', async (t) => {
        const tableInstance = smartTable({
            data: tableData,
        });
        const wrapper = shallowMount({
            mixins: [tableMixin],
            render(h) {
                return h('table', {}, [
                    h('tbody', {}, this.displayed.map(({value}) =>
                        h('tr', {}, Object.values(value).map(t =>
                            h('td', {}, t)
                        )),
                    )),
                ]);
            },
        }, {
            propsData: {
                smartTable: tableInstance,
            },
        });
        // // Wait for smartTable to populate the table
        await sleep(20);
        t.ok(wrapper.is('table'), 'component is rendered');
        const trNodes = wrapper.findAll('tr');
        t.equal(trNodes.wrappers.length, tableData.length, 'component rendered all table rows');
        const tdNodes = trNodes.at(0).findAll('td');
        t.equal(tdNodes.wrappers.length,
                Object.keys(tableData[0]).length,
                'First table row rendered all columns');
        t.equal(tdNodes.at(0).text(), 'Renard', 'table column displays correct value');
    });
};
