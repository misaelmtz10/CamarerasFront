let token = localStorage.getItem("myToken")
window.onload = function () {
    verifySession()
}

let getBuildingsByUser = () => {
    fetch(`${host}/api/building/getAllBelongUser`, {
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
                <div style="padding:16px 20px" class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                      
                        <div class="card-flyer">
                            <div class="text-box">
                            <div class="image-box">
                                <img src="../img/hotel.png" alt="" />
                            </div>
                            <div class="text-container">
                                <h6>${item.name}</h6>
                                <a type="button" href="camarera.html?id=${item.id}" class="btn btn-info">
                                    Ver habitaciones </a>
                            </div>
                            </div>
                        </div>
                      
                </div>
            `;

            }
            // Setting innerHTML as tab variable
            document.getElementById("tableBuilding").innerHTML = content;
        })
}
