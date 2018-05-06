import {assert} from 'chai';
import 'jsdom-global/register';

import cache              from './cache';
import EasydropdownFacade from './EasydropdownFacade';
import factory            from './factory';

describe('factory', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('exposes the `IFactory` API', () => {
        assert.typeOf(factory.all, 'function');
        assert.typeOf(factory.destroy, 'function');
    });

    it('can be called with a selector string', () => {
        const select = document.createElement('select');

        select.id = 'test';

        document.body.appendChild(select);

        const instance = factory('#test');

        assert.instanceOf(instance, EasydropdownFacade);

        instance.destroy();
    });

    it('can be called with an element reference', () => {
        const select = document.createElement('select');

        document.body.appendChild(select);

        const instance = factory(select);

        assert.instanceOf(instance, EasydropdownFacade);

        instance.destroy();
    });

    it('throws a `TypeError` if no valid select element is provided', () => {
        const select: any = document.createElement('div');

        assert.throws(() => factory(select), TypeError);
    });

    it('throws an `Error` if a `multiple` attribute is present on the select', () => {
        const select: any = document.createElement('select');

        select.multiple = true;

        assert.throws(() => factory(select), Error);
    });

    it('will return a cached instance if called twice with the same select element', () => {
        const select = document.createElement('select');

        document.body.appendChild(select);

        const cacheSize = cache.length;

        const instanceA = factory(select);

        factory(select);

        assert.equal(cache.length, cacheSize + 1);

        instanceA.destroy();
    });

    describe('#all()', () => {
        it('queries the DOM an instantiates on any select element found', () => {
            const select = document.createElement('select');

            document.body.appendChild(select);

            const cacheSize = cache.length;

            factory.all();

            assert.equal(cache.length, cacheSize + 1);
        });

        it('applies provided configuration to all instances', () => {
            const select = document.createElement('select');

            document.body.appendChild(select);

            factory.all({
                behavior: {
                    clampMaxVisibleItems: true
                }
            });

            // @ts-ignore
            assert.isTrue(cache[0].config.behavior.clampMaxVisibleItems);
        });
    });

    describe('#destroy()', () => {
        it('destroys all instances in the cache', () => {
            const select = document.createElement('select');

            document.body.appendChild(select);

            const cacheSize = cache.length;

            factory.all();

            assert.equal(cache.length, cacheSize + 1);

            factory.destroy();

            assert.equal(cache.length, 0);
        });
    });
});