var serviceA = require('./service/serviceA');
for(var fun in serviceA){
    serviceA[fun](function(result){
        console.log(result)
    });
}