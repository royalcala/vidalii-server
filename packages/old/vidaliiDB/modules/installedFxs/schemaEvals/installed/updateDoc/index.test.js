const R = require('ramda')

describe('->updateDoc', () => {
    test('test updateDoc(prevDoc,newDoc) OK?', () => {
        const prevDoc = {
            _id: 1,
            a: 1,
            b: [
                { _id: 1, a: 1 },
                { _id: 2, a: 1 },
                { _id: 3, a: 1, b: 1, sub_b: [{ _id: 1, a: 1, b: 1 }] },
            ]
        }

        const newDoc = {
            _id: 1,
            b: [{
                _id: 3, a: 2, sub_b: [
                    { _id: 1, a: 2 },
                    { _id: 2, a: 2 }
                ]
            }]
        }

        const updateDoc = require('./index')({
            prevDoc,
            newDoc,
            // idName: '_id'
        })
        expect(
            updateDoc
        ).toEqual({
            _id: 1,
            a: 1,
            b:
                [{ _id: 1, a: 1 },
                { _id: 2, a: 1 },
                {
                    _id: 3,
                    a: 2,
                    b: 1,
                    sub_b: [{ _id: 1, a: 2, b: 1 }, { _id: 2, a: 2 }]
                }]
        })
    })

})