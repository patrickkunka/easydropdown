import {assert} from 'chai';
import 'jsdom-global/register';

import Dom from './Dom';

const createMockItems = (): any[] => [
    {
        offsetHeight: 10
    },
    {
        offsetHeight: 43
    },
    {
        offsetHeight: 5
    }
];

describe('Dom', () => {
    describe('.sumItemsHeight()', () => {
        it('sums the heights of all elements in the `items` array', () => {
            const dom = new Dom();

            dom.item = createMockItems();

            const sum = dom.item.reduce((localSum: number, item: HTMLElement) => {
                return localSum + item.offsetHeight;
            }, 0);

            assert.equal(dom.sumItemsHeight(), sum);
        });

        it('breaks iteration at a provided maximum count', () => {
            const dom = new Dom();

            dom.item = createMockItems();

            assert.equal(
                dom.sumItemsHeight(2),
                dom.item[0].offsetHeight + dom.item[1].offsetHeight
            );
        });
    });
});