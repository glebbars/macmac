import axios from 'axios'

const {REACT_APP_TELEGRAM_BOT_TOKEN} = process.env

export const sendToTelegramBot = (data) => {
  axios.post('http://localhost:5000/orders', data).then(res => {

  console.log('res', res)

    const dataToBot = () => {
      let data = `<strong>Заказ:%0A ${res.data.order}</strong>  %0A%0AОбщая сумма заказа: ${res.data.totalPrice}  %0A%0AИмя: ${res.data.fullName}  %0A%0AТелефон: ${res.data.phone}`

      console.log(res.data.notCallBack)

      if(res.data.delivery){
        data = `${data} %0A%0AДоставка: ${res.data.delivery}`
      }
      if(res.data.payment){
        data = `${data} %0A%0AОплата: ${res.data.payment}`
      }
      if(res.data.comment && res.data.comment !== ""){
        data = `${data} %0A%0AКомментарий: ${res.data.comment}`
      }
      if(typeof res.data.notCallBack === "boolean" && !res.data.notCallBack){
        data = `${data} %0A%0A! Перезванить клиенту !`
      }

      return data
    }

    if(res.data.id > 0){
      axios.post(`https://api.telegram.org/${REACT_APP_TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=634614891&text=${dataToBot()}&parse_mode=html`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }
  })
}