// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new  Promise(async(resolve) =>{
    //To-Do we will not hard code  
    const respense = await fetch('/products')
    const data = await respense.json();
    resolve({data});
  }
  );
}


export function fetchProductsByFilters(filter,sort,pagination) {
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
    const respense = await fetch('/products?'+queryString)
    const data = await respense.json();
    const totalItems = await respense.headers.get('X-Total-Count');
    resolve({data:{products:data,totalItems:totalItems}});
  }
  );
}

export function fetchCategory() {
  return new  Promise(async(resolve) =>{
    //To-Do we will not hard code  
    const respense = await fetch('/category')
    const data = await respense.json();
    resolve({data});
  }
  );
}

export function fetchBrands() {
  return new  Promise(async(resolve) =>{
    //To-Do we will not hard code  
    const respense = await fetch('/brands')
    const data = await respense.json();
    resolve({data});
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