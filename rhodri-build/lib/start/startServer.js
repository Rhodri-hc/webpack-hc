const chokidar = require('chokidar');
const path = require('path');
const cp = require('child_process');

// 文件改变触发时间
function onChange() {
    console.log("change");
}


function runServer(params) {
    // 启动webpack 服务

    // 启动子进程的方式
    //1、  cp.execFile('node', [path.resolve(__dirname, './DevService.js'), '--force'], {}, (err, stdout) => {
    //       console.log(err, stdout);
    //    })

    // 2、 cp.exec(`node ${path.resolve(__dirname, './DevService.js')} --force`, {}, (err, stdout) => {
    //     console.log(err, stdout);
    // })

    // 3
    // const child = cp.spawn('node', [path.resolve(__dirname, './DevService.js'), '--force']);

    // child.stdout.on('data', function(data) {
    //     console.log(data);
    // });

    // child.stderr.on('data', function(err){
    //     console.log(err);
    // });
    
    // child.stdout.on('close', function(data){
    //     console.log('close', data);
    // });

    const scriptPath = path.resolve(__dirname, './DevService.js')
    const child = cp.fork(scriptPath, ['--port 8080']);

    // child.on('message', function(data) {
    //     // 接收来自子进程的消息
    //     console.log('message from child process');
    //     console.log(data);
    // });
    // child.send('hello child process')


}

function runWatcher(params) {
    // 启动配置监听服务
    console.log("runWatcher");
    // 监听路径
    const configPath = path.resolve(__dirname, './config.json');
    // const startPath = path.resolve(process.cwd(), 'lib/start');
    // const buildPath = path.resolve(process.cwd(), 'lib/build');
    
    const watcher = chokidar.watch(configPath)
        .on('change', onChange)
        .on('error', (error ) => {
            console.error('file watch error!', error);
            process.exit(1);
        })
}


module.exports = function startServer(arg, opts, cmd){
    // 通过子进程启动webpack-dev-server 服务
    // 1、子进程启动可以避免主进程受到影响
    // 2、子进程启动可以方便重启，解决配置修改后无法重启
    runServer(arg, opts, cmd);

    // 监听配置修改
    runWatcher()
}