import React from 'react';

class TaskForm extends React.Component{
    render() {
        return (
            <form onSubmit={this.props.onSubmit} >
                <div className="mt-2">
                <select className="form-select" value={this.props.form_elements.status} name="status" onChange={this.props.handleUpdating}>
                    <option value="0">To do</option>
                    <option value="1">In progress</option>
                    <option value="2">Done</option>
                </select>
                </div>
                <div className="mt-2">
                <input name="title" type="text" className="form-control" placeholder="Title" value={this.props.form_elements.title} onChange={this.props.handleUpdating}/>
                </div>
                <div className="mt-2">
                <textarea className="form-control" placeholder="Description" name="description" value={this.props.form_elements.description} onChange={this.props.handleUpdating}></textarea>
                </div>
                <div className="mt-2 text-end">
                <button className="btn btn-success text-white" type="submit">更新</button>
                </div>
            </form>
        )
    }
}

export default TaskForm;