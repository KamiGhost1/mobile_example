const CryptoJS = require("crypto-js");

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

    
let Crypto = function(){
    this.sha256 = (msg)=>{
        return CryptoJS.SHA256(msg).toString()
    }
    
    this.AES_encrypt=(msg, key)=>{
        return CryptoJS.AES.encrypt(msg, key, {mode:CryptoJS.mode.CBC, padding: CryptoJS.pad.AnsiX923}).toString()
    }
    this.AES_decrypt=(emsg, key)=>{
        return CryptoJS.AES.decrypt(emsg, key, {mode:CryptoJS.mode.CBC, padding: CryptoJS.pad.AnsiX923}).toString(CryptoJS.enc.Utf8)
    }

    this.strongPassword=(password)=>{
        let rounds = 1e4
        let salt = "!$321"
        let secondSalt = "^%*sAlTY"

        password= salt + password
        for(let i =0; i< rounds; i++){
            password = this.sha256(password)
        }

        password= password + secondSalt
        for(let i =0; i< rounds; i++){
            password = this.sha256(password)
        }

        return password
    }

    this.decrypt = (emsg, key)=>{
        return this.AES_decrypt(emsg, this.strongPassword(key))
    }
    this.encrypt = (msg, key)=>{
        return this.AES_encrypt(msg, this.strongPassword(key))
    }

    this.generatePrivateKey= ()=>{
        // return ec.genKeyPair();
        return ec.genKeyPair().priv.toString(16);
    }

    this.getPublicKey = (privateKey) => {
        return ec.keyFromPrivate(privateKey).getPublic(true, 'hex')
    }

    this.ECDSA_sign = (msg, privateKey, hash)=>{
        let _localHash = this.sha256(msg)

        if(hash !== _localHash){
            throw new Error("msg now equal hash")
        }
        let keys = ec.keyFromPrivate(privateKey)

        let signature = keys.sign(hash);

        let derSign = signature.toDER();

        return derSign
    }

}

export{
    Crypto
}