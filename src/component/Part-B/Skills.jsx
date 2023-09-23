import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

function CustomMultiSelect() {
    const navigate = useNavigate();
    const [skills, setSkill] = useState([])
    const [hobbies, setHobbies] = useState([]);


    const [selectedSkill, setSelectedSkill] = useState([]);
    const [selectedHobbies, setSelectedHobbies] = useState([]);


    const handleChangeSkill = (selectedValues) => {
        setSelectedSkill(selectedValues);
    };

    const handleChangeHobbies = (selectedValues) => {
        setSelectedHobbies(selectedValues);
    };
    useEffect(() => {
        fetch('https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/GetProfessionalSkillsResponse.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const skillsArray = data?.result[0].skills;
                const skillres = skillsArray.map((skil) => ({
                    value: skil.value,
                    label: skil.value,
                    id: skil._id
                }));
                setSkill(skillres);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });

        fetch('https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/GetHobbiesResponse.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const hobbyArray = data?.result[0].hobbies;
                const hobres = hobbyArray.map((hob) => ({
                    value: hob.value,
                    label: hob.value,
                    id: hob._id
                }));
                setHobbies(hobres);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [selectedSkill, selectedHobbies])
    const handleSave = () => {
        const dataToSave = {

            selectedSkill: selectedSkill,
            selectedHobbies: selectedHobbies
        };
        const jsonString = JSON.stringify(dataToSave);
        localStorage.setItem('skill', jsonString);
        navigate('/');
    };


    return (
        <Container>
            <Row className="d-flex justify-content-center align-items-center">
                <Col xs={12} sm={6} md={6} lg={4} className="text-center">
                    <Card className="p-4 shadow" style={{ maxWidth: '100%', height: '80vh', position: 'relative' }}>
                        <Row className="d-flex justify-content-center align-items-center">
                            <Col className="text-center">

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
                            <Col className="text-center align-items-end">
                               
                                <div className="custom-button" style={{padding:'10px', position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
                                    <Button
                                        onClick={handleSave}
                                        variant="danger"
                                        className="custom-button"
                                        disabled={selectedSkill.length === 0 || selectedHobbies.length === 0}

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