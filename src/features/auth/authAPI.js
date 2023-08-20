// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async(resolve,reject) =>{
    try {
      const respense = await fetch('/auth/signup',{
        method:'POST',
        body: JSON.stringify(userData),
        headers:{'content-type': 'application/json'}
      })
      if(respense.ok){
        const data = await respense.json();
        resolve({data});
      }else{
        const err = await respense.json();
        reject({err});
      }
    } catch (error) {
      reject({message:"User with this email already exists"});
    }
  }
  );
}

export function loginUser(loginInfo) {
  return new Promise(async(resolve,reject) =>{
    try {
      const respense = await fetch('/auth/login',{
        method: 'POST',
        body : JSON.stringify(loginInfo),
        headers:{'content-type': 'application/json'}
      })
     if(respense.ok){
      const data = await respense.json();
       resolve({data})
     }
     else{
      const err = await respense.json();
      reject({err})
     }
    
    } catch (error) { 
      reject({message:'user not found'})
    }});
}

export function checkAuth() {
  return new Promise(async(resolve,reject) =>{
    try {
      const respense = await fetch('/auth/check')
     if(respense.ok){
      const data = await respense.json();
       resolve({data})
     }
     else{
      const err = await respense.json();
      reject({err})
     }
    
    } catch (error) { 
      reject({message:'user not found'})
    }});
}

export function signOut() {
  return new Promise(async(resolve,reject) =>{
    try {
      const respense = await fetch('/auth/logout')
     if(respense.ok){ 
       resolve({data:"success"})
     }
     else{
      const err = await respense.json();
      reject({err})
     }
    
    } catch (error) { 
      reject({message:'user not found'})
    }});
  }

export function resetPasswordRequest(email) {
  return new Promise(async(resolve,reject) =>{
   try {
      const respense = await fetch('/auth/reset-password-request',{
        method:'POST',
        body: JSON.stringify({email}),
        headers:{'content-type': 'application/json'}
      })
     if(respense.ok){
      const data = await respense.json();
       resolve({data})
     }
     else{
      const err = await respense.json();
      reject({err})
     }
    
    } catch (error) { 
      reject({message:'user not found'})
    }});
}

export function resetPassword(data) {
  return new Promise(async(resolve,reject) =>{
   try {
      const respense = await fetch('/auth/reset-password',{
        method:'POST',
        body: JSON.stringify(data),
        headers:{'content-type': 'application/json'}
      })
     if(respense.ok){
      const datar = await respense.json();
       resolve({datar})
     }
     else{
      const err = await respense.json();
      reject({err})
     }
    
    } catch (error) { 
      reject({message:'user not found'})
    }});
}
