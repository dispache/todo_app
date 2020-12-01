import React, { useState } from 'react';
import * as axios from 'axios';
import { NavLink } from 'react-router-dom';

import './Sidebar.css';

import addListButton from '../../assets/images/addListCheck.svg';
import sidebarIcon from '../../assets/images/sidebarIcon.jpg';
import closePopup from '../../assets/images/closePopup.svg';
import deleteIcon from '../../assets/images/deleteIcon.png';


const Sidebar = ({ state,chooseActiveItem, onAdd, onDeleteItem }) => {
	
	let [ visiblePopup, setVisiblePopup ] = useState(false);
	let [ inputValue, setInputValue ] = useState('');
	
	
	const openPopup = () => {
		setVisiblePopup(true);
	}
	const closePopupFunc = () => {
		setVisiblePopup(false);
		setInputValue('');
	}
	const changeInputValue = (event) => {
		setInputValue(event.target.value);
	}
	const addList = (event) => {
		if (!inputValue) {
			alert('Введите название списка');
			return;
		}
		axios.post('http://localhost:3001/lists', { name : inputValue, colorId : 3, tasks : [] })
		.then(({data}) => {
			let obj = data;
			setInputValue('');
			setVisiblePopup(false);
			onAdd(obj);
			
		})
	}
	const deleteItem = (id) => {
		
		if (window.confirm('Вы хотите удалить пункт?')) {
		axios.delete('http://localhost:3001/lists/' + id)
		.then( (resp) => {
			onDeleteItem(id);
		})
	}
}
	
	return (
	
	<React.Fragment>
		<div className='sidebar__header'>
		<img src={sidebarIcon} alt='Sidebar Icon' className='sidebar__icon'></img>
		<span className='sidebar__title'>Список дел</span></div>
		<div className='sidebar__list'>
			<ul>
			{	state ? state.map( item => {
					return (<NavLink to='/' key={item.id}>
						<li><span onClick={() => chooseActiveItem(item)}>{item.name}</span>
								<img src={deleteIcon} alt='deleteIcon' className='deleteIcon' onClick={() => deleteItem(item.id)}></img>
								</li>
						</NavLink>
					)}
				) : 'Загрузка...'}
			</ul>
				<div className='sidebar__addList'>
					{ !visiblePopup && <button className='sidebar__addButton' onClick={openPopup}>Добавить пункт</button>}
				</div>
			{ visiblePopup && <div className='sidebar__addListPopup'>
				<input className='addListPopupInput'placeholder='Введите значение' onChange={changeInputValue} value={inputValue}></input>
				<div><img src={addListButton} alt='addListButton' className='addListConfirm' onClick={addList}></img></div>
	<div>
	<img className='closePopupBtn' src={closePopup} alt="closePopup" onClick={closePopupFunc}></img>
	</div>
			</div> }
				</div>
			
			
			
			
			</React.Fragment>
		

	)
}


export default Sidebar;