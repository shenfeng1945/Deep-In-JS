
class Promise {
    callbacks = [];
    state = 'pending'
    constructor(fn) {
        if (typeof fn !== 'function') {
            throw new Error('new Promise()需接受个函数作为参数')
        }
        fn(this.resolve.bind(this), this.reject.bind(this))
    }
    resolve(result?) {
        // 该两行代码，是确保 resolve只会执行一次，以第一次为准
        if (this.state !== 'pending') return;
        this.state = 'fulfilled';
        // 确保 then 中代码先执行
        nextTick(() => {
            this.callbacks.forEach(handle => {
                if (typeof handle[0] === 'function') {
                    handle[0].call(null, result)
                }
            })
        })
    }
    reject(reason) {
        if (this.state !== 'pending') return;
        this.state = 'rejected';
        nextTick(() => {
            this.callbacks.forEach(handle => {
                if (typeof handle[1] === 'function') {
                    handle[1].call(null, reason)
                }
            })
        })
    }
    then(succeed?, fail?) {
        const handle = []
        if (typeof succeed === 'function') {
            handle[0] = succeed;
        }
        if (typeof fail === 'function') {
            handle[1] = fail;
        }
        this.callbacks.push(handle)
    }
}

// 将代码变成 microtask
function nextTick(fn) {
    if (process !== undefined && typeof process.nextTick === 'function') {
        return process.nextTick(fn)
    } else {
        let counter = 1;
        const obsever = new MutationObserver(fn);
        const textNode = document.createTextNode(String(counter))

        obsever.observe(textNode, { characterData: true })
        counter += 1;
        textNode.data = String(counter)
    }
}

export default Promise