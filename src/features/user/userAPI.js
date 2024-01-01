// A mock function to mimic making an async request for data
export function fetchLoggedInUserOrders() {
  return new Promise(async(resolve) =>{
    const respense = await fetch('http://localhost:8080/orders/own', {
      method: 'GET',
      credentials: 'include', // Important for sending cookies
      // Other options...
    })
    const data = await respense.json();
    resolve({data});
  }
  );
}

export function fetchLoggedInUser() {
  return new Promise(async(resolve) =>{
    const respense = await fetch('http://localhost:8080/users/own', {
      method: 'GET',
      credentials: 'include', // Important for sending cookies
      // Other options...
    })
    const data = await respense.json();
    resolve({data});
  }
  );
}

export function updateUser(update) {
  return new Promise(async(resolve) =>{
    const respense = await fetch('http://localhost:8080/users/'+update.id,{
      method:'PATCH',
      body: JSON.stringify(update),
      headers:{'content-type': 'application/json'},
      credentials: 'include',
    })
    const data = await respense.json();
    resolve({data});
  }
  );
}
