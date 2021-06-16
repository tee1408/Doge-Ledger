function remove(id) {
  const token = localStorage.getItem("doge-token");
  let data = JSON.parse(token);
  let index = id - 1; 
  getItem.splice(index, 1);  // to delete the one object of index = 0 and index id = 1
  localStorage.setItem("doge-token", JSON.stringify(data));
  Run();   // to reload the form
}; 

function addData(price, volume){
  const token  = localStorage.getItem("doge-token");
  if(token) {
    let data = JSON.parse(token);  // change JSON input into JS
    // receive input and change to Float then save into newData
    let newData = { price:parseFloat(price), volume:parseFloat(volume)}; 
    data.push(newData);  
    localStorage.setItem("doge-token", JSON.stringify(data));
  } else {
    let data = [];
    let newData = { price:parseFloat(price), volume:parseFloat(volume)};
    data.push(newData);
    localStorage.setItem("doge-token", JSON.stringify(data));
  }
  document.querySelector("#myPrice").value = "";
  document.getElementById("myVolume").value = "";
  OnInit();
};

// only allow numbers 0-9 and "."
function chkNumber(event) {
  let e_k = event.keyCode;
  if (((e_k < 48) || (e_k > 57)) && e_k != 46 ) event.returnValue = false; 
};

function btnAdd() {
  const price = document.querySelector("#myPrice").value;
  const volume = document.querySelector("#myVolume").value;
  if(!price && !volume) {
    document.querySelector(".ErrorMessage").innerHTML = "Price & Volume required!";
  } else {
    if(price){
      (volume)? addData(price, volume) : document.querySelector(".ErrorMessage").innerHTML = "Volume required!";
    } else {
      document.querySelector(".ErrorMessage").innerHTML = "Price required!";
    }
  }
};

function Run() {
  document.querySelector(".ErrorMessage").innerHTML = "";
  const token = localStorage.getItem("doge-token");
  const list = document.querySelector("#TotalAccount");
  while (list.hasChildNodes()) {   
    list.removeChild(list.firstChild);  // check if TotalAccount has child tags and remove all of the tags
  };
  // Set default for total volume and total investment
  var sumV = 0;
  var total = 0;
  let row = "";  // empty row

  if(token){
    let data = JSON.parse(token);  // change token from JSON to JS
    data = data.map((list, i) => ({index: i + 1, ...list}));  // map objects in array and push index into each one starting with 1 instead of 0
    for(let ii = 0; ii < data.length; ii++){  // loop and return list of objects  
      // pull price, volume and (price x volume) from the given index into the row and increase row 
      row += `<tr class="list">  
      <td>${data[ii].index}</td> 
      <td>${data[ii].price}</td>  
      <td>${data[ii].volume}</td>  
      <td>${data[ii].price * data[ii].volume}</td>  
      <td id="${data[ii].index}" class="btnClose" onclick="remove(id)">
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg>
      </td>
      </tr>`;
      document.querySelector("#TotalAccount").innerHTML = row;
      sumV += Number(data[ii].volume);
      total += Number(data[ii].price) * Number(data[ii].volume);
    }
    document.getElementById("sum-volume").innerHTML = sumV;
    document.getElementById("total").innerHTML = total;
    document.getElementById("avg").innerHTML = (total / sumV).toFixed(2);
  }
};

Run();
