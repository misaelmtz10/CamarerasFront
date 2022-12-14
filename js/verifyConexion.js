const isOnline = async () => 
{
    
  if(navigator.onLine){
      console.log('isOnline');
      document.querySelector(".theme-loader").setAttribute("style", "display: initial !important; ");
      if (ubication === "room") {
        const paramsUrl = new URLSearchParams(document.location.search)
        const idBul = paramsUrl.get("id")
        switch (section) {
          case "assigned":
              getRoomsByUserByStatusAssigned(idBul,1)
              document.querySelector(".theme-loader").setAttribute("style", "display: none !important; ");
            break;
          case "blocked":
              getRoomsByUserByStatusBlocked(idBul, 4)
              document.querySelector(".theme-loader").setAttribute("style", "display: none !important; ");
            break;
          case "cleaned":
              getRoomsByUserByStatusCleaned(idBul,2)
              document.querySelector(".theme-loader").setAttribute("style", "display: none !important; ");
            break;
          default:
            break;
        }
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
