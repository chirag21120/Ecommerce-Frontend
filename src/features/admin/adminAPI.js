// A mock function to mimic making an async request for data
export function fetchAllAdminProducts() {
  return new  Promise(async(resolve) =>{
    //To-Do we will not hard code  
    const respense = await fetch('/products')
    const data = await respense.json();
    resolve({data});
  }
  );
}
export function createProduct(product) {
  return new  Promise(async(resolve) =>{
    //To-Do we will not hard code  
    const respense = await fetch('/products/',{
      method:'POST',
      body: JSON.stringify(product),
      headers: {'content-type':'application/json'}
    })
    const data = await respense.json();
    resolve({data});
  }
  );
}

export function fetchAdminProductsByFilters(filter,sort,pagination) {
  //filter ={"category":smartphone}
  //sort= {_sort:"price",_order:"desc"}
  //pagination = {_page:1,_limit=10} 
  let queryString = '';
  for(let key in filter){
    const categoryValues = filter[key];
    if(categoryValues.length){
      queryString += `${key}=${categoryValues}&`;
    }
  }
  for(let key in sort){
    queryString+= `${key}=${sort[key]}&`;
  }
  for(let key in pagination){
    queryString+= `${key}=${pagination[key]}&`;
  }
  return new  Promise(async(resolve) =>{
    //To-Do we will not hard code  
    const respense = await fetch(`/products/admin?`+queryString)
    const data = await respense.json();
    const totalItems = await respense.headers.get('X-Total-Count');
    resolve({data:{products:data,totalItems:totalItems}});
  }
  );
}

export function fetchProductById(id) {
  return new  Promise(async(resolve) =>{
    //To-Do we will not hard code  
    const respense = await fetch('/products/'+id)
    const data = await respense.json();
    resolve({data});
  }
  );
}

export function updateProduct(update) {
  return new Promise(async(resolve) =>{
    const respense = await fetch('/products/'+update.id,{
      method:'PATCH',
      body: JSON.stringify(update),
      headers:{'content-type': 'application/json'}
    })
    const data = await respense.json();
    resolve({data});
  }
  );
}

