import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { IoIosArrowBack } from 'react-icons/io';
import { fetchHobbies, fetchProfessionalSkills, fetchSubjects } from '../Service/service';
function CustomMultiSelect() {
    const navigate = useNavigate();
    const [skills, setSkill] = useState([])
    const [hobbies, setHobbies] = useState([]);
    const [subject, setSubject] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState([]);
    const [selectedHobbies, setSelectedHobbies] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState([]);
    const [isDataFecthed, setIsDataFecthed] = useState(false);

    const handleChangeSkill = (selectedValues) => {
        setSelectedSkill(selectedValues);
    };

    const handleChangeHobbies = (selectedValues) => {
        setSelectedHobbies(selectedValues);
    };
    const handleChangeSubject = (selectedValues) => {
        setSelectedSubject(selectedValues);
    };
    useEffect(() => {
        fetchData()
    }, [selectedSkill, selectedHobbies])
    async function fetchData() {
        try {
            setIsDataFecthed(true)
            const skillsData = await fetchProfessionalSkills();
            const hobbiesData = await fetchHobbies();
            const subjectData = await fetchSubjects();
            setSkill(skillsData);
            setHobbies(hobbiesData)
            setSubject(subjectData);
            setIsDataFecthed(false)
        } catch (error) {
            setIsDataFecthed(false)
            console.error('An error occurred:', error);
        }
    }
    const handleSave = () => {
        const dataToSave = {
            selectedSkill: selectedSkill,
            selectedHobbies: selectedHobbies,
            selectedSubject: selectedSubject
        };
        const jsonString = JSON.stringify(dataToSave);
        localStorage.setItem('skill', jsonString);
        navigate('/');
    };


    return (
        <Container>
            <Row className="d-flex justify-content-center align-items-center">
                <Col xs={12} sm={12} md={6} lg={4} className="text-center">
                    <Card className="p-4 shadow" style={{ maxWidth: '100%', height: '90vh', position: 'relative' }}>
                        <Row className="d-flex justify-content-start align-items-start">
                            <Col className="text-start">
                                <div >
                                    <Link to="/" style={{ textDecoration: 'none', color: 'black' }}><IoIosArrowBack />My Bio</Link>{' '}
                                </div>
                            </Col>

                        </Row>
                        <Row className="d-flex justify-content-center align-items-center">
                            <Col className="text-center">
                                {isDataFecthed && <p>Skills Loading...</p>}
                                <h5>I am incredible at these skills / professionally great</h5>
                                <Select
                                    isMulti
                                    options={skills}
                                    value={selectedSkill}
                                    onChange={handleChangeSkill}
                                />

                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-center align-items-center">
                            <Col className="text-center">
                            {isDataFecthed && <p>Hobbies Loading...</p>}
                                <h5>I am passionate about</h5>
                                <Select
                                    isMulti
                                    options={hobbies}
                                    value={selectedHobbies}
                                    onChange={handleChangeHobbies}
                                />

                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-center align-items-center">
                            <Col className="text-center">
                            {isDataFecthed && <p>Subject Loading...</p>}
                                <h5>My favourite subject</h5>
                                <Select
                                    isMulti
                                    options={subject}
                                    value={selectedSubject}
                                    onChange={handleChangeSubject}
                                />

                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-center align-items-center">
                            <Col className="text-center align-items-end">
                                <div className="custom-button" style={{ padding: '10px', position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
                                    <Button
                                        onClick={handleSave}
                                        variant="danger"
                                        className="custom-button"
                                        disabled={selectedSkill.length === 0 || selectedHobbies.length === 0 || selectedSubject.length === 0}

                                    >
                                        Save
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Card>

                </Col>
            </Row>
        </Container>
    );
}

export default CustomMultiSelect;