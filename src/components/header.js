import React from 'react'

class Header extends React.Component{
    render() {
        return (
            <header>
                <nav className="navbar navbar-dark bg-dark">
                    <div className="container-fluid">
                    <h2 className="navbar-brand mb-0">Tasks</h2>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header;