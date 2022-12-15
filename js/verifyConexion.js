const isOnline = async () => 
{
    
  if(navigator.onLine){
      console.log('isOnline');
      console.log('section ' + section + ' ubication ' + ubication);
      document.querySelector(".theme-loader").setAttribute("style", "display: initial !important; ");
      if (ubication === "room") {
        const paramsUrl = new URLSearchParams(document.location.search)
        const idBul = paramsUrl.get("id")
        switch (section) {
          case "assigned":
              console.log('entra al caso de assigned');
              setTimeout(() => {
                getRoomsByUserByStatusAssigned(idBul,1)
              }, 2500);
              document.querySelector(".theme-loader").setAttribute("style", "display: none !important; ");
            break;
          case "blocked":
              console.log('entra al caso de blocked');
              setTimeout(() => {
                getRoomsByUserByStatusBlocked(idBul, 4)
              }, 2500);
              document.querySelector(".theme-loader").setAttribute("style", "display: none !important; ");
            break;
          case "cleaned":
              console.log('entra al caso de cleaned');
              setTimeout(() => {
                getRoomsByUserByStatusCleaned(idBul,2),
                getRoomsByUserByStatusBlocked(idBul, 4),
                getRoomsByUserByStatusAssigned(idBul,1)
              }, 2500);
              document.querySelector(".theme-loader").setAttribute("style", "display: none !important; ");
            break;
          default:
              console.log('entra al default');
              document.querySelector(".theme-loader").setAttribute("style", "display: none !important; ");
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
