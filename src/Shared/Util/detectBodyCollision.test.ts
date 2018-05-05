import {assert} from 'chai';

import createMockHandlerParams from '../../Events/Mock/createMockHandlerParams';

import CollisionType from './Constants/CollisionType';
import detectBodyCollision, {
    mapCollisionData
} from './detectBodyCollision';

describe('detectBodyCollision()', () => {
    it('returns collision type `NONE` if the select has no options', () => {
        const params = createMockHandlerParams();
        const collisionData = detectBodyCollision(params.dom, params.config);

        assert.equal(collisionData.type, CollisionType.NONE);
    });

    it('returns collision data if at least option exists', () => {
        const params = createMockHandlerParams();

        params.dom.option.push(document.createElement('div'));

        const collisionData = detectBodyCollision(params.dom, params.config);

        assert.notEqual(collisionData.type, CollisionType.NONE);
    });

    describe('mapCollisionData()', () => {
        it('returns collision type `NONE` if no collision is occuring', () => {
            const collisionData = mapCollisionData(200, 200, 100, 30);

            assert.equal(collisionData.type, CollisionType.NONE);
        });

        it('returns collision type `TOP` if the body height is greater than the clearspace above the head', () => {
            const collisionData = mapCollisionData(50, 200, 100, 30);

            assert.equal(collisionData.type, CollisionType.TOP);
        });

        it('returns collision type `BOTTOM` if the body height is greater than the clearspace below the head', () => {
            const collisionData = mapCollisionData(200, 50, 100, 30);

            assert.equal(collisionData.type, CollisionType.BOTTOM);
        });

        it(
            'returns collision a visible options override if colliding at the ' +
            'top and bottom, but closer to the top',
            () => {
                const collisionData = mapCollisionData(30, 50, 100, 30);

                assert.notEqual(collisionData.maxVisibleItemsOverride, -1);
                assert.equal(collisionData.type, CollisionType.TOP);
            }
        );

        it(
            'returns collision a visible options override if colliding at the ' +
            'top and bottom, but closer to the bottom',
            () => {
                const collisionData = mapCollisionData(50, 30, 100, 30);

                assert.notEqual(collisionData.maxVisibleItemsOverride, -1);
                assert.equal(collisionData.type, CollisionType.BOTTOM);
            }
        );
    });
});
