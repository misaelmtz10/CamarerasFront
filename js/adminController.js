window.onload = function () {
    setOptionsCamarera()
    setOptionsRoom()
    setTable()
}

let token = localStorage.getItem("myToken")

let setOptionsCamarera = () =>{
    fetch(`http://${host}:8000/api/user/getAllUsers`, {
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
    fetch(`http://${host}:8000/api/room/getAllRooms`, {
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
                $('#select-room').append('<option value="' + item.id + '">' + item.number + '</option>');
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
    fetch(`http://${host}:8000/api/room/getAllForAdmin`, {
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
                                    <span class="badge bg-primary">Limpia</span>
                                </td>`
                            break;
                        case 2:
                            content += `
                                <td>
                                    <span class="badge bg-warning">Sucia</span>
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
                                class="btn btn-warning" onClick="fillModal()">
                                <i class="bi bi-exclamation-triangle"></i>
                            </button>
                        </td>`
                    }
                    content += `</tr>`
            }
            // Setting innerHTML as content variable
            document.getElementById("table-admin").innerHTML = content;
        })
}

let fillModal = () =>{
    console.log("Aquí se llena el modal");
}
