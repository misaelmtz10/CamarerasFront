let token = localStorage.getItem("myToken")
const btnCamera = document.getElementById("btnCamera")
const btnTakePhoto = document.getElementById("btnTakePhoto")

const video = document.getElementById("video")
const photo = document.getElementById("photo")
const contentCarousel = document.getElementById("contentCarousel")
let arrayPhoto = []
const camera = new Camera(video)

btnCamera.addEventListener("click",()=>{
    console.log("abrir camera")
    camera.power();
})

btnTakePhoto.addEventListener("click",()=>{
    console.log("toma foto")
    let picture = camera.takePhoto()
    console.log(picture) 
    camera.off();
    photo.setAttribute('src',picture)
    arrayPhoto.push(picture)
    //printCarousel(arrayPhoto)
    
})

window.onload = function () {
    verifySession()
}

let getRoomsByUserByStatusAssigned = (idBuilding, idStatus) => {
    fetch(`http://127.0.0.1:8000/api/room/getAllByUser/${idBuilding}/${idStatus}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + token,
            },
        }).then(response => response.json())
        .then(data => {
            let content = ``;
            console.log(data.data);

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
                                    <form action="/pages/history.html">
                                    <button type="submit" class="btn btn-info btn-floating">
                                        <i class="fa-solid fa-clock"></i>
                                    </button>
                                    </form>
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
    fetch(`http://127.0.0.1:8000/api/room/getAllByUser/${idBuilding}/${idStatus}`, {
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
                      <div class="flip-card-inner-2" style="box-shadow: 1px 8px 10px rgba(255, 0, 0, 0.749);">
                        <div class="flip-card-front">
                          <strong class="text-center" id="desabilitado">${item.number}</strong>
                        </div>
                        <div class="flip-card-back">
                          <div class="row">
                            <h3>Acciones</h3>
                            <div class="col-md-12">
                              <div class="col-md-12 text-center">
                                <button type="button" data-mdb-toggle="tooltip" data-mdb-placement="bottom" title="Limpiar" class="btn btn-primary btn-floating">
                                  <i class="fa-solid fa-broom"></i>
                                </button>
                              </div>
                              <br>
                            </div>
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
                            </div>
                            <br>
                                </div>
                                <div class="col-md-12">
                                <div class="col-md-12 text-center">
                                    <form action="/pages/history.html">
                                    <button type="submit" class="btn btn-info btn-floating">
                                        <i class="fa-solid fa-clock"></i>
                                    </button>
                                    </form>
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
    fetch(`http://127.0.0.1:8000/api/room/getAllByUser/${idBuilding}/${idStatus}`, {
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
                                <form action="/pages/history.html">
                                <button type="submit" class="btn btn-info btn-floating">
                                    <i class="fa-solid fa-clock"></i>
                                </button>
                                </form>
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
    let btnSend = document.querySelector("#send-incidences")
    btnSend.addEventListener("click", () => {
        const date = Date.now()
        const today = new Date(date)
        let observationsIn = document.getElementById('observationsIn').value
        //let evidenceIn = document.getElementById('evidenceIn')
        console.log('observations'+ observationsIn);
        let data = {
            ended: today.toISOString(),
            observations: observationsIn,
            evidence: arrayPhoto,
            status_cleaning_id: 4
        }
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
                    
                    //const resultFirebase = saveImageFirebase(arrayPhoto)
                    const resultRequest = setIncidence(id, data).then((data) => {
                        if (data.data) {
                            Swal.fire('¡Envío éxitoso!', '', 'success')
                            $('#basicExampleModal').modal('hide')
                            const params = new URLSearchParams(document.location.search)
                            const id = params.get("id")
                            getRoomsByUserByStatusBlocked(id, 4)
                            getRoomsByUserByStatusAssigned(id, 1)
                            getRoomsByUserByStatusReleased(id, 2)
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

    const request = await fetch('http://127.0.0.1:8000/api/room/updateRoom/' + id, {
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
                            getRoomsByUserByStatusAssigned(id, 1)
                            getRoomsByUserByStatusReleased(id, 2)
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
        status_cleaning_id: 2
    }
    const request = await fetch('http://127.0.0.1:8000/api/room/updateRoom/' + id, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data)
    })
    return response = await request.json()
}