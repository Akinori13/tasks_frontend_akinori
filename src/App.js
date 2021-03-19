import './App.css';
import React from 'react'
import axios from 'axios';

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      is_loading: true,
    };
  }

  componentDidMount() {
    this.get_tasks()
  }

  componentDidUpdate() {
    
  }

  get_tasks() {
    axios
      .get('http://127.0.0.1:8000/api/')
      .then((response) => {
        const data = response.data
        this.state.tasks.push(...data)
        this.setState({
          tasks: this.state.tasks,
          is_loading: false
        })
      })
      .catch((e) => {
        console.log('Faild...' + e);
      })
  }

  render() {
    return(
      <>
        <ul>
          {this.state.tasks.map((task, index) => (
            <li key={index}>
              {task.title}
            </li>
          ))}
        </ul>
      </>
    )
  }
}
