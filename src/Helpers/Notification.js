import { Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import Helpers from './Helpers'

const Notification = (status, message) => {
    const helpers = Helpers()
    if (status && message) {
        const notification = {
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
        }

        Store.addNotification({
            ...notification,
            title: helpers.ucFirst(status),
            type: status === 'error' ? "danger" : "success",
            message: message,
            dismiss: {
                duration: 2000,
                onScreen: true,
            }
        })
    }
}

export default Notification
