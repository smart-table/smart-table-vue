import {test} from 'zora';
import testTable from './table.js';
import testPagination from './pagination.js';

test('table mixin (SSR)', testTable);
test('pagination mixin (SSR)', testPagination);
