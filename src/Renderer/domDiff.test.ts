import {assert} from 'chai';

import DomChangeType from './Constants/DomChangeType';
import domDiff       from './domDiff';

interface ITestCase {
    prev: () => Node;
    next: () => Node;
    type: DomChangeType;
}

const testCases: ITestCase[] = [
    {
        prev: () => document.createTextNode(''),
        next: () => document.createTextNode(''),
        type: DomChangeType.NONE
    },
    {
        prev: () => document.createTextNode('foo'),
        next: () => document.createTextNode('bar'),
        type: DomChangeType.INNER
    },
    {
        prev: () => document.createElement('div'),
        next: () => document.createElement('div'),
        type: DomChangeType.NONE
    },
    {
        prev: () => document.createElement('div'),
        next: () => document.createElement('span'),
        type: DomChangeType.REPLACE
    },
    {
        prev: () => document.createElement('div'),
        next: () => document.createTextNode(''),
        type: DomChangeType.REPLACE
    },
    {
        prev: () => document.createElement('div'),
        next: () => {
            const el = document.createElement('div');

            el.classList.add('foo');

            return el;
        },
        type: DomChangeType.OUTER
    },
    {
        prev: () => {
            const el = document.createElement('div');

            el.textContent = 'foo';

            return el;
        },
        next: () => {
            const el = document.createElement('div');

            el.textContent = 'bar';

            return el;
        },
        type: DomChangeType.INNER
    },
    {
        prev: () => {
            const el = document.createElement('div');

            el.innerHTML = '<div></div>';

            return el;
        },
        next: () => {
            const el = document.createElement('div');

            el.innerHTML = '<div></div><div></div>';

            return el;
        },
        type: DomChangeType.INNER
    },
    {
        prev: () => {
            const el = document.createElement('div');

            el.innerHTML = 'foo';

            return el;
        },
        next: () => {
            const el = document.createElement('div');

            el.classList.add('foo');
            el.innerHTML = 'bar';

            return el;
        },
        type: DomChangeType.FULL
    }
];

describe('domDiff()', () => {
    it(
        'diffs a previous and next version of an element, and ' +
        'produces the appropriate change "type"',
        () => {
            testCases.forEach(testCase => {
                const prev = testCase.prev();
                const next = testCase.next();

                const patchCommand = domDiff(prev, next);

                assert.equal(patchCommand.type, testCase.type);
            });
        }
    );
});
