let host = "localhost"

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js');
}

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

const isOnline = async () => 
{
  if(navigator.onLine)
  {
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


