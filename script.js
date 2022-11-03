let array = [];
const URL = "https://6363a39537f2167d6f7eb626.mockapi.io/users";
let inputBusqueda = document.getElementById("inputGet1Id");
let btnBusqueda = document.getElementById("btnGet1");

let inputNameAgregar = document.getElementById("inputPostNombre");
let inputLastNameAgregar = document.getElementById("inputPostApellido");
let btnAgregar = document.getElementById("btnPost");

  let getJSONData = function(url){
      let result = {};
    //   showSpinner();
      return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }else{
          throw Error(response.statusText);
        }
      })
      .then(function(response) {
            result.status = 'ok';
            result.data = response;
            // hideSpinner();
            return result;
      })
      .catch(function(error) {
          result.status = 'error';
          result.data = error;
        //   hideSpinner();
          return result;
      });
  };

const jsonData = await fetch(URL).then((response) => response.json()); //requiere => type="module"

console.log(jsonData)


function busqueda() {
    let valor = inputBusqueda.value;
    let result = [];

    if ( valor == "" ) {
        showUsers(jsonData);
    }
    else {result = jsonData.filter(objeto => {
        return objeto.id.includes(valor);
    });
    showUsers(result)
    valor = "";
 }
};

//Muestra las categorias en el html
function showUsers(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let elemento = array[i];

            htmlContentToAppend += `
            <div onclick="setCatID(${elemento.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${elemento.name}</h4>
                        </div>
                        <p class="mb-1">${elemento.lastname}</p>
                        <p class="mb-1">${elemento.id}</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("results").innerHTML = htmlContentToAppend;
    }

    




//DISABLED ENABLED

if (inputNameAgregar.value !== "" && inputLastNameAgregar.value !== "" ) {
    btnAgregar.removeAttribute("disabled", "");
    btnAgregar.setAttribute("enabled", "");
}



//POST


btnAgregar.addEventListener("click" , function() {
 let data = { id: (jsonData.length + 1) ,name: inputNameAgregar.value, lastname: inputLastNameAgregar.value};

fetch(URL, {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(response.json(data))
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
 busqueda();
});




