import React, { useEffect, useState } from 'react'
import styles from '../css/index.module.css'
import Navbar from '../elements/navbar.js';
import Button from '../elements/button';
import Input from '../elements/Input';
import Back from "../elements/Back"

import { LocalStorage } from '../Utils';
import { AccountClass } from '../../Account';
import { ACCOUNT } from '../../Names';
import { Crypto } from "../../crypto"



export default function AccountPage(props) {

    const [isName, setName] = useState();
    const [isGroup, setGroup] = useState();
    const [isPasswordField, setPasswordField] = useState('')
    const [isNotLogin, setLogin] = useState(true)
    const [isBioAvailable, setBioAvailable] = useState(false)

    const crypto = new Crypto()

    const handle_change_name = (e)=>{
        setName(e.target.value)
    }

    const handle_change_group = (e)=>{
        setGroup(e.target.value)
    }
    
    const handle_change_passwd = (e)=>{
        setPasswordField(e.target.value)
    }

    useEffect( ()=>{
        let account = LocalStorage.GetItem(ACCOUNT)
        if(account === null){
            setLogin(false)
        }
    }, [])


    

    return (
        <div className={styles.main}>
            <Navbar />
            { isNotLogin && <Back onClick={()=>{
                props.setAccountPage(false)
            }}/>}
            <div className={styles.content}>
                <div>{props.Account.name}</div>
                <div>{props.Account.group}</div>
                <div>{props.Account.publicKey}</div>
                <Input placeholder="name" className={styles.field} onChange={handle_change_name}/>
                <Input placeholder="group" className={styles.field} onChange={handle_change_group}/>
                <Input placeholder="Password" className={styles.field} onChange={handle_change_passwd}/>
                <Button text="Save account" className={styles.full} onClick={()=>{
                    if(isPasswordField.length > 0){
                        let account = new AccountClass(isName, isGroup)
                        account.generatePrivateKey()
                        LocalStorage.SetItem(ACCOUNT, crypto.encrypt(JSON.stringify(account), isPasswordField))
                        props.setAccount(account)
                        if(props.isBioAvailable){
                            props.saveBio(isPasswordField)
                        }
                    }else{
                        alert("enter password")
                    }
                    
                    if(!isNotLogin){
                        props.setNewAccount(false)
                    }

                    

                }}/>
            </div>
        </div>
    )
}