let items =[];
function Item(code,description,price,qty){
    this.code=code;
    this.description =description;
    this.price = price;
    this.qty = qty;
}
initializeItem=()=>{
    let tempData = JSON.parse(localStorage.getItem('items'));
    if(tempData!==null){
        items=tempData;
        console.log(tempData)
        setTableData();
    }
}
function setTableData(){
    let searchText =$('#search').val().toLowerCase();

    htmlData = '';
    items.forEach(data=>{
        if(data.code.toLowerCase().includes(searchText)
            ||data.description.toLowerCase().includes(searchText)
            ||data.price.toLowerCase().includes(searchText)){
            htmlData +=`<tr>
<td>${data.code}</td>
<td>${data.description}</td>
<td>${data.price}</td>
<td>${data.qty}</td>
<td>
<button onclick="loadUpdateModel('${data.code}','${data.description}','${data.price}','${data.qty}')" class="btn btn-success btn-sm col-3">Update</button> | 
<button onclick="deleteItem('${data.code}')" class="btn btn-danger btn-sm col-3">Delete</button> 
</td>
</tr>`
        }


    });
    $('#table-body').html(htmlData);
}
function deleteItem(code){
    if(confirm('Are you Sure?')){
        for (let tempId=0;tempId<items.length;tempId++){
            if(items[tempId].code===code){
                items.splice(tempId,1);
                localStorage.setItem('items',JSON.stringify(items));
                launchModel('Deleted!','Item Deleted!')
                setTableData();
                return;
            }
        }
    }

}
function saveItem(){
    let item = new Item(
        $('#item-code').val(),
        $('#item-description').val(),
        Number($('#item-price').val())  ,
        Number($('#item-qty').val())
    );

    if(items.find(data=>item.code===data.code)===undefined){
        items.push(item);
        localStorage.setItem('items',JSON.stringify(items));
        clearFields();
        launchModel('success','Item Saved');
    }else{
        launchModel('warning','Already Exists')
    }
    setTableData();

}

launchModel=(type,message)=>{
    $('#exampleModalLabel').html(type);
    $('#save-data-body').html(message)
    $('#success-model').click();
}
const clearFields=()=>{
    $('#item-code').val('');
    $('#item-description').val('');
    $('#item-price').val('');
    $('#item-qty').val('');
}
let tempItemCode=0;
const loadUpdateModel =(code,description,price,qty)=>{
    tempItemCode = code;
    $('#update-item-code').val(code);
    $('#update-item-description').val(description);
    $('#update-item-price').val(price);
    $('#update-item-qty').val(qty);
    $('#update-model-btn').click();
}
function updateItem(){
    for (let tempId=0;tempId<items.length;tempId++){
        if(items[tempId].code===tempItemCode){
           items[tempId].description= $('#update-item-description').val();
           items[tempId].price= $('#update-item-price').val();
           items[tempId].qty= Number($('#update-item-qty').val());
            localStorage.setItem('items',JSON.stringify(items));
            $('#update-close').click();
            launchModel('Updated!','Item Updated!');
            setTableData();
            return;
        }
    }
}