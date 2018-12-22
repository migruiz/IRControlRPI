var spawn = require('child_process').spawn;


var mqtt = require('mqtt')
global.mtqqURL=process.env.mtqqURL
global.rmIPAddress=process.env.rmIPAddress
global.rmMACAddress=process.env.rmMACAddress
global.rmTYPE=process.env.rmTYPE
global.livingroom_tv_powerswitch='livingroom/tv/powerswitch'
global.livingroom_lgtv_powerswitchCode='26006000000127951213111411391114111410151015101510391139111411391139103a10391139111411141114103a1015101510141114113911391139101510391139113911391000052c0001284c11000c5e00012a4c10000c620001274b11000d050000000000000000'

var client  = mqtt.connect(global.mtqqURL)
 
client.on('connect', function () {
  client.subscribe(global.livingroom_tv_powerswitch)
})
client.on('message',async function (topic, message) {
    if (topic === global.livingroom_tv_powerswitch) {    
        await executeSendIRCodeAsync(global.livingroom_lgtv_powerswitchCode)
    }
   
  })


//./broadlink_cli --type 0x2712 --host 192.168.88.07 --mac aabbccddeeff --send @OFFICE-TV.power
function executeSendIRCodeAsync(irCode) {
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
                , irCode
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
