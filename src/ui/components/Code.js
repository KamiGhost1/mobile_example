import React, { useEffect, useState } from 'react'
import styles from '../css/index.module.css'
import Navbar from '../elements/navbar.js';
import Button from '../elements/button';
import Input from '../elements/Input';
import Back from '../elements/Back';


export default function Code(props) {

    const [code, setCode] = useState()
    const [isValue, setValue] = useState('')

    const handle_change = (e)=>{
        setCode(e.target.value)
        setValue(e.target.value)
    }



    return (
        <div className={styles.main}>
            <Navbar />
            <Back onClick={()=>{props.setCode(false)}}/>
            <div className={styles.content}>

                <Input type="text" placeholder="code" className={styles.field} onChange={handle_change} value={isValue}/>
                <Button text="Execute" className={styles.full} onClick={()=>{
                    try{
                        eval(code)
                    }catch (e){
                        console.warn(e);
                    }
                }}/>
                <Button text="Clear" className={styles.full + " " + styles.red} onClick={()=>{
                    setCode('')
                    setValue('')
                }}/>

                <div className={styles.card} onClick={e=>{
                    console.log(e.target.innerText)
                    setValue(e.target.innerText)
                    setCode(e.target.innerText)
                }}>
                    alert('hello')
                </div>
            </div>
        </div>
    )
}