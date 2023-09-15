import React, { useEffect, useState } from 'react'
import MainPage from "./components/MainPage"
import Code from './components/Code'
import AccountPage from './components/AccountPage'
import { LocalStorage } from './Utils'
import { ACCOUNT } from '../Names'
import {Crypto} from '../crypto'
import {AccountClass} from "../Account"

export default function App(props) {

    const [isCode, setCode] = useState(false)
    const [isAccountPage, setAccountPage] = useState(false)

    const [Account, setAccount] = useState(false)


    global.getAccount = ()=>{
        return Account
    };

    global.sha = ()=>{
        let e = CryptoLib.encrypt("hello world", "1234")
        let d = CryptoLib.decrypt(e, "1234")
        console.log({e, d});
    }

    let crypto = new Crypto()


    global.CryptoLib = crypto

    useEffect(()=>{
        let _account = LocalStorage.GetItem(ACCOUNT)
        try{
            _account = JSON.parse(crypto.decrypt(_account, "1234"))
            let _pk = _account.privateKey
            _account = new AccountClass(_account.name, _account.group)

            _account.privateKey = _pk
            _account.generatePublicKey()
            setAccount(_account)
        }catch (e){
            console.warn(e);
        }
    },[])

    if(isAccountPage){
        return <AccountPage setAccountPage ={setAccountPage} Account={Account} setAccount={setAccount}/>
    }

    if(isCode){
        return <Code setCode={setCode}/>
    }
    
    return <MainPage 
        setCode={setCode}
        setAccountPage={setAccountPage}
    />
}
