import React, { useEffect, useState } from 'react'
import styles from '../css/index.module.css'
import Navbar from '../elements/navbar.js';
import Button from '../elements/button';
import { LocalStorage } from '../Utils';
import { AccountClass } from '../../Account';
import { registerPlugin } from '@capacitor/core'
import { apiController } from '../../apiController';
import { Crypto } from '../../crypto';

global.Account = AccountClass

const crypto = new Crypto()

export default function MainPage(props) {

    const [msg, setMsg] = useState('')

    global.apiController = apiController

    useEffect(()=>{
        console.log(props.Account);
        try{
            // check_registration().then(data=>{
            //     if(data === true){
            //         // все хорошо, можем рендерить чат
            //         return
            //     }
            //     console.log(data);
            //     registration(data.challenge) // остановились здесь. 
            // }).catch(e=>{
            //     console.error(e);
            // })
        }catch(e){
            console.error(e);
        }
        
    }, [])


    const Student = registerPlugin("Student")

    const androidTest = async()=>{
        await Student.test1().then(data=>{
            try{
                setMsg(data.msg);
            }catch (e){
                setMsg("wrong")
            }
        })
    }


    return (
        <div className={styles.main}>
            <Navbar />
            
            <div className={styles.content}>
                <Button text="Account" className={styles.full} onClick={()=>{props.setAccountPage(true)}}/>
                <Button text="Chat" className={styles.full} onClick={()=>{props.setChat(true)}}/>
                <Button text="Code" className={styles.full} onClick={()=>{props.setCode(true)}}/>
                <Button text="Test Android" className={styles.full} onClick={()=>{androidTest()}}/>
                <Button text="Settings" className={styles.full} onClick={()=>{
                    props.setSettings(true)
                }}/>


            </div>
        </div>
    )
}