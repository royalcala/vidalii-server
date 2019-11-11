import { configTable as config } from '../src/example_init_data'
import * as globalFxs from '../src/globalFxs'
import { table, models } from '../src'

console.log('in jest/connection')
var initTable = table({
    fxs: { ...globalFxs },
    config
})
var initModels = models({
    table: initTable,
    fxs: { ...globalFxs },
    config
})
export default {

    table: initTable,
    models: initModels
}