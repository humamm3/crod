let title = document.getElementById( 'title');
let price = document.getElementById( 'price');
let taxes = document.getElementById( 'taxes');
let ads = document.getElementById( 'ads');
let discount = document.getElementById( 'discount');
let total = document.getElementById( 'total');
let count = document.getElementById( 'count');
let category = document.getElementById( 'category');
let submit = document.getElementById( 'submit');
let mood = 'create';
let tmp = 0;


// get Total
function gettotal()
{
  if(price.value !=''){
    let result = (+price.value + +taxes.value + +ads.value)
    - +discount.value;
    total.innerHTML = result;
    total.style.background = '#040'
  } else{
    total.innerHTML = '';
    total.style.background = 'rgb(181, 105, 29)'
  }
}





// create product


let datapro;
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro = [];
}


submit.onclick = function(){
    let newpor = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(mood === 'create'){
      if(newpor.count > 1){
        for(let i = 0; i < newpor.count;i++){
            datapro.push({newpor});
        }  
    }else{
        datapro.push(newpor);
    }  
    }else{
           datapro[   tmp   ] = newpor;
           mood = 'create';
           submit.innerHTML = 'create';
           count.style.display = 'block';
    }
    


    
    // save localstorage
    localStorage.setItem('product',   JSON.stringify(datapro)     )
    cleardata()
    showdata()
}




// clear inputs
function cleardata(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    
}


// read
function showdata()
{
    gettotal()
    let table = '';
    for(let i = 0; i < datapro.length;i++){
        table += `
     <tr>
        <td>${i} </td>
        <td>${datapro[i].title} </td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td>
        <button onclick="updatedata(${i}) " id="update">update</button>
        </td>
        <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
     </tr>
        `;

    }

    document.getElementById('tbody').innerHTML = table;
    let btndelete = document.getElementById('deleteall');
    if(datapro.length > 0){
        btndelete.innerHTML = `
         <button onclick="deleteall() ">delete All (${datapro.length}) </button>
        `
    }else{btndelete.innerHTML = '';

    }

}
showdata()



// delete
function deletedata(i){
datapro.splice(i,1)
localStorage.product = JSON.stringify(datapro)
showdata()
}
function deleteall(){
    localStorage.clear()
    datapro.splice(0)
    showdata()
}
// count

// update
function updatedata(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    gettotal()
    count.style.display = 'none';
    category.value = datapro[i].category;
    submit.innerHTML = 'update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth',
        
    })
    
}
// search

let searchmood = 'title';

function getsearchmood(id)
{

    let search = document.getElementById('search');
    if(id == 'searchtitle'){
       searchmood = 'title';
       
    }else{
       searchmood = 'category';
       
    }
    search.placeholder = 'search By '+searchmood;
  search.focus()  
  search.value = '';
  showdata()
       
}

function searchdata(value)
{
    let table = '';
    if(searchmood == 'title')
        {
           for(let i = 0; i < datapro.length;i++){
            if(datapro[i].title.includes(value.tolowercase())){
                table += `
     <tr>
        <td>${i} </td>
        <td>${datapro[i].title} </td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td>
        <button onclick="updatedata(${i}) " id="update">update</button>
        </td>
        <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
     </tr>
        `;
            }
           }



        }
        
        
        
        else
        {
           
            for(let i = 0; i < datapro.length;i++){
                if(datapro[i].category.includes(value.toLowerCase())){
                    table += `
         <tr>
            <td>${i} </td>
            <td>${datapro[i].title} </td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td>
            <button onclick="updatedata(${i}) " id="update">update</button>
            </td>
            <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
         </tr>
            `;
                }
               } 

        }
        document.getElementById('tbody').innerHTML = table;

}






// clean data