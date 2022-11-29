let token = localStorage.getItem("myToken")
const btnCamera = document.getElementById("btnCamera")
const btnTakePhoto = document.getElementById("btnTakePhoto")

const video = document.getElementById("video")
const photo = document.getElementById("photo")
const photoUpdate = document.getElementById("photoUpdate")
//btn close
const btnclose = document.querySelector("#btnclose");
let arrayPhoto = []
let listRooms = []
let picture
const camera = new Camera(video)

btnCamera.addEventListener("click", () => {
    camera.power();
    document.querySelector("#photoUpdate").setAttribute("style", "display: none;");
    document.querySelector("#video").setAttribute("style", "display: initial; width: 50%; height: 65%;");
});

btnclose.addEventListener("click", () => {   
    document.querySelector("#photoUpdate").setAttribute("style", "display: initial; width: 80%; height: 78%;");
    document.querySelector("#video").setAttribute("style", "display: none;");
});



btnTakePhoto.addEventListener("click", () => {
    document.querySelector("#video").setAttribute("style", "display: none;");
    document.querySelector("#photo").setAttribute("style", "display: initial; width: 50%; height: 65%;");
    picture = camera.takePhoto()
    camera.off();
    photo.setAttribute('src', picture)
})

window.onload = function () {
    verifySession()
}

let getRoomsByUserByStatusAssigned = (idBuilding, idStatus) => {
    fetch(`http://${host}:8000/api/room/getAllByUser/${idBuilding}/${idStatus}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
        },
    }).then(response => response.json())
        .then(data => {
            let content = ``;

            for (let item of data.data) {
                content += ` 
                <div class="cards-grid habitaciones">
                    <div class="flip-card">
                        <div class="flip-card-inner"
                            style="box-shadow: rgba(0, 255, 8, 0.4) 0px 5px, rgba(1, 246, 50, 0.3) 0px 10px, rgba(9, 244, 0, 0.2) 0px 15px, rgba(0, 240, 8, 0.1) 0px 20px, rgba(31, 236, 0, 0.05) 0px 25px;">
                            <div class="flip-card-front">
                            <strong class="text-center" id="desabilitado"> ${item.number} </strong>
                            </div>
                            <div class="flip-card-back">
                            <div class="row">
                                <h6>Acciones</h6>
                                <div class="col-md-12">
                                <div class="col-md-12 text-center">
                                    <button type="button" data-mdb-toggle="tooltip" data-mdb-placement="bottom"
                                        title="Limpiar" onClick="limpiar(${item.id})" class="btn btn-primary btn-floating">
                                        <i class="fa-solid fa-broom"></i>
                                    </button>
                                </div>
                                <br>
                                </div>
                                <div class="col-md-12">
                                <div class="col-md-12 text-center">
                                    <button type="button" class="btn btn-success btn-floating" data-toggle="modal" id="open-incidence"
                                        data-target="#basicExampleModal" onClick="openModal(${item.id})">
                                        <i class="fa-solid fa-circle-check"></i>
                                    </button>
                                </div>
                                <br>
                                </div>
                                <div class="col-md-12">
                                    <div class="col-md-12 text-center">
                                        <button type="button" class="btn btn-info btn-floating" data-toggle="modal"
                                            data-target="#modal-history" onClick="setHistory(${item.rooms_id})">
                                            <i class="fa-solid fa-clock"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            }
            // Setting innerHTML as content variable
            document.getElementById("card-rooms-with-status-assigned").innerHTML = content;
        })
}

