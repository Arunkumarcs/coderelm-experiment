let wObj  = require('./watcher')
wObj = new wObj()

let wObj2  = require('./watcher')
wObj2 = new wObj2()

wObj.register('o1', {
    asd: 4543
})

console.log(wObj.getAll())
wObj.update('o1', {
    sda: {
        asd: 453245
    }
})

console.log(wObj.getAll())

wObj.update('o1', {
    sda: 2
})
// wObj.instances.o1.dfsdg = 3423
// console.log(wObj2.getAll())