import React from 'react';
import {Navbar} from 'react-bootstrap';

const Footer = () => {

    return (
        <div className="footer" style={{height: "75px", bottom: '0', marginTop: '5rem'}}>
            <Navbar sticky="bottom">
                <h3>Created by Shawn Renee Casaus: 2021</h3>
            </Navbar>
        </div>
    );
}

export default Footer;