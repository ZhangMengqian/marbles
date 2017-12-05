var crypto = require('crypto');
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('C:/Users/Zhang Mengqian/Desktop/testdb.db');
// console.log(crypto.getCiphers());

/*
* log
* [ 'aes-128-cbc',
  'aes-128-ccm',
  'aes-128-cfb',
  'aes-128-cfb1',
  'aes-128-cfb8',
  'aes-128-ctr',
  'aes-128-ecb',
  'aes-128-gcm',
  'aes-128-ofb',
  'aes-128-xts',
  'aes-192-cbc',
  'aes-192-ccm',
  'aes-192-cfb',
  'aes-192-cfb1',
  'aes-192-cfb8',
  'aes-192-ctr',
  'aes-192-ecb',
  'aes-192-gcm',
  'aes-192-ofb',
  'aes-256-cbc',
  'aes-256-ccm',
  'aes-256-cfb',
  'aes-256-cfb1',
  'aes-256-cfb8',
  'aes-256-ctr',
  'aes-256-ecb',
  'aes-256-gcm',
  'aes-256-ofb',
  'aes-256-xts',
  'aes128',
  'aes192',
  'aes256',
  'bf',
  'bf-cbc',
  'bf-cfb',
  'bf-ecb',
  'bf-ofb',
  'blowfish',
  'camellia-128-cbc',
  'camellia-128-cfb',
  'camellia-128-cfb1',
  'camellia-128-cfb8',
  'camellia-128-ecb',
  'camellia-128-ofb',
  'camellia-192-cbc',
  'camellia-192-cfb',
  'camellia-192-cfb1',
  'camellia-192-cfb8',
  'camellia-192-ecb',
  'camellia-192-ofb',
  'camellia-256-cbc',
  'camellia-256-cfb',
  'camellia-256-cfb1',
  'camellia-256-cfb8',
  'camellia-256-ecb',
  'camellia-256-ofb',
  'camellia128',
  'camellia192',
  'camellia256',
  'cast',
  'cast-cbc',
  'cast5-cbc',
  'cast5-cfb',
  'cast5-ecb',
  'cast5-ofb',
  'des',
  'des-cbc',
  'des-cfb',
  'des-cfb1',
  'des-cfb8',
  'des-ecb',
  'des-ede',
  'des-ede-cbc',
  'des-ede-cfb',
  'des-ede-ofb',
  'des-ede3',
  'des-ede3-cbc',
  'des-ede3-cfb',
  'des-ede3-cfb1',
  'des-ede3-cfb8',
  'des-ede3-ofb',
  'des-ofb',
  'des3',
  'desx',
  'desx-cbc',
  'id-aes128-CCM',
  'id-aes128-GCM',
  'id-aes128-wrap',
  'id-aes192-CCM',
  'id-aes192-GCM',
  'id-aes192-wrap',
  'id-aes256-CCM',
  'id-aes256-GCM',
  'id-aes256-wrap',
  'id-smime-alg-CMS3DESwrap',
  'idea',
  'idea-cbc',
  'idea-cfb',
  'idea-ecb',
  'idea-ofb',
  ... 15 more items ]
* */

//加密
function cipher( algorithm, key, buf ,cb){
    var encrypted = "";
    var cip = crypto.createCipher(algorithm, key);
    encrypted += cip.update(buf, 'utf8', 'hex');
    encrypted += cip.final('hex');
    cb(encrypted);
}

//解密
function decipher( algorithm, key, encrypted, cb){
    var decrypted = "";
    var decipher = crypto.createDecipher(algorithm, key);
    decrypted += decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    cb(decrypted);
}

function cipherDecipherFile(filename,algorithm, key){
    fs.readFile(filename, "utf-8", function (err, data) {
        if (err) throw err;
        console.log(data);
        var s1 = new Date();

        cipher( algorithm, key, data, function(encrypted){
            var s2 = new Date();
            console.log('cipher:'+algorithm+','+(s2-s1) +'ms');
            // console.log(encrypted);

            decipher(algorithm, key, encrypted, function(txt){
                var s3 = new Date();
                console.log('decipher:'+algorithm+','+(s3-s2) +'ms');
                console.log(txt);
                fs.writeFile('C:/Users/Zhang Mengqian/Desktop/copy.db', txt, function(err){
                    if(err){
                        console.log("write fail!");
                    } else{
                        console.log("write success!!!");
                        var db = new sqlite3.Database('C:/Users/Zhang Mengqian/Desktop/copy.db');
                        db.serialize(function () {
                            db.each('SELECT id , name, password FROM test', function (err, row) {
                                if(err){
                                    console.log(err.stack);
                                }else {
                                    console.log(row.id + ': ' + row.name + ',' + row.password);
                                }
                            })
                        });
                    }
                });
            });
        });
    });
}

//console.log(crypto.getCiphers());
//var algs = ['blowfish','aes-256-cbc','cast','des','des3','idea','rc2','rc4','seed'];
var key = "abc";
var filename = "C:/Users/Zhang Mengqian/Desktop/testdb.db";
// var filename = "database";
cipherDecipherFile(filename, 'aes256' ,key);
