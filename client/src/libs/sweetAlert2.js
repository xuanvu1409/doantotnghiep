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
}