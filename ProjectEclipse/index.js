const APP_PORT = 80;

const { networkInterfaces } = require('os');

const netIf = networkInterfaces();
var idip = "";
for(const name of Object.keys(netIf)) {

    for(const net of netIf[name]) {

        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        if (net.family === familyV4Value && !net.internal) {
            if(net.address != "127.0.0.1") {
                idip = ip2int(net.address).toString(32);

                break;
            }
        }
    }
    if(idip != "") break;

}

const { createServer } = require('http');
const express = require("express");
const app = express();

app.use(express.static(__dirname + "/client/"));

app.get("/idip",(req,res)=>{
    
    res.send(idip);

})

app.listen(APP_PORT, () => {
    console.log('server running at http://localhost:' + APP_PORT);
});


function ip2int(ip) {
    return ip.split('.').reduce(function(ipInt, octet) { return (ipInt<<8) + parseInt(octet, 10)}, 0) >>> 0;
} 