import { ACCOUNT } from './Names'
import {Crypto} from './crypto'
import { LocalStorage } from './ui/Utils'
let crypto = new Crypto()
let account 

const encrypt = (password)=>{
    LocalStorage.SetItem(ACCOUNT, crypto.encrypt(JSON.stringify(account), password))
}
const decrypt = (password)=>{
    try{
        let data = crypto.decrypt(LocalStorage.GetItem(ACCOUNT), password)
        account = JSON.parse(data)
        return true
    }catch (e){
        console.warn(e);
        return false
    }
}

let getAccount = ()=>{
    return account
}

let setAccount = (acc) =>{
    account = acc
}



export{
    decrypt, 
    encrypt,
    getAccount, 
    setAccount
}