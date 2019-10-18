const test_fx = x => x + 10
const test_schema = {
    a: {
        w: test_fx,
        y: {
            n: test_fx
        }
    },
    b: test_fx,
    c: {
        p: [
            {
                // q: test_fx,
                b: test_fx,
                pz: [{
                    za: test_fx
                }]
            }
        ]
    }
}

const test_newDoc = {
    a: {
        w: 1,
        y: {
            n: 1
        }
    },
    b: 1,
    c: {
        p: [
            {
                q: 1,
                b: 1,
                pz: [{
                    za: 1
                }]
            }
        ]
    }
}

const resultValidation = {
    a: {
        w: 11, y: {
            n: 11
        }
    },
    b: 11,
    c: {
        p: [{
            b: 11, pz: [{
                za: 11
            }]
        }]
    }
}

module.exports = () => {

    test('.resolveDoc', async () => {
        const index = require('./index')(
            {
                schema: test_schema,
                newDoc: test_newDoc
            }
        )

        expect(
            resultValidation
        ).toEqual(
            index
        )

    })
}