console.clear()
console.log('on testing fx')
var id = '111-111-111-1111'
var rev = '1'
var store = {}

store[`${id}!${rev}`] = 'inProcess'
console.log(store)
console.log(store.hasOwnProperty(`${id}!${rev}`))
delete store[`${id}!${rev}`]
console.log(store)
console.log(store.hasOwnProperty(`${id}!${rev}`))