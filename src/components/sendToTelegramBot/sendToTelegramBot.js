import axios from 'axios'

const {REACT_APP_DB_API, REACT_APP_TELEGRAM_BOT_TOKEN} = process.env

export const sendToTelegramBot = async (data) => {
  const orderRes = await axios.post(`${REACT_APP_DB_API}/orders`, data)

  const dataToBotFunc = (res) => {
    let data = `№ <strong>${res.data.id}</strong> \n\n<strong>Заказ:\n ${res.data.order}</strong> \n\nОбщая сумма заказа: ${res.data.totalPrice} \n\nИмя: ${res.data.fullName} \n\nТелефон: ${res.data.phone}`

    if(res.data.delivery){
      data = `${data} \n\nДоставка: ${res.data.delivery}`
    }
    if(res.data.payment){
      data = `${data} \n\nОплата: ${res.data.payment}`
    }
    if(res.data.comment && res.data.comment !== ""){
      data = `${data} \n\nКомментарий: ${res.data.comment}`
    }
    if(typeof res.data.notCallBack === "boolean" && !res.data.notCallBack){
      data = `${data} \n\n! Перезванить клиенту !`
    }

    return data
  }

  if(orderRes.data.id > 0){
    return await axios.post(`https://api.telegram.org/${REACT_APP_TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: 634614891,
      text: dataToBotFunc(orderRes),
      parse_mode: "html"
    })

  }
}
