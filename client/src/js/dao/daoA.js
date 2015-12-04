module.exports = {
    baseUrl: 'http://localhost:8088/',
    sourceUrl: {ua: {url: 'url/a'}, ub: {url: 'url/b'}, uc: {url: 'url/c'}},
    dataMap: {
        da: {pa: 'ua.a', pb: 'ua.b', px: 'ua.x'},
        db: {pd: 'ub.d', pe: 'ub.e', py: 'ub.y'},
        dc: {px: 'uc.x', py: 'uc.y', pz: 'uc.z'},
        dd: {pa: 'ua.a', pb: 'ua.b', pe: 'ub.e', px: 'uc.x', pz: 'uc.z'}
    }
};