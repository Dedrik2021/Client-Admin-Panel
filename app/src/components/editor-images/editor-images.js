import axios from "axios";

export default class EditorImages {
    constructor(el, virtualEl, ...[isLoading, isLoaded, showNotifications]) {
        this.el = el;
        this.virtualEl = virtualEl;
        this.isLoading = isLoading
        this.isLoaded = isLoaded
        this.showNotifications = showNotifications

        this.el.addEventListener('click', () => this.onClick())
        this.imgUploader = document.querySelector('#img-upload')
        if (this.el.parentNode.nodeName === 'A' || 
            this.el.parentNode.nodeName === 'BUTTON') {
                this.el.addEventListener('contextmenu', (e) => this.onCtxMenu(e))
            }
    }

    onClick() {
        this.imgUploader.click()
        this.imgUploader.addEventListener('change', () => {
            if (this.imgUploader.files && this.imgUploader.files[0]) {
                let formData = new FormData()
                formData.append('image', this.imgUploader.files[0]);
                this.isLoading()
                axios
                    .post('./api/uploadImage.php', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }) 
                    .then((res) => {
                        this.virtualEl.src = this.el.src = `./img/${res.data.src}`
                    })
                    .catch(() => this.showNotifications('Saving Error', 'danger'))
                    .finally(() => {
                        this.imgUploader.value = '';
                        this.isLoaded()
                    })
            }
        })
    }

    onCtxMenu(e) {
        e.preventDefault()
        this.onClick()
    }
}