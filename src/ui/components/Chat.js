import React, { useEffect, useState } from 'react'
import styles from '../css/index.module.css'
import Navbar from '../elements/navbar.js';
import Button from '../elements/button';
import Input from '../elements/Input';
import Back from "../elements/Back"
import Space from '../elements/Space';
import { apiController } from '../../apiController';
import { Crypto } from '../../crypto';


export default function Chat(props) {

    const [isMsg, setMsg] = useState([])
    const [isSendMsg, setSendMsg] = useState('')

    const handle_change_msg = (e)=>{
        setSendMsg(e.target.value)
    }

    const crypto = new Crypto()
    global.CCrypto = crypto
    let time = 500
    let timer 
    useEffect(()=>{
        
        apiController.getMsg().then(data=>{
            renderMsg(data)
        }).catch(()=>{})

        timer = setInterval(()=>{
            apiController.getMsg().then(data=>{
                renderMsg(data)
            }).catch(()=>{})
        }, time)

        props.setTimer(timer)
    }, [2])

    const renderMsg = msgs=>{
        let array = []
        let i = 0
        for(let msg of msgs){
            array.push(
                <div key={i} className={styles.msg}>
                    <div className={styles.name}>
                        {msg.from}
                    </div>
                    <div className={styles.text}>
                        {msg.text}
                    </div>
                </div>
            )
            i++
        }
        // console.log(array);
        setMsg(array)
    }


    const send = ()=>{
        let Account = props.Account
        
        const hash = crypto.sha256(isSendMsg)
        const sign = crypto.ECDSA_sign(isSendMsg, Account.privateKey, hash)
        const publicKey = crypto.getPublicKey(Account.privateKey)

        const msg = {
            from:Account.name+' '+Account.group,
            text: isSendMsg,
            sign: sign,
            publicKey: publicKey
        }

        // console.log(msg);

        apiController.postMsg(msg)
        setSendMsg('')
        
    }
    return (
        <div className={styles.main}>
            <Navbar />

            <Back onClick={()=>{
                clearInterval(props.isTimer)
                props.setChat(false)
            }}/>
            <div className={styles.content}>
                <Space content={isMsg}/>
                <Input placeholder="Message" className={styles.field} value={isSendMsg} onChange={handle_change_msg}/>
                <Button  text="send" className={styles.full} onClick={()=>{send()}}/>
            </div>
        </div>
    )
}