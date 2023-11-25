import React, { useEffect, useState } from 'react'
import styles from '../css/index.module.css'
import Navbar from '../elements/navbar.js';
import Button from '../elements/button';
import Input from '../elements/Input';
import Back from "../elements/Back"

import { Crypto } from "../../crypto"
import { getAccount, setAccount, encrypt, decrypt } from '../../Locker';


export default function Password(props) {

    const [isPassword, setPassword] = useState("")
    const crypto = new Crypto()

    const handle_change_password = (e)=>{
        setPassword(e.target.value)
    }

    const submit = (passwd = false)=>{
        let check
        console.log(passwd);
        if(!passwd){
            check = decrypt(isPassword)   
        }else{
            check = decrypt(passwd)
        }

        if(!check){
            console.log("wrong password");
        }else{
            props.setAccount(getAccount())
            props.setLogin(true)
        }
        
    }


    useEffect(()=>{
        console.log(props.isBioAvailable);
    })

    return (
        <div className={styles.main}>
            <Navbar />
            <div className={styles.content}>
                <Input placeholder="password" className={styles.field} onChange={handle_change_password}/>
                <Button text="Login" className={styles.full} onClick={()=>{
                    submit()
                }}/>
                { props.isBioAvailable && <Button text="Bio" className={styles.full} onClick={async ()=>{
                    let check = await props.verifyBio()
                    if(check){
                        // success
                        let passwd = await props.getBio()
                        // console.log(passwd.password);
                        setPassword(passwd.password)
                        submit(passwd.password)
                    }else{
                        // fail
                        console.log("wrong biometry");
                    }
                }}/>}
            </div>
        </div>
    )
}