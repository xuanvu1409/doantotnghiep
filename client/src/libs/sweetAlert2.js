import Swal from "sweetalert2";

export const sweetAlert = {
    warning(title, message, callback) {
        Swal.fire({
            title: title,
            html: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Lưu",
            cancelButtonText: "Huỷ",
            showCloseButton: true,
            buttonsStyling: false,
            closeButtonHtml: "<button type='button' class='btn btn-sm btn-icon btn-ghost-secondary'><i class='tio-clear tio-lg'></i></button>",
            customClass: {
                confirmButton: 'btn btn-primary mr-2',
                cancelButton: 'btn btn-white',
                popup: 'border-popup'
            },
            showLoaderOnConfirm: true,
            preConfirm: callback
        });
    },

    autoClose(icon, title, message, callback) {
        Swal.fire({
            title: title,
            html: message + ' trong <b></b> giây.',
            timer: 3000,
            icon: icon,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                setInterval(() => {
                    const content = Swal.getHtmlContainer()
                    if (content) {
                        const b = content.querySelector('b')
                        if (b) {
                            b.textContent = Math.floor(Swal.getTimerLeft()/1000)
                        }
                    }
                }, 100)
            },
            didClose() {
                callback()
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                callback()
            }
        })
    },

    success(title, message, callback) {
        Swal.fire({
            icon: 'success',
            title: title,
            html: message,
            showConfirmButton: false,
            timer: 1500,
            didClose() {
                callback()
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                callback()
            }
        })
    }

}