let getRoomsByUserByStatusBlocked = (idBuilding, idStatus) => {
    fetch(`http://${host}:8000/api/room/getAllByUser/${idBuilding}/${idStatus}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
        },
    }).then(response => response.json())
        .then(data => {
            let content = ``;
            listRooms = data.data
            for (let item of data.data) {
                content += ` 
                <div class="cards-grid habitaciones">
                    <div class="flip-card">
                      <div class="flip-card-inner" style="box-shadow: 1px 8px 10px rgba(255, 0, 0, 0.749);">
                        <div class="flip-card-front">
                          <strong class="text-center" id="desabilitado">${item.number}</strong>
                        </div>
                        <div class="flip-card-back">
                          <div class="row">
                            <h3>Acciones</h3>
                            <br>
                            <div class="col-md-12">
                                <div class="col-md-12 text-center">
                                    <button type="button" class="btn btn-success btn-floating openmodaldes" data-toggle="modal" id="open-incidence"
                                        data-target="#basicExampleModal" onClick="showDetails(${item.id})">
                                        <i class="fa-solid fa-circle-check"></i>
                                    </button>
                                </div>
                            </div>
                                </div>
                                <br>
                                <div class="col-md-12">
                                    <div class="col-md-12 text-center">
                                        <button type="button" class="btn btn-info btn-floating" data-toggle="modal"
                                            data-target="#modal-history" onClick="setHistory(${item.rooms_id})">
                                            <i class="fa-solid fa-clock"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
 
            `;
            }
            // Setting innerHTML as content variable
            document.getElementById("card-rooms-with-status-blocked").innerHTML = content;
        })
}

let getRoomsByUserByStatusReleased = (idBuilding, idStatus) => {

    fetch(`http://${host}:8000/api/room/getAllByUser/${idBuilding}/${idStatus}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
        },
    }).then(response => response.json())
        .then(data => {
            let content = ``;
            for (let item of data.data) {
                content += ` 
                <div class="cards-grid habitaciones">
                  <div class="flip-card">
                    <div class="flip-card-inner" style="box-shadow: rgba(0, 34, 255, 0.4) 0px 5px, rgba(0, 34, 255, 0.3) 0px 10px, rgba(0, 34, 255, 0.2) 0px 15px, rgba(0, 34, 255, 0.1) 0px 20px, rgba(0, 34, 255, 0.05) 0px 25px;">
                      <div class="flip-card-front">
                        <strong class="text-center" id="desabilitado"> ${item.number}</strong>
                      </div>
                      <div class="flip-card-back">
                        <div class="row">
                          <h3>Acciones</h3>
                            <div class="col-md-12">
                                <div class="col-md-12 text-center">
                                    <button type="button" class="btn btn-info btn-floating" data-toggle="modal"
                                        data-target="#modal-history" onClick="setHistory(${item.rooms_id})">
                                        <i class="fa-solid fa-clock"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>               
            `;
            }
            // Setting innerHTML as content variable
            document.getElementById("card-rooms-with-status-released").innerHTML = content;
        })
}

//Alertas
let openModal = (id) => {
    const date = Date.now()
    const today = new Date(date)
    $('#observationsIn').val('')
    picture = ""
    photoUpdate.setAttribute('src', '')

    let data = {
        started: today.toISOString(),
        ended: today.toISOString(),
        observations: document.getElementById('observationsIn'),
        evidence: picture,
        status_cleaning_id: 4
    }
    setDataFromBtn(id, data, false)
}

let showDetails = (params) => {
    document.querySelector("#video").setAttribute("style", "display: none;");
    let observationsIn = document.getElementById('observationsIn')
    let room = JSON.stringify(listRooms.find(it => it.id === params))
    let roomJSON = JSON.parse(room);
    observationsIn.value = roomJSON.observations != null ? roomJSON.observations : observationsIn
    const photoStr = roomJSON.evidence
    photoUpdate.setAttribute('src', photoStr)

    let data = {
        observations: observationsIn,
        evidence: picture != null ? picture : roomJSON.evidence
    }

    setDataFromBtn(roomJSON.id, data, true)
}

let setDataFromBtn = (id, data, isUpdate) => {
    let btnSend = document.querySelector("#send-incidences")
    btnSend.addEventListener("click", () => {
        let observationsIn = document.getElementById('observationsIn').value
        if (observationsIn) {
            Swal.fire({
                title: 'Estas seguro?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showDenyButton: true,
                confirmButtonColor: "#1266F1",
                confirmButtonText: 'Enviar',
                denyButtonText: `Cancelar`,
            }).then((result) => {

                if (result.isConfirmed) {
                    data.observations = observationsIn
                    data.evidence = data.evidence != null ? data.evidence : picture
                    const resultRequest = setIncidence(id, data).then((dataRes) => {
                        if (dataRes.data) {
                            if (isUpdate) {
                                Swal.fire('Actualización éxitosa!', '', 'success')   
                            } else {
                                Swal.fire('Registro éxitoso!', '', 'success')
                            }
                            $('#basicExampleModal').modal('hide')
                            const params = new URLSearchParams(document.location.search)
                            const id = params.get("id")
                            getRoomsByUserByStatusBlocked(id, 4)
                            getRoomsByUserByStatusAssigned(id, 2)
                            getRoomsByUserByStatusReleased(id, 1)
                        } else {
                            Swal.fire('¡Algo ocurrió, intenta de nuevo!', '', 'error')
                        }

                    }).catch((error) => {
                        console.log(error);
                    })
                } else if (result.isDenied) {
                    Swal.fire('No se hizo ningun cambio', '', 'info')
                }
            })
        } else {
            Swal.fire('Debes llenar el campo de comentarios', '', 'info')
        }
    })
}

