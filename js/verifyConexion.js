const isOnline = async () => 
{
    
  if(navigator.onLine)
  {
      if (ubication === "room") {
        const paramsUrl = new URLSearchParams(document.location.search)
        const idBul = paramsUrl.get("id")
        setTimeout(() => {
            getRoomsByUserByStatusBlocked(idBul, 4)
        }, 2000);
      }
    Toast.fire({
        icon: 'success',
        title: 'De vuelta en línea'
      })
  }else{
    Toast.fire({
        icon: 'warning',
        title: 'Entraste a modo offline'
      })
  }
}


window.addEventListener('online', isOnline)
window.addEventListener('offline', isOnline)
