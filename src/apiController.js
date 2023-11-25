
const ip = "http://109.107.171.36:8088"

const apiController = {
    getRegister: async ()=>{
        // return await getRequest("http://109.107.171.36:8088/register")
        return await getRequest(`${ip}/register`)

    },
    postRegistration : async (hash, sign, publicKey, msg)=>{
        // return await postRequest("http://109.107.171.36:8088/register", {hash, sign, publicKey, challenge:msg})
        return await postRequest(`${ip}/register`, {hash, sign, publicKey, challenge:msg})
    },

    getMsg: async ()=>{
        return await getRequest(`${ip}/msg`)
    },
    postMsg: async(msg)=>{
        return await postRequest(`${ip}/msg`, msg)
    }
}

const getRequest = (api)=>{
    return new Promise((resolve, reject)=>{
        fetch(api, {
            method:"GET"
        }).then(response => response.json())
            .then(data => {
                resolve(data)
            }).catch(err =>{
            console.warn(err)
             reject(err)
        }).catch(e=>{
            console.warn(e);
            reject(e)
        })
    })
    
}

const postRequest = (api, body)=>{
    // console.log(body);
    return new Promise((resolve, reject)=>{
        fetch(api, {
            method:"POST",
            body:new URLSearchParams(body),
            mode:"cors",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
            // headers:{
            //     "Content-Type": "application/text"
            // },
        }).then(response => response.json())
            .then(data => {
                 resolve(data)
            }).catch(err =>{
            console.warn(err)
            reject(false)
        }).catch(e=>{
            console.warn(e);
            reject(e)
        })
    })
    
}


export {
    apiController
}