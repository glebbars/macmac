import React from 'react'
import { Link, useHistory } from "react-router-dom";
import Search from '../Search/Search';
import notFoundLogo from '../../img/not-found.png'

const NotFound = () =>{
  const history = useHistory()

  return(
    <div className='not-found'>
      <div className='not-found__container'>
        <div className='not-found__numbers'>404</div>
        <h1 className='not-found__header'>Упс... Что-то пошло не так</h1>
        <p>Страницы, которую вы искали, уже не существует</p>
        <img src={notFoundLogo} alt="logo" />
        <div onClick={history.goBack} className='not-found__back'>Вернуться назад</div>
        <Search className='not-found__search'/>
      </div>
    </div>
  )
}

export default NotFound