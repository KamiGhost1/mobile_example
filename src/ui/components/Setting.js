import React, { useEffect, useState } from 'react'
import styles from '../css/index.module.css'
import Navbar from '../elements/navbar.js';
import Button from '../elements/button';
import Input from '../elements/Input';
import Back from "../elements/Back";
import { getIP, setIP } from '../../apiController';


export default function Setting(props) {

    const [isIp, setIp] = useState(getIP())

    const handle_change_ip = (e)=>{
        setIp(e.target.value)
    }

    const submit = ()=>{
        setIP(isIp)
    }

    return (
        <div className={styles.main}>
            <Navbar />
            <Back onClick={()=>{
                props.setSettings(false)
            }}/>
            <div className={styles.content}>
                <Input placeholder="IP" className={styles.field} value={isIp} onChange={handle_change_ip}/>
                <Button text="Save" className={styles.full} onClick={()=>{
                    submit()
                }}/>
            </div>
        </div>
    )
}