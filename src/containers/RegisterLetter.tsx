import '../styles/components/registerLetter.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { useEthers } from '@usedapp/core';
//form
import Form from 'react-bootstrap/Form';
import { useForm, useFieldArray } from "react-hook-form";
import { faTrash , faUserPlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { useNavigate } from "react-router-dom";

//sc
import { Inheritance } from '../abis/types';
import { SC_ADDRESSSES } from '../constants/adresses';
import useContract from '../utils/useContracts';
import ABI from '../abis/Inheritance.json';
import { Contract } from 'ethers';

import { watch } from 'fs';
import {  getExplorerTransactionLink } from '@usedapp/core';
import { JsonRpcSigner } from '@ethersproject/providers'; 



type FormValues = {
    recivers: {
        address: string;
    }[];
    life_period: number;
    reciversList: string[];
    secret:string;
};

const RegisterLetter = () => {
	const editor = useRef(null);
    const [textSecret, setTextSecret] = useState<string>("");
    const { register, control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            recivers: [{ address: "" }],
            life_period: 170,
            secret:"",
            reciversList: []
        },
        mode: "onBlur"
      });

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "recivers", // unique name for your Field Array
    });
    const navigate = useNavigate();
    
    //contract
    const contract = useContract<Inheritance>(SC_ADDRESSSES, ABI);
    const { activateBrowserWallet, account } = useEthers();
    const {library, chainId} = useEthers();
    const [txHash, setTxHash] = useState<string | null | undefined>( undefined );

    const [isDisabled, setIsDisabled]= useState<boolean>(false);
    const mint= async (data: FormValues)=>{
        const signer: JsonRpcSigner | undefined =  library?.getSigner();

        if (signer){
            const tx = await contract?.connect(signer).addBriefOwner(
                ""+account,
                data.reciversList,
                data.life_period,
                "hash"
            );
            
            if (chainId && tx){
                setIsDisabled(true);
                const link= getExplorerTransactionLink(tx?.hash, chainId);
                setTxHash(link);
            }

            await tx?.wait();
            setTxHash(undefined);
            setIsDisabled(false);
            navigate("/Sucess_transaction");
        }
    }


    const onSubmit = async (data:FormValues) => {
        console.log("data",data);
        console.log("secret",textSecret);
        data["secret"]=textSecret;
        var recivers = [];
        for await (const iterator of data.recivers) {
            recivers.push(iterator.address);
        }
        data.reciversList=recivers;
        data.life_period=data.life_period*86400;
        console.log("data",data);
        mint(data);
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
            <br></br>
            {isDisabled?
            <div>
                upload brief: <a target="_blanck" rel="noreferrer" href={txHash? txHash:""}> {txHash}</a>
            </div>:
            <></>}
            

        </div>
    )
}

export default RegisterLetter;