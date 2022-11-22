let verifySession = async () => {
    const request = await fetch('http://127.0.0.1:8000/api/userProfile', {
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
        }else if (path.includes('camarera.html')) {
            const params = new URLSearchParams(document.location.search)
            const id = params.get("id")
            getRoomsByUserByStatusAssigned(id, 1)
            getRoomsByUserByStatusBlocked(id, 4)
            getRoomsByUserByStatusReleased(id, 2)
        }else if (path.includes('registerCamarera.html')) {
            //aquí van las acciones para admin
        }else{
            window.location.href = "http://localhost:8080/"
        }
    }else{
        window.location.href = "http://localhost:8080/"
    }
}