// process.on('message', function(data){
    //     console.log('message from main process');
    //     console.log(data);
    // })
    // process.send('hello main process');
const DEFAULT_PORT = 8000;

cosnt params = process.argv.slice(2);

cosnt paramsObj = {};

params.forEach(param => {
    cosnt paramArr = param.split(' ');
    paramsObj[paramArr[0].replace('--', '')] = paramArr[1];
});
console.log("paramsObj", paramsObj);