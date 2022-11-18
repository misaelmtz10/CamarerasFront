let token = localStorage.getItem("myToken")

window.onload = function () {
    verifySession()
}

let getRoomsByUser = (id) => {
    fetch('http://127.0.0.1:8000/api/room/getAllByUser/' + id, {
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
            // Loop to access all rows
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
                                <h3>Acciones</h3>
                                <div class="col-md-12">
                                <div class="col-md-12 text-center">
                                    <button type="button" data-mdb-toggle="tooltip" data-mdb-placement="bottom"
                                    title="Limpiar" onClick="limpiar(${2})" class="btn btn-primary btn-floating">
                                    <i class="fa-solid fa-broom"></i>
                                    </button>
                                </div>
                                <br>
                                </div>
                                <div class="col-md-12">
                                <div class="col-md-12 text-center">
                                    <button type="button" class="btn btn-success btn-floating" data-toggle="modal"
                                    data-target="#basicExampleModal">
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
            document.getElementById("cardRoom").innerHTML = content;
        })
}

let limpiar = (id) => {
    Swal.fire({
        title: 'Estas seguro de querer limpiar esta habitación?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Aceptar',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            let timerInterval
            let resultRequest = changeStatusRoom(id)
            Swal.fire({
                title: 'El tiempo empezara a correr!',
                html: 'Tiempo <b></b> milliseconds.',
                timer: 5000,
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
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    if (resultRequest.data) {
                        console.log('Se realizó el cambio')
                    } else {
                        console.log('No realizó el cambio')
                        
                    }
                }
            })
        } else if (result.isDenied) {
            Swal.fire('No se hizo ningun cambio', '', 'info')
        }
    })
}

let changeStatusRoom = async (id) =>{
    let data = {
        started: new Date(),
        users_id:2
    }

    const request = await fetch('http://localhost:8000/api/room/updateRoom/' + id, {//localhost:8000/api/room/updateRoom/3
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return response = await request.json()
}