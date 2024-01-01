// A mock function to mimic making an async request for data
export function addOrder(order) {
  return new Promise(async(resolve) =>{
    const respense = await fetch('http://localhost:8080/orders',{
      method:'POST',
      body: JSON.stringify(order),
      headers:{'content-type': 'application/json'},
      credentials: 'include',
    })
    const data = await respense.json();
    resolve({data});
  }
  );
}

export function fetchAllOrders(pagination,sort) {
  return new  Promise(async(resolve) =>{
    //To-Do we will not hard code 
    let queryString = '';
  for(let key in pagination){
    queryString+= `${key}=${pagination[key]}&`;
  }
  for(let key in sort){
    queryString+= `${key}=${sort[key]}&`;
  }
    //To-Do we will not hard code  
    // const respense = await fetch(`/orders?items.admin=${admin}&`+queryString)
    const respense = await fetch('http://localhost:8080/orders?'+queryString, {
      method: 'GET',
      credentials: 'include', // Important for sending cookies
      // Other options...
    })
    const data = await respense.json();
    const totalOrders = await respense.headers.get('X-Total-Count');
    resolve({data:{orders:data,totalOrders:+totalOrders}});
  }
  );
}

export function updateOrder(order) {
  return new Promise(async(resolve) =>{
    const respense = await fetch('http://localhost:8080/orders/'+order.id,{
      method:'PATCH',
      body: JSON.stringify(order),
      headers:{'content-type': 'application/json'},
      credentials: 'include',
    })
    const data = await respense.json();
    resolve({data});
  }
  );
}