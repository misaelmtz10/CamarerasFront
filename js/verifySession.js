let verifySession = async () => {
    const request = await fetch(`${host}/api/userProfile`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
        },
    })
    dataUser = await request.json()
    let path = window.location.href

    if (token && dataUser.data) {
        if (path.includes('edificio.html')) {
            getBuildingsByUser()
            document.querySelector(".theme-loader").setAttribute("style", "display: none !important; ");
        }else if (path.includes('camarera.html')) {
            const params = new URLSearchParams(document.location.search)
            const id = params.get("id")
            getRoomsByUserByStatusAssigned(id, 1)
            getRoomsByUserByStatusBlocked(id, 4)
            getRoomsByUserByStatusCleaned(id, 2)
            document.querySelector(".theme-loader").setAttribute("style", "display: none !important; ");
        }else if (path.includes('admindashboard.html')) {
            //aquí van las acciones para admin
            setOptionsCamarera()
            setOptionsRoom()
            setTable()
            //Spinner data
            document.querySelector(".theme-loader").setAttribute("style", "display: none !important; ");
        }else{
            window.location.href = "http://localhost:8080/"
        }
    }else{
        window.location.href = "http://localhost:8080/"
    }
}