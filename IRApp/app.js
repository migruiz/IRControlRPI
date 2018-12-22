var spawn = require('child_process').spawn;


var mqtt = require('mqtt')
global.mtqqURL=process.env.mtqqURL
global.livingroom_tv_powerswitch="livingroom/tv/powerswitch"
global.rmIPAddress="192.168.1.9"
global.rmMACAddress="f434fff33344"
global.rmTYPE="0x2712"

var client  = mqtt.connect(global.mtqqURL)
 
client.on('connect', function () {
  client.subscribe(global.livingroom_tv_powerswitch)
})
client.on('message',async function (topic, message) {
    if (topic === global.livingroom_tv_powerswitch) {    
        await executeSendIRCodeAsync('/IRApp/codes/livingroom_tv_lg.power')
    }
   
  })


//./broadlink_cli --type 0x2712 --host 192.168.88.07 --mac aabbccddeeff --send @OFFICE-TV.power
function executeSendIRCodeAsync(codeFilePath) {
    return new Promise(function (resolve, reject) {
        const command = spawn('/python-broadlink/cli/broadlink_cli'
            , [
                '--type'
                , global.rmTYPE
                , '--host'
                , global.rmIPAddress
                , '--mac'
                , global.rmMACAddress
                , '--send'
                , codeFilePath
            ]);
        command.stdout.on('data', data => {
            console.log(data.toString());
        });
        command.on('exit', function (code, signal) {
            console.log('exited');
            resolve();
        });
    });
}



// Catch uncaught exception
process.on('uncaughtException', err => {
    console.dir(err, { depth: null });
    process.exit(1);
});
process.on('exit', code => {
    console.log('Process exit');
    process.exit(code);
});
process.on('SIGTERM', code => {
    console.log('Process SIGTERM');
    process.exit(code);
});
