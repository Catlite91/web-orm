module.exports = {
    index: function*() {
        yield this.render('index', {"title": "koa demo"});
    },
    url: {
        a: function*() {
            yield this.body = {
                a: 'a',
                b: 'b',
                x: 'x'
            }
        },
        b: function*() {
            yield this.body = {
                d: 'a',
                e: 'e',
                y: 'y'
            }
        },
        c: function*() {
            yield this.body = {
                x: 'x',
                y: 'y',
                z: 'z'
            }
        }
    }
}