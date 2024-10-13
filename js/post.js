let addForm = document.querySelector("#addForm1");
let productsArr = [];
console.log(addForm);
let BASE_URL = "http://localhost:3000";

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

postData()
function postData(){
addForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    try {
        let addName = document.querySelector("#addName").value;
        let addDescription = document.querySelector("#addDescription").value;
        let addPrice = document.querySelector("#addPrice").value;
        let addImage = document.querySelector("#addImage").value;
        let newData = {
            addName,
            addDescription,
            addPrice,
            addImage
        }
        //  let checkInp = productsArr.findIndex(item=>item.addName === addName) === -1 ? true: false; 
    if(addName && addDescription && addPrice && addImage) {
        await fetch(`${BASE_URL}/products`, {
             method: "POST",
             body: JSON.stringify(newData)
         })
         alertMessage("success", "Added successfully")
     }  
    } catch (error) {
        alertMessage("danger", "Operation failed")
    }
   
   
});

}