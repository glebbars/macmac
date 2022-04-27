import React from 'react'
import { useHistory } from "react-router-dom";
import Search from '../Search/Search';
import {popularRequestsOptions} from '../additionalObjects/additionalObjects'
import { Link } from 'react-router-dom'

const NotFound = () =>{
  const history = useHistory()

  return(
    <div className='not-found'>
      <div className='not-found__container'>
        <h1 className='not-found__header'>Упс... Что-то пошло не так</h1>
        <p className='not-found__text'>Страницы, которую вы искали, уже не существует</p>
        <div onClick={history.goBack} className='not-found__back'>Вернуться назад</div>
        <Search 
          className='header__search not-found__search' 
          placeholder='Или выполните поиск по товарам'
        />

        <div className='not-found__popular'>
          <h2 className='not-found__popular__header'>Популярные запросы:</h2>
          {popularRequestsOptions.map((request, index) => (
              <Link key={index} className='not-found__popular__text' to={request.link}>{request.text}</Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NotFound