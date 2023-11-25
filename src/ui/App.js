import React, { useEffect, useState } from 'react'
import MainPage from "./components/MainPage"
import Code from './components/Code'
import AccountPage from './components/AccountPage'
import { LocalStorage } from './Utils'
import { ACCOUNT } from '../Names'
import {Crypto} from '../crypto'
import {AccountClass} from "../Account"
import Password from './components/Password'
import { NativeBiometric } from "capacitor-native-biometric";
import Chat from './components/Chat'
import Setting from './components/Setting'


export default function App(props) {

    const [isCode, setCode] = useState(false)
    const [isAccountPage, setAccountPage] = useState(false)
    const [Account, setAccount] = useState(false)
    const [isLogin, setLogin] = useState(false)
    const [isNewAccount, setNewAccount] = useState(false)
    const [isBioAvailable, setBioAvailable] = useState(false)
    const [isChat, setChat] = useState(false)
    const [isSettings, setSettings] = useState(false)

    const [isTimer, setTimer] = useState(null)

    let crypto = new Crypto()

    const BioCheck = async ()=>{
        if(checkDevice()){
            const result = await NativeBiometric.isAvailable();
            if(!result.isAvailable) 
                return false;
            return true
        }else{
            return false
        }
    }

    global.CryptoLib = crypto

    useEffect(()=>{
        let _account = LocalStorage.GetItem(ACCOUNT)
        if(_account === null){
            setNewAccount(true)
        }
        BioCheck().then(result=>{setBioAvailable(result); console.log(result)})
        // console.log(isBioAvailable);
    },[])

    const saveBio = async (password)=>{
        await NativeBiometric.setCredentials({
            username: "username",
            password: password,
            server: "localhost",
          }).then();
        
        return true
        
    }

    const verifyBio = async ()=>{
        const verified = await NativeBiometric.verifyIdentity({
            reason: "For easy log in",
            title: "Log in",
            subtitle: "Maybe add subtitle here?",
            description: "Maybe a description too?",
          })
            .then(() => true)
            .catch(() => false);

        return verified
    }

    const getBio = async()=>{
        const credentials = await NativeBiometric.getCredentials({
            server: "localhost",
          });
        return credentials
    }


    if(isSettings){
        return <Setting setSettings={setSettings}/>
    }
   

    if(isCode){
        return <Code setCode={setCode}/>
    }

    if(isChat){
        return <Chat Account={Account} setChat={setChat} isTimer={isTimer} setTimer={setTimer}/>
    }

    if(isAccountPage || isNewAccount){
        return <AccountPage setAccountPage ={setAccountPage} Account={Account} setAccount={setAccount} setNewAccount={setNewAccount} isBioAvailable={isBioAvailable} saveBio={saveBio}/>
    }

    if(isLogin){
        return <MainPage 
        setCode={setCode}
        setAccountPage={setAccountPage}
        Account={Account}
        setChat={setChat}
        setSettings={setSettings}
        />
        
    }

    

    return <Password setAccount={setAccount} setLogin={setLogin} isBioAvailable={isBioAvailable} verifyBio={verifyBio} getBio={getBio}/>
}
