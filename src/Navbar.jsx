import React from 'react'
import CreateEditModal from './CreateEditModal';
const Logo  =  require("./logo.png");

function Navbar() {
  return (
    <div className="navbar-box">
        <div>
            <img src={Logo} alt="eduallsys" />
        </div>
        <div>
           <CreateEditModal />
        </div>
    </div>
  )
}

export default Navbar