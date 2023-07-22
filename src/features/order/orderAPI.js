// A mock function to mimic making an async request for data
export function addOrder(order) {
  return new Promise(async(resolve) =>{
    const respense = await fetch('http://localhost:8080/orders',{
      method:'POST',
      body: JSON.stringify(order),
      headers:{'content-type': 'application/json'}
    })
    const data = await respense.json();
    resolve({data});
  }
  );
}
