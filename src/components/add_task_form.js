import React from 'react';

class AddTaskForm extends React.Component{
    render() {
        const form_elements = this.props.form_elements;
        return (
            <form>
                <div className="mt-2">
                <select className="form-select" value={form_elements.status} name="status" onChange={this.props.handleCreating} >
                    <option value="0">To do</option>
                    <option value="1">In progress</option>
                    <option value="2">Done</option>
                </select>
                </div>
                <div className="mt-2">
                <input name="title" type="text" className="form-control" placeholder="Title" onChange={this.props.handleCreating} value={form_elements.title}/>
                </div>
                <div className="mt-2">
                <textarea className="form-control" placeholder="Description" name="description" onChange={this.props.handleCreating} value={form_elements.description}></textarea>
                </div>
                <div className="mt-2 text-end">
                <button className="btn btn-info text-white" onClick={this.props.addTask} type="submit">追加</button>
                </div>
            </form>
        )
    }
}

export default AddTaskForm;