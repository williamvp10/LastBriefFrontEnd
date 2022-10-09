import '../styles/components/SucessTransaction.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const sucessTransaction = () => {
    return (
        <div className="row mx-0 mt-1 py-0 justify-content-md-center vh-100">
            <div className="col-md-8 mt-5 mx-5 sucess-container">
                <h1>Sucess!</h1> <br></br>
                <p>You have sucessfully set up your <a>Brief!</a></p>
                <div className="row mx-0 general-div-button">
                    <Link to={"/Briefs"}>
                        <Button variant="dark" size="lg" className="px-5">
                            Check your brief
                        </Button>
                    </Link>
                </div>
            </div>
        </div>


    )
}

export default sucessTransaction;
