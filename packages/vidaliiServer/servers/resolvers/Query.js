module.exports=
{"sales": (parent, args, context, info) => {
                const { query } = args
                var toJson = JSON.parse(query)
                console.log('query to object::', toJson)
                return models[nameSchema].find(toJson)
            }, "users": (parent, args, context, info) => {
                const { query } = args
                var toJson = JSON.parse(query)
                console.log('query to object::', toJson)
                return models[nameSchema].find(toJson)
            }}