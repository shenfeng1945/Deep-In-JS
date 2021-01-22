const EventHub = require('../src/EventHub/EventHub');
const chai = require('chai');
// const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai)

const assert = chai.assert;

describe('new EventHub()', () => {
    it('是个对象', () => {
        assert.isObject(new EventHub())
    })
})

describe('.on之后，.emit触发, .on注册的回调函数能执行吗?', () => {
    it('能执行', () => {
        const eventHub = new EventHub();
    eventHub.on('new', (data) => {
        assert(data === '今天天气晴朗')
    })
    eventHub.emit('new', '今天天气晴朗')
    })
})

describe('.on 之后, 执行.off，在触发emit', () => {
   it('.off 有用', () => {
    const eventHub = new EventHub();
        let called = false
        const fn = () => {
            called = true
        }
        eventHub.on('new', fn)
        eventHub.off('new', fn)
        eventHub.emit('new')
        assert(called === false);
   })
})
