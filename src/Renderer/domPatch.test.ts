import merge from 'helpful-merge';

import {assert}          from 'chai';
import {SinonStub, stub} from 'sinon';

import AttributeChangeType from './Constants/AttributeChangeType';
import DomChangeType       from './Constants/DomChangeType';
import domPatch            from './domPatch';
import IPatchCommand       from './Interfaces/IPatchCommand';
import PatchCommand        from './PatchCommand';

const coerceToPatchCommand = (raw): PatchCommand => {
    const command = merge(new PatchCommand(), raw);

    command.childCommands = command.childCommands.map(coerceToPatchCommand);

    return command;
};

interface ITestCase {
    input: string;
    output: string;
    patchCommand: IPatchCommand;
}

const testCases: ITestCase[] = [
    {
        input: 'foo',
        patchCommand: {
            type: DomChangeType.INNER,
            newTextContent: 'bar'
        },
        output: 'bar'
    },
    {
        input: '<div></div>',
        patchCommand: {
            type: DomChangeType.REPLACE,
            newNode: document.createElement('section')
        },
        output: '<section></section>'
    },
    {
        input: '<div><span></span></div>',
        patchCommand: {
            type: DomChangeType.INNER,
            childCommands: [
                {
                    type: DomChangeType.REPLACE,
                    newNode: document.createElement('em')
                }
            ]
        },
        output: '<div><em></em></div>'
    },
    {
        input: '<div></div>',
        patchCommand: {
            type: DomChangeType.INNER,
            newInnerHtml: '<em></em>'
        },
        output: '<div><em></em></div>'
    },
    {
        input: '<div><em></em></div>',
        patchCommand: {
            type: DomChangeType.FULL,
            attributeChanges: [
                {
                    name: 'class',
                    value: 'foo',
                    type: AttributeChangeType.ADD
                }
            ],
            childCommands: [
                {
                    type: DomChangeType.REPLACE,
                    newNode: document.createElement('span')
                }
            ]
        },
        output: '<div class="foo"><span></span></div>'
    },
    {
        input: '<div><div></div></div>',
        patchCommand: {
            type: DomChangeType.FULL,
            attributeChanges: [
                {
                    name: 'class',
                    value: 'foo',
                    type: AttributeChangeType.ADD
                }
            ],
            newInnerHtml: ''
        },
        output: '<div class="foo"></div>'
    },
    {
        input: '<div data-foo></div>',
        patchCommand: {
            type: DomChangeType.OUTER,
            attributeChanges: [
                {
                    name: 'data-foo',
                    value: '',
                    type: AttributeChangeType.REMOVE
                }
            ]
        },
        output: '<div></div>'
    }
];

describe('domPatch()', () => {
    let rafStub: SinonStub;

    before(() => {
        rafStub = stub(window, 'requestAnimationFrame')
            .callsFake(fn => void fn(0) || 0);
    });

    after(() => rafStub.restore());

    it(
        'patches the provided element as per the provided "patch command"',
        () => {
            testCases.forEach(testCase => {
                const temp = document.createElement('div');

                temp.innerHTML = testCase.input;

                const prev = temp.firstChild;
                const patchCommand = coerceToPatchCommand(testCase.patchCommand);

                domPatch(prev, patchCommand);

                const output = temp.innerHTML;

                assert.equal(output, testCase.output);
            });
        }
    );
});