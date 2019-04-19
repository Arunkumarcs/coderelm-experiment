let wObj  = require('./watcher')
wObj = new wObj()

let wObj2  = require('./watcher')
wObj2 = new wObj2()

wObj.register({
    asd: 4543
}, 'o1')

console.log(wObj.getAll())
// wObj.update('o1', {
//     sda: 45435
// })

// console.log(wObj.getAll())

wObj.instances.o1.dfsdg = 3423
console.log(wObj2.getAll())