/**
 * 
 * @param {*} name 
 * @param {*} obj 
 * @param {*} pro 
 * @param {*} oldVal 
 * @param {*} newVal 
 */
let defaultTracker = async function(name, obj, pro, oldVal, newVal) {
    console.log(`the property "${pro}" in  ${name}" is being changed to new value.`)
}

/**
 * 
 */
class Watcher {
    constructor() {
        this.instances = {}
    }

    /**
     * 
     */
    getAll() {
        return this.instances
    }

    /**
     * 
     * @param {*} identifier 
     * @param {*} data 
     */
    update(
        identifier,
        data
    ) {
        let self = this
        this.instances[identifier] = {
            ...self.instances[identifier],
            ...data
        }
    }

    /**
     * 
     * @param {*} identifier 
     */
    getInstance(identifier) {
        return this.instances[identifier]
    }

    /**
     * 
     * @param {*} obj 
     * @param {*} identifier 
     * @param {*} tracker 
     */
    register(
        obj,
        identifier,
        tracker = function(name, obj, pro, oldVal, newVal) {
            console.log(`the property "${pro}" in  ${name}" is being changed to new value.`)
        }
    ) {
        console.log(tracker)
        obj._tracker = tracker

        this.instances[identifier] = new Proxy(obj, this._createProxy(identifier))
        return this.instances[identifier]
    }

    /**
     * 
     * @param {*} identifier 
     */
    deRegister(identifier) {
        if(this.instances[identifier] !== undefined) {
            delete this.instances[identifier]
        }        
        return this.instances
    }

    /**
     * 
     * @param {*} identifier 
     * @param {*} tracker 
     */
    updateTracker(
        identifier,
        tracker = function(name, obj, pro, oldVal, newVal) {
            console.log(`the property "${pro}" in  ${name}" is being changed to new value.`)
        }
    ) {
        this.instances[identifier]._tracker = tracker
    }

    /**
     * Proxy Object
     * @param {*} name 
     */
    _createProxy(identifier) {
        let self = this
        return {
            // Setter
            async set(obj, prop, newVal) {
                let oldVal = obj[prop]
                obj[prop] = newVal
                
                console.log(await self.instances[identifier]._tracker)
                await self.instances[identifier]._tracker(
                    identifier,
                    obj,
                    prop,
                    oldVal,
                    newVal
                )
                return true
            },
            // Getter
            async get(obj, prop) {
                return obj[prop]
            }
        }
    }
}

// let wObj = new Watcher()
module.exports = Watcher