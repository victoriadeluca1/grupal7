let array = [];
const URL = "https://6363a39537f2167d6f7eb626.mockapi.io/users";
let jsonData = [];
let inputBusqueda = document.getElementById("inputGet1Id");
let btnBusqueda = document.getElementById("btnGet1");

let inputNameAgregar = document.getElementById("inputPostNombre");
let inputLastNameAgregar = document.getElementById("inputPostApellido");
let btnAgregar = document.getElementById("btnPost");

async function updateList() {
  const jsonData = await fetch(URL).then((response) => response.json());
  showUsers(jsonData);
}

async function buscar() {
  const idbusqueda = inputBusqueda.value;

  if (idbusqueda == "") {
    let jsonData = await fetch(URL).then((response) => response.json());
    showUsers(jsonData);
  } else {
    let jsonData = await fetch(URL + `/${idbusqueda}`).then((response) => response.json());
    showUsers([jsonData])
  }
}

//Muestra las categorias en el html
function showUsers(array) {

  let htmlContentToAppend = "";
  for (let i = 0; i < array.length; i++) {
    let elemento = array[i];

    htmlContentToAppend += `
            <div class="list-group-item list-group-item-action cursor-active">
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

function habilitarBTN() {
  if (inputLastNameAgregar.value === "" && inputLastNameAgregar.value === "") {
    btnAgregar.removeAttribute("disabled", true);
  } else {
    btnAgregar.removeAttribute("disabled", false);
  }
}

//POST
btnAgregar.addEventListener("click", async function () {
  const data = {
    name: inputNameAgregar.value,
    lastname: inputLastNameAgregar.value
  };

  const res = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (res.ok === false) {
    console.error('Hubo un error al hacer la petición');
    return;
  }

  await updateList(); //actualiza la lista con la informacion del servidor
  inputNameAgregar.value = "";
  inputLastNameAgregar.value = "";
});



//INPUTS
