import React, { useState,useEffect } from 'react';
import * as axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar/Sidebar.jsx';
import Content from './components/Content/Content.jsx';

import './App.css';

function App() {

  let [ state, setState ] = useState(null);
  let [ activeItem, setActiveItem ] = useState(null);

    useEffect( () => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks')
    .then( ({data}) => setState(data) )
  }, []);

    const onAddList = (data) => {
      let newState = [...state, data];
      setState(newState);
    }
  
  const onDeleteItem = (id) => {

    let newState;
    if ( activeItem === null ) {
      newState = state.filter( item => {
      return item.id !== id;
      })
    } else {

          if ( id === activeItem.id ) {
            chooseActiveItem(null);
          } 
          newState = state.filter( item => {
            return item.id !== id;
          }) 
    }
    
    setState(newState);
    
  }

  const chooseActiveItem = (item) => {
    setActiveItem(item);
  }

  const editTitleList = (title) => {
    let newActiveItem = { ...activeItem, name : title };
    axios.patch('http://localhost:3001/lists/' + activeItem.id, {
      name : title
    }).catch(() => alert('Не удалось обновить. Попробуйте позже.'));
    setActiveItem(newActiveItem);
    let newState = state.map( item => { 
        if(item.id === newActiveItem.id) {
          item = newActiveItem
        } return item;

    })
    setState(newState);

  }

  const onAddTaskList = (newTask) => { 
         axios.post('http://localhost:3001/tasks', newTask)
         .then(({data}) => {
          if ( !activeItem.tasks) activeItem.tasks = [];
          let newActiveItem = {...activeItem, tasks : [...activeItem.tasks,data]};
          setActiveItem(newActiveItem);
          let newState = state.map( item => {
            if ( item.id === newActiveItem.id ) item = newActiveItem;
            return item;
          })
          setState(newState);

         })
  }

  const onTaskComplete = (task) => {
        axios.delete('http://localhost:3001/tasks/' + task.id)
        .then( ({data}) => {
          let newState = state.map( item => {
            if ( item.id === task.listId ) {
              item.tasks = item.tasks.filter( el => {
                return el.id !== task.id
              })
            }
            return item;
          })
          setState(newState);
        })
  }

  return (
    <Router>
    <div className="App">
     
    <div className='sidebar'><Sidebar chooseActiveItem={chooseActiveItem} onAdd={onAddList} 
    state={state} onDeleteItem={onDeleteItem}/></div>
    <Route path='/' render={ () => <div className='content'><Content activeItem={activeItem} editTitleList={editTitleList}
    onAddTaskList={onAddTaskList} onTaskComplete={onTaskComplete}/></div>} />

    </div>
    </Router>
  );
}

export default App;
