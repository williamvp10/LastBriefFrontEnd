import '../styles/components/Home.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../styles/images/Logo1.png';

const Home = () => {
    return (
        <div className="row mx-0 mt-1">
            <div className="col-md-6 col-sm-12  text-center my-auto p-5" >
                <img src = {logo} alt=":)" width={'100%'} height={'auto'} className='img-fluid' style={{borderRadius: '20px'}}  />
            </div>
            <div className="col-md-6 col-sm-12 py-0 my-auto">
                
                <div className="row mx-5 my-4 home-info" style={{textAlign: 'justify'}}>
                <h1>Testament</h1> <br></br>
                In German, “Brief” means “Letter”. <br></br><br></br>
                Draft up a “Brief”, write down your most intimate words and the most inprotant message and destinate to who you would like to send to. <br></br><br></br>
                It can be your family, you lover, your friends or even anyone that you just know about their adress. “Brief” is encrypted and can be only decrypted by the adressee which will be automatically sent according to your premilimary setting.
                
                </div>
                
                <div className="row mx-0 general-div-button">
                    <Link to={"/Register_letter"}>
                        <Button variant="dark" size="lg" className="px-5">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </div>


    )
}

export default Home;
