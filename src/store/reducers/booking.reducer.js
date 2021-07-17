import { BOOKING_CHAIR, CHOICE_CHAIR, ERROR_BOOKING, GET_TICKET_LIST } from "../constants/booking.constant"

const initalState = {
    listChair: [],
    mesageBooking: "",
    errorMesage: ""
}

export const BookingReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_TICKET_LIST: {
            state.listChair = action.payload
            return { ...state }
        }
        // great value dangChon form dispatch booking.component
        case CHOICE_CHAIR: {
            let listChairUpdate = [...state.listChair]
            let index = listChairUpdate.findIndex(item => item.maGhe === action.payload.maGhe)
            if (index !== -1) {
                let oldChair = listChairUpdate[index];
                let newChair = { ...oldChair, dangChon: !oldChair.dangChon } // add more value dangChon
                listChairUpdate[index] = newChair
                state.listChair = listChairUpdate
            }
            return { ...state }
        }
        case BOOKING_CHAIR: {
            state.mesageBooking = action.payload
            return { ...state } // none save booking.action
        }
        case ERROR_BOOKING: {
            state.errorMesage = action.payload
            return { ...state } // none save booking.action
        }
        default: return { ...state }
    }
}