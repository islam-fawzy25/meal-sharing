import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./footer.css";

const Footer = () => {
    return (
        <>
            <Card>
                <Card.Footer className='footer'>
                    Designed by <a href="https://www.linkedin.com/in/islam-fawzy/">Islam Fawzy</a>
                </Card.Footer>
            </Card>

        </>
    )
}

export default Footer