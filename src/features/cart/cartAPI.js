// A mock function to mimic making an async request for data
export function addToCart(item) {
  return new Promise(async(resolve) =>{
    const respense = await fetch('http://localhost:8080/cart',{
      method:'POST',
      body: JSON.stringify(item),
      headers:{'content-type': 'application/json'}
    })
    const data = await respense.json();
    resolve({data});
  }
  );
}

export function fetchItemsByUserId() {
  return new Promise(async(resolve) =>{
    const respense = await fetch('http://localhost:8080/cart')
    const data = await respense.json();
    resolve({data});
  }
  );
}

export function updateCart(update) {
  return new Promise(async(resolve) =>{
    const respense = await fetch('/cart/'+update.id,{
      method:'PATCH',
      body: JSON.stringify(update),
      headers:{'content-type': 'application/json'}
    })
    const data = await respense.json();
    resolve({data});
  }
  );
}

export function deleteItemFromCart(itemId) {
  return new Promise(async(resolve) =>{
    const respense = await fetch('/cart/'+itemId,{
      method:'DELETE',
      headers:{'content-type': 'application/json'}
    })
    // const data = await respense.json();
    resolve({data:{id:itemId}});
  }
  );
}

export async function resetCart() {
 return new  Promise (async(resolve)=>{
 const response = await fetchItemsByUserId();
 const items =  response.data;
 for(let item of items){
  await deleteItemFromCart(item.id);
  console.log("deleted "+item.id);
 }
 resolve({status:'success'});
 }
 );
}