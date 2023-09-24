import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from 'react-bootstrap';
import { MdModeEditOutline } from 'react-icons/md';
import { IoChevronForwardSharp } from 'react-icons/io5';
import logo from './images/upload-logo.jpg'
import MetUpPopUp from '../Part-B/MetUpPopUp';
import EthicalCoderPopUp from '../Part-B/EthicalCoder';
import { fetchEthicalCodeData, fetchMeetUpData } from '../Service/service';
function BioScreen() {
    const storedData = localStorage.getItem('biodetails');
    const storedskillData = localStorage.getItem('skill');
    const [text, setText] = useState('');
    const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
    const [skills, setSkill] = useState([])
    const [hobbies, setHobbies] = useState([]);
    const [subject, setSubject] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalCode, setShowModalCode] = useState(false);
    const [meetUp, setMeetUp] = useState([]);
    const [codeEthical, setCodeEthical] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            if (storedData) {
                setText(parsedData.text || '');
                setSelectedBloodGroup(parsedData.selectedBloodGroup || '');
            }
        }
        if (storedskillData) {
            const skilldata = JSON.parse(storedskillData);
            if (storedskillData) {
                setSkill(skilldata.selectedSkill || []);
                setHobbies(skilldata.selectedHobbies || []);
                setSubject(skilldata.selectedSubject || []);
            }
        }

    }, [storedData, storedskillData])
    async function fetchData() {
        try {
            const meetUpData = await fetchMeetUpData();
            const ethicalCode = await fetchEthicalCodeData();
            setMeetUp(meetUpData)
            setCodeEthical(ethicalCode)
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
    const handleShowMeet = () => setShowModal(true);
    const handleShowCode = () => setShowModalCode(true);
    return (
        <>
            {showModal && <MetUpPopUp setShowModal={setShowModal} showModal={showModal} meetUp={meetUp} />}
            {showModalCode && <EthicalCoderPopUp setShowModal={setShowModalCode} showModal={showModalCode} codeEthical={codeEthical} />}
            <Container>
                <Row className="d-flex justify-content-center align-items-center">
                    <Col xs={12} sm={12} md={6} lg={4} className="text-center align-items-end">
                        <Card className="p-4 shadow" style={{ maxWidth: '100%', height: '100%', position: 'relative' }}>
                            <Row className="d-flex justify-content-center align-items-center">
                                <Col className="text-center align-items-end">
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
                                <Col className="text-center align-items-end">
                                    <div className="d-flex">
                                        <span>Blood Group</span>
                                        {selectedBloodGroup ? <p>{selectedBloodGroup}</p> : <p>No group</p>}
                                    </div>
                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-center align-items-center">
                                <Col className="text-center align-items-end">
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
                                <Col className="text-center align-items-end">
                                    <div className="d-flex">
                                        <span>Skills</span><br />

                                        <Link to='/skills'><MdModeEditOutline /></Link>
                                    </div>
                                    <p>I am incredible at these skills / professionally great</p>
                                    {skills ? (
                                        skills?.map((skil) => (
                                            <span
                                                key={skil?._id}
                                                className="custom-button-span"
                                            >{skil?.label}</span>
                                        ))
                                    ) : (<p>No Skill added yet</p>)
                                    }

                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-center align-items-center">
                                <Col className="text-center align-items-end">
                                    <div className="d-flex">
                                        <span>Hobbies i am possionate about</span>
                                        <Link to='/skills'><MdModeEditOutline /></Link>
                                    </div>
                                    {hobbies ? (
                                        hobbies.map((hobby) => (
                                            <span
                                                key={hobby?._id}
                                                className="custom-button-span"
                                            >
                                                {hobby?.label}
                                            </span>
                                        ))
                                    ) : (
                                        <p>No hobbies added yet</p>
                                    )}

                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-center align-items-center">
                                <Col className="text-center align-items-end">
                                    <div className="d-flex">
                                        <span>My favourite subject</span>
                                        <Link to='/skills'><MdModeEditOutline /></Link>
                                    </div>
                                    {subject ? (
                                        subject.map((sub) => (
                                            <span
                                                key={sub?._id}
                                                className="custom-button-span"
                                            >
                                                {sub?.label}
                                            </span>
                                        ))
                                    ) : (
                                        <p>No subject added yet</p>
                                    )}

                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-center align-items-center custom-card-outer">
                                <Col className="text-center align-items-end">
                                    <div >
                                        <h5 className="text-start">Rating</h5>
                                        <div className='d-flex justify-content-space-between'>
                                            <p onClick={handleShowMeet} className='modal-open'>  {meetUp?.length}</p>
                                            <p>  meet in real life/video call</p>
                                        </div>
                                        <div style={{ height: '1px', background: 'gray' }}></div>

                                        <div className='d-flex justify-content-space-between'>
                                            <p onClick={handleShowCode} className='modal-open'> {codeEthical?.length}</p>
                                            <p>Say has ethical code of conduct and safe to do business with</p>
                                        </div>
                                    </div>
                                </Col>

                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>


    )
}

export default BioScreen