let setIncidence = async (id, data) => {

    const request = await fetch(`http://${host}:8000/api/room/updateRoom/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data)
    })
    return response = await request.json()
}


let limpiar = (id) => {
    Swal.fire({
        title: '¿Estás seguro de querer limpiar esta habitación?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonColor: "#1266F1",
        confirmButtonText: 'Aceptar',
        cancelButtonColor: "#DD6B55",
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
            let timerInterval

            Swal.fire({
                title: 'Empezando limpieza...',
                html: 'Tiempo <b></b> milliseconds.',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    const resultRequest = changeStatusRoom(id).then((data) => {
                        if (data.data) {
                            Swal.fire('¡Envío éxitoso!', '', 'success')
                            const params = new URLSearchParams(document.location.search)
                            const id = params.get("id")
                            getRoomsByUserByStatusBlocked(id, 4)
                            getRoomsByUserByStatusAssigned(id, 2)
                            getRoomsByUserByStatusReleased(id, 1)
                        } else {
                            Swal.fire('¡Algo ocurrió, intenta de nuevo!', '', 'error')
                        }
                    }).catch((error) => {
                        console.log(error);
                    })
                }
            })
        } else if (result.isDenied) {
            Swal.fire('No se hizo ningun cambio', '', 'info')
        }
    })
}

let changeStatusRoom = async (id) => {
    const date = Date.now()
    const today = new Date(date)
    let data = {
        started: today.toISOString(),
        ended: today.toISOString(),
        status_cleaning_id: 1
    }
    const request = await fetch(`http://${host}:8000/api/room/updateRoom/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data)
    })
    return response = await request.json()
}

const getDatetime = (d) => {
    let date = new Date(d);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let monthText = month === 0 ? "Enero" : month === 1 ? "Febrero" : month === 2 ? "Marzo" : month === 3 ? "Abril" : month === 4 ? "Mayo" : month === 5 ? "Junio" : month === 6 ? "Julio" : month === 7 ? "Agosto" : month === 8 ? "Septiembre" : month === 9 ? "Octubre" : month === 10 ? "Noviembre" : month === 11 ? "Diciembre" : month;
    return day < 10 ? "0" + day + " de " + monthText + ", " + year : day + " de " + monthText + ", " + year;
};

let setHistory = async (idRoom) => {
    fetch(`http://${host}:8000/api/room/getAllByRoomId/${idRoom}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
        },
    }).then(response => response.json())
        .then(data => {
            let content = ``;
            let dateFull
            let dateFormat
            let dateLocal
            for (let item of data.data) {
                dateFull = item.started != null ? item.started : item.ended
                dateFormat = getDatetime(new Date(dateFull))
                dateLocal = new Date(item.started).toLocaleTimeString()
                content += ` 
                <tr>
                    <td>${dateFormat}</td>
                    <td>${dateLocal}</td>`
                    if (item.status_cleaning_id === 2) {
                        content += `<td><span class="badge rounded-pill badge-primary"
                            style="background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);">Limpiada</span>
                        </td>`
                    }else if (item.status_cleaning_id === 3) {
                        content += `<td><span class="badge rounded-pill badge-success"
                            style="background-image: linear-gradient(-45deg, #eb4444 0%, #fe044b 100%);">Liberada</span>
                        </td>`
                    }else if (item.status_cleaning_id === 4) {
                        content += `<td><span class="badge rounded-pill badge-danger"
                            style="background-image: linear-gradient(-45deg, #eb4444 0%, #fe044b 100%);">Incidencia</span>
                        </td>`  
                    }
                content +=`</tr>`
            }
            // Setting innerHTML as content variable
            document.getElementById("table-history").innerHTML = content;
    })
}

