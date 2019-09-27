const transactions = () => {
    var storeTransactions = {}
    return {
        new: () => {
            return storeTransactions[uuidv4()] = () => {
                var storeModels = []
                return {
                    load: (modelBeforeSave) => {
                        storeModels.push(modelBeforeSave)
                    },
                    save: () => {
                        //go through each array
                        try {
                            storeModels.map(
                                async (fx) => {
                                    //1.-
                                    let result = await fx.save()
                                    //2.-Save changes in the document with the uuidv4 connected

                                }
                            )
                            // mark db transactions deleted
                        } catch (error) {
                            //3.- remove all the changes
                        }
                    }
                }
            }
        },
        select: (id) => storeTransactions[id],

    }
}
module.exports = transactions