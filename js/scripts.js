/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
// 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});


let selectId = 0
let BASE_URL = "http://localhost:3000"
let productsArr = [];
let editForm = document.querySelector("#editForm");
let editName = document.querySelector("#editName");
let editDescription = document.querySelector("#editDescription");
let table = document.querySelector("#datatablesSimple");
let editPrice = document.querySelector("#editPrice");
let editImage = document.querySelector("#editImage");
let searchInp = document.querySelector("#searchInp");

function alertMessage(type, message) {
    let div = document.createElement("div");
    div.className = `alert alert-${type} mt-3 alertMsg`;
    div.role = "alert";
    div.innerHTML = message;
    document.querySelector(".card-body").appendChild(div)

    setTimeout(() => {
        div.remove()
    }, 2500);
}
getData()
async function getData() {
    
    try {
        let response = await fetch(`${BASE_URL}/products`)
        let result = await response.json()
        productsArr = result;
        result.sort((a, b) => a.addPrice - b.addPrice)

        createTable(result)


        searchInp.addEventListener("input", (e)=>{
            let value = e.target.value.toLowerCase().trim()
        
            let filters =  productsArr.filter((item)=>{
            return item.addName.toLowerCase().trim().includes(value)
                
            })
            // console.log(filters);
            
            createTable(filters)
            
            
        })


       
       

    } catch (error) {
        alertMessage("danger", "Something is wrong...")
    }
}

function createTable(arr){
  
    let data = `
    <thead>
       <tr>
           <th>Product's Name</th>
           <th>Product's Description</th>
           <th>Product's Price ($)</th>
           <th>Operations</th>
          
       </tr>
   </thead>
   `
           arr.forEach((products) => {
               data += `
   <tr>
      <td>${products.addName}</td>
      <td>${products.addDescription}</td>
      <td>${products.addPrice}</td>
      <td class="d-flex justify-content-end">
          <button onclick="viewComponents('${products.id}')" class="btn btn-primary btn-small" data-bs-toggle="modal" data-bs-target="#viewModal"><i  class="fa-solid fa-eye"></i></button>
          <button onclick="getById('${products.id}')" class="btn btn-warning btn-small  ms-1 " data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
          <button onclick="deleteItem(this, '${products.id}')" class="btn btn-danger btn-small ms-1 ">Delete</button>
             </td>                                   
         </tr>  `
           });
           table.innerHTML = data;
}

async function deleteItem(deleted, id) {
    try {
        let response = await fetch(`${BASE_URL}/products/${id}`, {
            method: "DELETE"
        })
        if (response.status === "200") {
            let productsDelete = deleted.parentElement.parentElement
            productsDelete.remove()

        }
        alertMessage("success", "Deleted successfully")
    } catch (error) {
        alertMessage("danger", "Something went wrong while deleting")
    }
}

async function getById(id) {
    selectId = id
    let response = await fetch(`${BASE_URL}/products/${id}`)
    let result = await response.json()

    editName.value = result.addName
    editDescription.value = result.addDescription
    editPrice.value = result.addPrice


}
editForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let newData = {
        addName: editName.value,
        addDescription: editDescription.value,
        addPrice: editPrice.value
    }
    await fetch(`${BASE_URL}/products/${selectId}`, {
        method: "PATCH",
        body: JSON.stringify(newData)
    })
})


async function viewComponents(id) {
    let modal_body = document.querySelector("#modal-body")
    // let addName = document.querySelector("#addName").value;
    // let addDescription = document.querySelector("#addDescription").value;
    // let addPrice = document.querySelector("#addPrice").value;
    // let addImage = document.querySelector("#addImage").value;
    let response = await fetch(`${BASE_URL}/products/${id}`)
    let result = await response.json();
    console.log(result);



    data = `
 <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${result.addImage}"
                    class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${result.addName}</h5>
                    <p class="card-text">
                    ${result.addDescription}
                    </p>
                    <p class="card-text"><small class="text-body-secondary">${result.addPrice}$
                            </small></p>
                </div>
            </div>
        </div>
    </div>
`

    modal_body.innerHTML = data
}


   

