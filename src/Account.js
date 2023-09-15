import { Crypto } from "./crypto"

let crypto = new Crypto()

class AccountClass {
    name = ""
    group = ""
    privateKey = ""
    publicKey = ""
    constructor(name, group){
        this.group = group
        this.name = name
        
        return this;
    }

    generatePrivateKey = ()=>{
        this.privateKey = crypto.generatePrivateKey()
        
    }

    generatePublicKey = ()=>{
        this.publicKey = crypto.getPublicKey(this.privateKey)
    }

    sign = (msg, hash = false)=>{
        if(!hash){
            hash = crypto.sha256(msg)
        }

        console.log(this);
        try{
            let _sign = crypto.ECDSA_sign(msg, this.privateKey, hash)
            return _sign
        }catch (e){
            console.error(e);
            return null
        }
        
    }
}

const generateAccount = (name, group)=> {
    return new Account(name, group);
}

export{
    AccountClass,
    generateAccount
}