// A mock function to mimic making an async request for data
export function fetchLoggedInUserOrders(userId) {
  return new Promise(async(resolve) =>{
    const respense = await fetch('http://localhost:8080/orders/own?id='+userId)
    const data = await respense.json();
    resolve({data});
  }
  );
}

export function fetchLoggedInUser(userId) {
  return new Promise(async(resolve) =>{
    const respense = await fetch('http://localhost:8080/users/'+userId)
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
      headers:{'content-type': 'application/json'}
    })
    const data = await respense.json();
    resolve({data});
  }
  );
}
