// A mock function to mimic making an async request for data
export function addOrder(order) {
  return new Promise(async(resolve) =>{
    const respense = await fetch('/orders',{
      method:'POST',
      body: JSON.stringify(order),
      headers:{'content-type': 'application/json'}
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
    const respense = await fetch('/orders?'+queryString)
    const data = await respense.json();
    const totalOrders = await respense.headers.get('X-Total-Count');
    resolve({data:{orders:data,totalOrders:+totalOrders}});
  }
  );
}

export function updateOrder(order) {
  return new Promise(async(resolve) =>{
    const respense = await fetch('/orders/'+order.id,{
      method:'PATCH',
      body: JSON.stringify(order),
      headers:{'content-type': 'application/json'}
    })
    const data = await respense.json();
    resolve({data});
  }
  );
}