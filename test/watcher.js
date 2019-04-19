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
        this.tracker = {}
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
        for (const key in data) {
            this.instances[identifier][key] = data[key]
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
        identifier,
        obj = {},
        tracker = defaultTracker
    ) {
        this.tracker[identifier] = tracker 
        this.instances[identifier] = new Proxy(obj, this._createProxy(identifier))
    }

    /**
     * 
     * @param {*} identifier 
     */
    deRegister(identifier) {
        if(this.instances[identifier] !== undefined) {
            delete this.instances[identifier]
            delete this.tracker[identifier]
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
        tracker = defaultTracker
    ) {
        this.tracker[identifier] = tracker
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
                
                await self.tracker[identifier](
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
                return await obj[prop]
            }
        }
    }
}

// let wObj = new Watcher()
module.exports = Watcher