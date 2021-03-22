import './App.css';
import React from 'react'
import axios from 'axios';
import Header from './components/header'
import TextStatus from './components/text_status'
import AddTaskForm from './components/add_task_form'
import TaskForm from './components/task_form'

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      new_task: {
        title: '',
        description: '',
        status: '0',
      },
      task: {
        id: 0,
        title: '',
        description: '',
        status: '0',
      },
      is_loading: true,
    };
  }

  componentDidMount() {
    this.getTasks();
    this.setState({
      is_loading: false
    })
  }

  getTasks() {
    axios
      .get('http://127.0.0.1:8000/api/')
      .then((response) => {
        const data = response.data;
        this.setState({
          tasks: [...data],
        })
      })
      .catch((e) => {
        console.log('Faild...' + e);
      })
  }

  addTask = (e) => {
    e.preventDefault();
    const new_task = {...this.state.new_task};
    axios
      .post('http://127.0.0.1:8000/api/',{
        title: new_task.title,
        description: new_task.description,
        status: Number(new_task.status)
      })
      .then((response) => {
        this.state.tasks.unshift(response.data)
        this.setState({
          tasks: this.state.tasks,
          new_task: {
            title: '',
            description: '',
            status: '0'
          },
        })
      })
      .catch((e) => {
        console.log('Faild...' + e);
      })
  }

  handleCreating = (e) => {
    const new_task = this.state.new_task;
    new_task[e.target.name] = e.target.value;
    this.setState({
      new_task: new_task
    });
  }

  deleteTask = (event, index) => {
    axios
      .delete('http://127.0.0.1:8000/api/' + event.target.dataset.task_id)
      .then(() => {
        const tasks = this.state.tasks;
        tasks.splice(index, 1);
        this.setState({
          tasks: tasks
        })
      })
      .catch((e) => {
        console.log('Faild...' + e);
      })
  }

  startUpdating = (e) => {
    const task_id = Number(e.target.dataset.task_id);
    const task_info = this.state.tasks.find(task => task.id === task_id)
    const task = this.state.task;
    task['id'] = task_info.id;
    task['title'] = task_info.title;
    task['description'] = task_info.description;
    task['status'] = task_info.status;
    this.setState({
      task: task
    });
  }

  handleUpdating = (e) => {
    const task = this.state.task;
    task[e.target.name] = e.target.value;
    this.setState({
      task: task
    });
  }

  updateTask = (e) => {
    e.preventDefault();
    const updated_task = this.state.task;
    axios
      .post('http://127.0.0.1:8000/api/' + updated_task.id,{
        title: updated_task.title,
        description: updated_task.description,
        status: Number(updated_task.status)
      })
      .then((response) => {
        const updated_tasks = this.state.tasks.map((task) => {
          if (task.id === updated_task.id){
            return response.data;
          } else {
            return task;
          }
        });
        this.setState({
          tasks: updated_tasks,
          task: {
            id: 0,
            title: '',
            description: '',
            status: '0'
          },
        })
      })
      .catch((e) => {
        console.log('Faild...' + e);
      })
  }


  render() {
    return(
      <>
        <Header />
        <main className="mt-2">
          <section className="container mt-4">
            <div className="row">
              <div className="col-12">
                <AddTaskForm 
                form_elements={this.state.new_task}
                handleCreating={this.handleCreating}
                addTask={this.addTask}
                />
              </div>
              <div className="col-12">
                <TaskForm 
                form_elements={this.state.task}
                handleUpdating={this.handleUpdating}
                onSubmit={this.updateTask}
                />
              </div>
            </div>
          </section>
          
          <section className="container mt-4">
            <div className="row">
              <div className="col-12">
                <table className="table table-dark">
                  <thead>
                    <tr>
                      <th className="col-2">タイトル</th>
                      <th className="col-6">説明</th>
                      <th className="col-2">進行状況</th>
                      <th className="col-2">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.tasks.map((task, index) => (
                      <tr key={task.id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td><TextStatus status={task.status}/></td>
                        <td>
                          <div className="d-flex justify-content-between">
                            <button data-task_id={task.id} className="btn btn-sm btn-outline-success" onClick={this.startUpdating}>更新</button>
                            <button data-task_id={task.id} className="btn btn-sm btn-outline-danger" onClick={(event) => this.deleteTask(event, index)}>削除</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </>
    )
  }
}
