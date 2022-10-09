import '../styles/components/registerLetter.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEthers } from '@usedapp/core';

import Form from 'react-bootstrap/Form';
import { useForm, useFieldArray } from "react-hook-form";
import { faTrash , faUserPlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

type FormValues = {
    recivers: {
        address: string;
    }[];
    life_period: number;
    secret:string;
};

const RegisterLetter = () => {
	const editor = useRef(null);
    const { activateBrowserWallet, account } = useEthers();
    const [textSecret, setTextSecret] = useState<string>("");
    const { register, control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            recivers: [{ address: "" }],
            life_period: 170,
            secret:""
        },
        mode: "onBlur"
      });

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "recivers", // unique name for your Field Array
    });
    
    const onSubmit = async (data:any) => {
        console.log("data",data);
        console.log("secret",textSecret);
        data["secret"]=textSecret;
        console.log("data",data);
        //await mint(data);
    };


    return (
        <div className="row mx-0 mt-1">
            {!account? (
                <div className="col-md-12 text-center my-auto" >
                    <img src = {process.env.PUBLIC_URL + '/logo1.png'} alt=":)" height={'auto'} className='img-fluid' style={{borderRadius: '20px'}}  />
                    <h1>
                    Connect your Wallet!
                    </h1>
                </div>
            ):(
                <Container className="mx-0 px-0 vh-100 fluid">
                    <Row className="justify-content-md-center text-center m-5 letter-register">
                        <h1>Register your Letter</h1>
                    </Row>
                    <Row className="justify-content-md-center m-0 p-5 letter-register">
                    <Form className="col-sm-10 text-center p-100" 
                    onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group as={Row} md="3" className="p-3" controlId="life_period">
                        <Col><Form.Label>Life period</Form.Label></Col>
                        <Col><Form.Control  type="number" placeholder="days" {...register("life_period", { min: 1, max: 500 })}/>
                    </Col>
                    </Form.Group>
                    {fields.map((field, index) => {
                        return (
                            <div key={field.id}>
                            <section className={"section"} key={field.id}>
                                <Form.Group as={Row} md="3" className="p-3 form-register" controlId="life_period">
                                    <Col><Form.Label>Wallet {index+1}</Form.Label></Col>
                                    <Col>
                                        <Form.Control  type="text" placeholder="address"
                                        {...register(`recivers.${index}.address` as const, {
                                            required: true
                                        })}
                                        className={errors?.recivers?.[index]?.address ? "error" : ""}/>
                                    </Col>
                                    <Col>
                                        <FontAwesomeIcon icon={faTrash} onClick={() => remove(index)}/>
                                    </Col>
                                </Form.Group>
                                
                            </section>
                            </div>
                        );
                    })}

                    <FontAwesomeIcon icon={faUserPlus} onClick={() => append({
                            address: "",
                            })}/>
                    <br></br><br></br>
                    <section className="p-5">
                    <JoditEditor
                        ref={editor}
                        value={textSecret}
                        onBlur={newContent => setTextSecret(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={newContent => {}}
                    />
                    </section>
                    
                    <br></br><br></br>
                    <Button type="submit">Submit form</Button>
                    </Form>
                    </Row>
                </Container>
            )
            }
        </div>
    )
}

export default RegisterLetter;