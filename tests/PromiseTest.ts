import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
chai.use(sinonChai);

const assert = chai.assert;
import Promise from '../src/Promise/Promise';


describe('Promise', () => {
    it('是一个类', () => {
        assert.isFunction(Promise)
        assert.isObject(Promise.prototype)
    })

    it('new Promise() 如果接受的不是一个函数就报错', () => {
        // assert.throw(fn)的作用: 如果fn报错，控制台就不报错，如果fn不报错，则控制台报错
        assert.throw(() => {
            new Promise(1)
        })

        assert.throw(() => {
            new Promise(false)
        })
    })

    it('new Promise(fn) 会生成一个对象，对象有then方法', () => {
        const promise = new Promise(() => { });
        assert.isFunction(promise.then)
    })

    it('new Promise(fn)中的 fn 立即执行', () => {
        const fn = sinon.fake();
        new Promise(fn);
        assert(fn.called);
    })

    it('new Promise(fn)中的 fn 执行的时候接受 resolve 和 reject 两个函数', done => {
        new Promise((resolve, reject) => {
            assert.isFunction(resolve)
            assert.isFunction(reject)
            done()
        })
    })

    it('promise.then(success)中的 success 会在 resolve 调用的时候执行', done => {
        const success = sinon.fake();
        const p = new Promise((resolve, reject) => {
            assert.isFalse(success.called)
            resolve()
            setTimeout(() => {
                assert.isTrue(success.called)
                done()
            }, 100)
        })
        p.then(success)
    })

    it('promise.then(null, fail)中的 fail 会在 reject 被调用的时候执行', done => {
        const fail = sinon.fake();
        const p = new Promise((resolve, reject) => {
            assert.isFalse(fail.called)
            reject()
            setTimeout(() => {
                assert.isTrue(fail.called)
                done()
            }, 100)
        })
        p.then(null, fail)
    })

    it('如果 onFulfilled和onRejected都是可选函数', () => {
        const p = new Promise(resolve => resolve())
        p.then(false, null)
        assert(1 === 1)
    })

    it('如果 onFulfilled 是函数', done => {
        const succeed = sinon.fake();
        const p = new Promise(resolve => {
            assert.isFalse(succeed.called)
            resolve(233)
            resolve(123)
            setTimeout(() => {
                assert(p.state === 'fulfilled')
                assert.isTrue(succeed.calledOnce)
                assert(succeed.calledWith(233))
                done()
            })
        })
        p.then(succeed)
    })

    it('如果 onRejected 是函数', done => {
        const fail = sinon.fake();
        const p = new Promise((resolve, reject) => {
            assert.isFalse(fail.called)
            reject(233)
            reject(123)
            setTimeout(() => {
                assert(p.state === 'rejected')
                assert.isTrue(fail.calledOnce)
                assert(fail.calledWith(233))
                done()
            })
        })
        p.then(null, fail)
    })

    it('在主线程代码执行完之前，不得调用 then 接受的两参数函数', done => {
        const succeed = sinon.fake();
        const p = new Promise(resolve => {
            resolve()
        })
        p.then(succeed)
        assert.isFalse(succeed.called)
        setTimeout(() => {
            assert.isTrue(succeed.called)
            done()
        })
    })

    it('then(succeed) 可以在同一个 promise 里被多次调用', done => {
        const p = new Promise(resolve => resolve())
        const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()]
        p.then(callbacks[0])
        p.then(callbacks[1])
        p.then(callbacks[2])
        setTimeout(() => {
            assert(callbacks[0].called)
            assert(callbacks[1].called)
            assert(callbacks[2].called)
            assert(callbacks[1].calledAfter(callbacks[0]))
            assert(callbacks[2].calledAfter(callbacks[1]))
            done()
        }, 0)
    })

    it('then(null, fail) 可以在同一个 promise 里被多次调用', done => {
        const p = new Promise((resolve, reject) => reject())
        const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()]
        p.then(null, callbacks[0])
        p.then(null, callbacks[1])
        p.then(null, callbacks[2])
        setTimeout(() => {
            assert(callbacks[0].called)
            assert(callbacks[1].called)
            assert(callbacks[2].called)
            assert(callbacks[1].calledAfter(callbacks[0]))
            assert(callbacks[2].calledAfter(callbacks[1]))
            done()
        }, 0)
    })
})