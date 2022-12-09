window.onload = function () {
    verifySession()
}

let token = localStorage.getItem("myToken")

let setOptionsCamarera = () =>{
    fetch(`${host}/api/user/getAllUsers`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
        },
    }).then(response => response.json())
        .then(data => {

            $('#select-camarera').empty();
            $('#select-camarera').append('<option selected disabled="disabled" value="">'+'Selecciona una camarera'+'</option>');
            for (let item of data.data) {
                $('#select-camarera').append('<option value="' + item.id + '">' + item.name + ' ' + item.surname + ' ' + item.lastname + '</option>');
            }
        })
}

let setOptionsRoom = () =>{
    fetch(`${host}/api/room/getAllRooms`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
        },
    }).then(response => response.json())
        .then(data => {

            $('#select-room').empty();
            $('#select-room').append('<option selected disabled="disabled" value="">'+'Selecciona una habitación'+'</option>');
            for (let item of data.data) {
                $('#select-room').append('<option value="' + item.id + '">' + 'Habitación ' + item.number + ', piso ' + item.floor + '</option>');
            }
        })
}

const getDatetime = (d) => {
    let date = new Date(d);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let monthText = month === 0 ? "Enero" : month === 1 ? "Febrero" : month === 2 ? "Marzo" : month === 3 ? "Abril" : month === 4 ? "Mayo" : month === 5 ? "Junio" : month === 6 ? "Julio" : month === 7 ? "Agosto" : month === 8 ? "Septiembre" : month === 9 ? "Octubre" : month === 10 ? "Noviembre" : month === 11 ? "Diciembre" : month;
    return day < 10 ? "0" + day + " de " + monthText + ", " + year : day + " de " + monthText + ", " + year;
};

let setTable = () =>{
    fetch(`${host}/api/room/getAllForAdmin`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
        },
    }).then(response => response.json())
        .then(data => {
            let content = ``;
            let created_at
            let updated_at
            let index = 0
            for (let item of data.data) {
                index++
                created_at = getDatetime(new Date(item.created_at))
                updated_at = getDatetime(new Date(item.updated_at))
                content += `
                <tr>
                    <td scope="row">${index}</td>
                    <td>Habitación ${item.number}, piso ${item.floor}</td>
                    <td>${item.name} ${item.surname} ${item.lastname}</td>
                    <td>${created_at}</td>
                    <td>${updated_at}</td>`
                    switch (item.status_cleaning_id) {
                        case 1:
                            content += `
                                    <td>
                                        <span class="badge bg-warning">Sucia</span>
                                    </td>`
                                    break;
                        case 2:
                            content += `
                                <td>
                                    <span class="badge bg-primary">Limpia</span>
                                </td>`
                            break;
                        case 3:
                            content += `
                                <td>
                                    <span class="badge bg-success">Liberada</span>
                                </td>`
                            break;
                        case 4:
                            content += `
                                <td>
                                    <span class="badge bg-danger">Bloqueada</span>
                                </td>`
                            break;
                        default:
                            break;
                    }
                    
                    if (item.status_cleaning_id === 4) {
                        content += `
                        <td>
                            <button type="button" data-bs-toggle="modal" data-bs-target="#showIncident"
                                class="btn btn-warning" onClick="fillModal(${item.id})">
                                <i class="bi bi-exclamation-triangle"></i>
                            </button>
                        </td>`
                    }else{
                        content += `<td><span class="badge bg-secondary">Sin acción</span></td>`
                    }
                    content += `</tr>`
            }
            // Setting innerHTML as content variable
            document.getElementById("table-admin").innerHTML = content;
            setTimeout(executeDataTable, 10)
        })
}

let idRoomIn = document.getElementById('idRoom')
let idUserIn = document.getElementById('idUser')
let idUHRIn = document.getElementById('idUHR')

let fillModal = (idRoom) =>{
    let imgIncidence = document.querySelector("#img-incidence")
    let titleIncidence = document.getElementById('title-incidence')
    let observations = document.getElementById('observations')
    let date = document.getElementById('date')
    let dateFull 

    fetch(`${host}/api/room/getUserHasRoomById/${idRoom}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
        },
    }).then(response => response.json())
        .then(data => {
            dateFull = data.data[0].ended != null ? data.data[0].ended : data.data[0].started
            imgIncidence.src = data.data[0].evidence
            titleIncidence.textContent = 'Habitación ' + data.data[0].number + ', piso ' + data.data[0].floor
            observations.textContent = data.data[0].observations
            date.textContent = getDatetime(new Date(dateFull)) + '  a las  ' + new Date(dateFull).toLocaleTimeString() + ' hrs'
            idRoomIn.value = data.data[0].rooms_id
            idUserIn.value = data.data[0].users_id
            idUHRIn.value = data.data[0].id
        })
}

let userVal
let roomVal

let selectUser = document.getElementById('select-camarera');
selectUser.addEventListener('change',
function(){
    let selectedOption = this.options[selectUser.selectedIndex]
    userVal = selectedOption.value
});

let selectRoom = document.getElementById('select-room');
selectRoom.addEventListener('change',
function(){
    let selectedOption = this.options[selectRoom.selectedIndex]
    roomVal = selectedOption.value
});

let save = () =>{
    if (userVal && roomVal) {
        let data = {
            users_id:userVal,
            rooms_id:roomVal,
            status_cleaning_id:1
        }
    
        Swal.fire({
          title: "Estás seguro de realizar esta acción?",
          text: "Se registará una nueva asignación!",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Guardar",
          cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${host}/api/room/assignRoom`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify(data)
                }).then(response => response.json())
                    .then(dataRes => {
                        if (dataRes.message.includes('successfully')) {
                            Swal.fire("¡Éxito!", "Se registro la asignación", "success");
                            $('#verticalycentered').modal('hide')
                            setOptionsRoom()
                            setOptionsCamarera()
                            $("#example").dataTable().fnDestroy();
                            setTable()
                            userVal = null
                            roomVal = null
                        }else{
                            Swal.fire("Error!", "Algo salió mal, intenta nuevamente", "error")
                        }
                    }).catch((error =>{ console.log(error);
                        Swal.fire("Error!", "Algo salió mal, intenta nuevamente", "error")
                    }))
            }
        });  
    } else {
        Swal.fire("¡Error!", "Hay campos vacíos o erróneos ", "error");
    }
}

let releaseRoom = () =>{

    let data = {
        users_id:idUserIn.value,
        rooms_id:idRoomIn.value,
        status_cleaning_id:3
    }

    Swal.fire({
        title: "Estás seguro de realizar esta acción?",
        text: "Se liberará la habitación!",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Liberar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
          if (result.isConfirmed) {
              fetch(`${host}/api/room/updateRoom/${idUHRIn.value}`, {
              method: 'PUT',
              headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: "Bearer " + token,
              },
              body: JSON.stringify(data)
              }).then(response => response.json())
                  .then(dataRes => {
                        if (dataRes.message.includes('successfully')) {
                            Swal.fire("¡Éxito!", "Se liberó la habitación", "success");
                            $('#showIncident').modal('hide')
                            $("#example").dataTable().fnDestroy();
                            setTable()
                        }else{
                            Swal.fire("Error!", "Algo salió mal, intenta nuevamente", "error")
                        }
                  }).catch((error =>{ console.log(error);
                        Swal.fire("Error!", "Algo salió mal, intenta nuevamente", "error")
                  }))
          }
      });  
}


function executeDataTable() {
    $("#example").DataTable({
        language: {
            url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
        },
       
    });
}
