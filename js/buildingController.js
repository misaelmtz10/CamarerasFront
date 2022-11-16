let token = sessionStorage.getItem("myToken")

window.onload = function() {
    /*if (window.location.href.includes('edificio.html')) {
    }*/
    getBuildingsByUser()
}

let getBuildingsByUser = () =>{
    fetch('http://127.0.0.1:8000/api/building/getAllBelongUser', {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
    },
}).then(response => response.json())
    .then(data => {
        let content = ``;
        
        // Loop to access all rows
        for (let item of data.data) {
            content += ` 
                <tr>
                    <td>${item.name}</td>
                    <td><span id="activo" class="badge rounded-pill badge-success">Activo</span></td>
                    <td><a type="button" href="/pages/camarera.html?id=${item.id}" class="btn btn-info btn-floating">
                        <i class="fas fa-eye"></i>
                    </a></td>
                </tr>
            `;

        }
        // Setting innerHTML as tab variable
        document.getElementById("tableBuilding").innerHTML = content;
    })
}
