let token = sessionStorage.getItem("myToken")

window.onload = function() {
    const params = new URLSearchParams(document.location.search);
    const id = params.get("id");
    getRoomsByUser(id)
}

let getRoomsByUser = (id) =>{
    fetch('http://127.0.0.1:8000/api/room/getAllByUser/'+id, {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
    },
}).then(response => response.json())
    .then(data => {
        console.log(data);
        let content = ``;

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
                                    title="Limpiar" onClick="limpiar()" class="btn btn-primary btn-floating">
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
        // Setting innerHTML as tab variable
        document.getElementById("cardRoom").innerHTML = content;
    })
}
