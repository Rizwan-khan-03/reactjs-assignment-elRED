import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MdModeEditOutline } from 'react-icons/md';
import { IoChevronForwardSharp } from 'react-icons/io5';
import logo from './images/upload-logo.jpg'
function BioScreen() {
    const storedData = localStorage.getItem('biodetails');
    const storedskillData = localStorage.getItem('skill');
    const [text, setText] = useState('');
    const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [skills, setSkill] = useState([])
    const [hobbies, setHobbies] = useState([]);
    useEffect(() => {
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            if (storedData) {
                setText(parsedData.text || '');
                setSelectedBloodGroup(parsedData.selectedBloodGroup || '');
                setSelectedFile(parsedData.selectedFile || null);
            }
        }
        if (storedskillData) {
            const skilldata = JSON.parse(storedskillData);
            if (storedskillData) {
                setSkill(skilldata.selectedSkill || []);
                setHobbies(skilldata.selectedHobbies || []);
            }
        }

    }, [storedData, storedskillData])
    return (
        <Container>
            <Row className="d-flex justify-content-center align-items-center">
                <Col xs={12} sm={6} md={6} lg={6} className="text-center align-items-end">
                    <div className="d-flex">
                        <span>About me</span>
                        <Link to='/bioedit'><MdModeEditOutline /></Link>
                    </div>
                    {
                        text ? <p>{text}</p> : <p>No about me added yet</p>
                    }
                    <hr />
                </Col>

            </Row>

            <Row className="d-flex justify-content-center align-items-center">
                <Col xs={12} sm={6} md={6} lg={6} className="text-center align-items-end">
                    <div className="d-flex">
                        <span>Blood Group</span>
                        {selectedBloodGroup ? <p>{selectedBloodGroup}</p> : <p>No group</p>}
                    </div>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center align-items-center">
                <Col xs={12} sm={6} md={6} lg={6} className="text-center align-items-end">
                    <div className="custom-container">
                        <div className="custom-content">
                            <div className="custom-left">
                                <img className="logo_img" src={logo} alt="Logo" />
                                <span>Resume</span>
                            </div>
                            <div className="custom-right">
                                <Link to="/resumescreen"><IoChevronForwardSharp /></Link>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center align-items-center">
                <Col xs={12} sm={6} md={6} lg={6} className="text-center align-items-end">
                    <div className="d-flex">
                        <span>Skills</span>
                        <Link to='/skills'><MdModeEditOutline /></Link>
                    </div>
                    {skills ? (
                        skills?.map((skil) => (
                            <span>{skil?.label}</span>
                        ))
                    ) : (<p>No Skill added yet</p>)
                    }

                </Col>
            </Row>
            <Row className="d-flex justify-content-center align-items-center">
                <Col xs={12} sm={6} md={6} lg={6} className="text-center align-items-end">
                    <div className="d-flex">
                        <span>Hobbies</span>
                        <Link to='/skills'><MdModeEditOutline /></Link>
                    </div>
                    {hobbies ? (
                        hobbies?.map((hobbies ) => (
                            <span>{hobbies?.label}</span>
                        ))
                    ) : (<p>No hobbies  added yet</p>)
                    }

                </Col>
            </Row>
        </Container>

    )
}

export default BioScreen