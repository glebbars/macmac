import React from 'react'
import { Link, useHistory } from "react-router-dom";
import Search from '../Search/Search';

const NotFound = () =>{
  const history = useHistory()

  return(
    <div className='not-found'>
      <div className='not-found__container'>
        <h1 className='not-found__header'>Упс... Что-то пошло не так</h1>
        <p className='not-found__text'>Страницы, которую вы искали, уже не существует</p>
        <div onClick={history.goBack} className='not-found__back'>Вернуться назад</div>
        <Search className='not-found__search' placeholder='Или выполните поиск по товарам'/>
      </div>
    </div>
  )
}

export default NotFound