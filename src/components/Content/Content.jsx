import React, { useState } from 'react';

import './Content.css';

import addTaskIcon from '../../assets/images/addTaskIcon.svg';
import taskCompleteIcon from '../../assets/images/taskComplete.svg';
import editTitleIcon from '../../assets/images/edit.svg';


const Content = ({ activeItem, editTitleList, onAddTaskList, onTaskComplete }) => {
	
	let [ inputValue, setInputValue ] = useState('');

	const addTaskList = () => {
		if ( !inputValue ) return;
		if ( activeItem === null ) return;
		let newTask = {
			listId : activeItem.id,
			completed : false,
			text : inputValue
		};
		setInputValue('');
		onAddTaskList(newTask);
	}
	

	const editTitle = () => {
		let title = window.prompt('Введите название');
		if (!title) return;
		editTitleList(title);
	}

	const TaskComplete = (task) => {
		onTaskComplete(task);
	}

	return (
		
	 <React.Fragment>
		<div className='content__header'>
			{ activeItem && <h1>{activeItem.name}<img src={editTitleIcon} alt='Edit Title' className='editTitlePen'
			onClick={editTitle}></img></h1> }
			</div>
		
		<div className='content__list'>
			{ !activeItem && <h2>Задачи отсутствуют</h2> }
			{ activeItem && activeItem.tasks.length === 0 && <h2>Задачи отсутствуют</h2> }
			{ activeItem && activeItem.tasks && activeItem.tasks.map( task => {
				return <li className='taskItem' key={task.id}>{task.text}
				<img src={taskCompleteIcon} className='taskCompleteIcon' alt='Task Complete'
				onClick={() => TaskComplete(task)}></img></li>
			}) }
			</div>
		<div className='content__addTask'>
			<input className='content__addTaskInput' placeholder='Введите задачу' value={inputValue}
			onChange={ e => setInputValue(e.target.value)}></input>
			<img src={addTaskIcon} alt='Add Task' className='addTaskIcon' onClick={addTaskList}></img>
		</div>  
		</React.Fragment>
			
		
	)
}


export default Content;