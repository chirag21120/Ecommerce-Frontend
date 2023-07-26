// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async(resolve) =>{
    const respense = await fetch('http://localhost:8080/auth/signup',{
      method:'POST',
      body: JSON.stringify(userData),
      headers:{'content-type': 'application/json'}
    })
    const data = await respense.json();
    resolve({data});
  }
  );
}

export function loginUser(loginInfo) {
  return new Promise(async(resolve,reject) =>{
    try {
      const respense = await fetch('http://localhost:8080/auth/login',{
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
      const respense = await fetch('http://localhost:8080/auth/check')
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

export function signOut(userId) {
  return new Promise(async(resolve) =>{
    resolve({data:'success'});
  }
  );
}

