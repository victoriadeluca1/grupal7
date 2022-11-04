let array = [];
const URL = "https://6363a39537f2167d6f7eb626.mockapi.io/users";
let jsonData = [];
let inputBusqueda = document.getElementById("inputGet1Id");
let btnBusqueda = document.getElementById("btnGet1");

let inputNameAgregar = document.getElementById("inputPostNombre");
let inputLastNameAgregar = document.getElementById("inputPostApellido");
let btnAgregar = document.getElementById("btnPost");
let btnmodificar = document.getElementById("btnPut");
let inputModificar = document.getElementById("inputPutId");
let btnEliminar = document.getElementById("btnDelete");
let inputEliminar = document.getElementById("inputDelete");
let inputNamemodal = document.getElementById("inputPutNombre");
let inputLastNamemodal = document.getElementById("inputPutApellido");
let modal = document.getElementById("dataModal");
let alerta = document.getElementById("alerta");

btnmodificar.addEventListener("click", async function () {
  let modificarValue = inputModificar.value;
  localStorage.setItem("dataModificar", modificarValue);

  const jsonData = await fetch(URL + `/${modificarValue}`).then((response) => response.json());
  console.log(jsonData);

  inputNamemodal.value = jsonData.name;
  console.log(jsonData.name)

  inputLastNamemodal.value = jsonData.lastname;

});

async function updateList() {
  const jsonData = await fetch(URL).then((response) => response.json());
  showUsers(jsonData);
}

//GET
async function buscar() {
  const idbusqueda = inputBusqueda.value;
  let id;
  let ids = [];
  let jsonData = await fetch(URL).then((response) => response.json());


  if (idbusqueda == "") {
    updateList();
  }
  jsonData.forEach(element => {
    id = element.id;
    ids.push(id);
  });
  console.log(ids);
  if (ids.includes(idbusqueda)) {
    console.log(idbusqueda);
    let jsonData2 = await fetch(URL + `/${idbusqueda}`).then((response) => response.json());
    showUsers([jsonData2]);
  } else {
    alerta.classList.remove("hide");
    alerta.classList.add("show");

    setTimeout(function () {

      alerta.classList.remove("show");
      alerta.classList.add("hide");
    }, "3000")
    //console.log("noexistewey")
  }

  inputBusqueda.value = "";
};


//Muestra la lista en el HTML
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
  if (inputLastNameAgregar.value !== "" && inputLastNameAgregar.value !== "") {
    btnAgregar.disabled = false;
  } else {
    btnAgregar.disabled = true;
  }
  if (inputModificar.value !== "") {
    btnmodificar.disabled = false;

  } else {
    btnmodificar.disabled = true;
  }
  if (inputDelete.value !== "") {
    btnDelete.disabled = false;
  } else {
    btnDelete.disabled = true;
  }
}


//DELETE
async function borrar() {
  let idBorrar = inputEliminar.value;

  const res = await fetch(URL + `/${idBorrar}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (res.ok === false) {
    console.error('Hubo un error al hacer la petición');
    return;
  }

  updateList();
  inputEliminar.value = "";
}


async function modificar() {
  let datos = {
    name: inputNamemodal.value,
    lastname: inputLastNamemodal.value
  };

  let id = localStorage.getItem('dataModificar')

  const res = await fetch(URL + `/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  if (res.ok === false) {
    console.error('Hubo un error al hacer la petición');
    alerta.classList.remove("hide");
    alerta.classList.add("show");

    setTimeout(function () {

      alerta.classList.remove("show");
      alerta.classList.add("hide");
    }, "3000")
    return;
  }

  await updateList(); //actualiza la lista con la informacion del servidor
  inputNamemodal.value = "";
  inputLastNamemodal.value = "";
  inputModificar.value = "";
  btnmodificar.disabled = true;

};

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
