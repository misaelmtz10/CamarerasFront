let host = "https://camarerasapi.up.railway.app"
let ubication = ""

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



