class EventHub {
    eventHubCache = {}
    on(eventName, callback) {
        this.eventHubCache[eventName] = this.eventHubCache[eventName] || []
        this.eventHubCache[eventName].push(callback)
    }
    emit(eventName, data) {
        this.eventHubCache[eventName] = this.eventHubCache[eventName] || []
        this.eventHubCache[eventName].forEach(fn => fn(data))
    }
    off(eventName, callback){
        const index = this.eventHubCache[eventName].indexOf(callback);
        this.eventHubCache[eventName].splice(index, 1)
    }
}

module.exports = EventHub;