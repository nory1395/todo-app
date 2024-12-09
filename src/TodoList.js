import React,{useEffect, useState} from 'react';
import axios from 'axios';
import './Todolist.css';

const TodoList = () =>{
    const [todos, setTodos]= useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8081/api/todos')
            .then(response =>setTodos(response.data))
            .catch(error => console.error(error));
    }, []);

    const addTodo=()=>{
        if(!newTodo.trim()){
            alert('Please, add a valid task');
            return;
        }
        axios.post('http://localhost:8081/api/todos',{title:newTodo, completed: false})
            .then(response => {
                setTodos( prevTodos =>[...prevTodos,response.data]);
                setNewTodo('');
            })
            .catch(error=> console.error(error));
        setNewTodo('');
    };
    const toggleComplete = (todo) => {
        axios.put(`http://localhost:8081/api/todos/${todo.id}`, { ...todo, completed: !todo.completed })
            .then(response => {
                const updatedTodos = todos.map(t => (t.id === todo.id ? response.data : t));
                setTodos(updatedTodos);
            })
            .catch(error => console.error(error));
    };

    const deleteTodo = (id) => {
        axios.delete(`http://localhost:8081/api/todos/${id}`)
            .then(() => setTodos(todos.filter(todo => todo.id !== id)))
            .catch(error => console.error(error));
    };

    return(
        <div className="container">
            <h1>To-do List</h1>
            <input
                type="text"
                value= {newTodo}
                onChange={(e)=>setNewTodo(e.target.value)}
            />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span
                            style={{ textDecoration: todo.completed ? 'line-through' : 'none'}}
                            onClick={()=> toggleComplete((todo))}>
                        {todo.title}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)}> Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList
