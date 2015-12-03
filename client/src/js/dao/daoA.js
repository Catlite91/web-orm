module.exports = {
    sourceUrl: {A: {url: 'url/a'}, B: {url: 'url/b'}, C: {url: 'url/c'}},
    dataMap: {
        a: {a: 'A.a', b: 'A.b', x: 'A.x'},
        b: {d: 'B.d', e: 'B.e', y: 'B.y'},
        c: {x: 'C.x', y: 'C.y', z: 'C.z'},
        d: {a: 'A.a', b: 'A.b', e: 'B.e', x: 'C.x', z: 'C.z'}
    }
};