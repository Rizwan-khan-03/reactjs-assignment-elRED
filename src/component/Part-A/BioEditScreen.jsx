import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { AiFillFile } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { IoIosArrowBack } from 'react-icons/io';
function BioEditScreen() {
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const maxCharacters = 500;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    const handleSelect = (eventKey) => {
        setSelectedBloodGroup(eventKey);
        setIsOpen(!isOpen);
    };
    const handleChange = (event) => {
        const newText = event.target.value;
        if (newText.length <= maxCharacters) {
            setText(newText);
        }
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === 'application/pdf' && file.size <= 5 * 1024 * 1024) {
                setSelectedFileName(file?.name)
                const reader = new FileReader();
                reader.onload = function () {
                    const fileData = reader.result;
                    localStorage.setItem('savedFile', fileData);
                    setSelectedFile(fileData);
                };
                reader.readAsDataURL(file);
            } else {
                setSelectedFile(null);
                alert('Please select a valid PDF file with a maximum size of 5 MB.');
            }
        }
    };
    const handleSave = () => {
        const dataToSave = {
            text: text,
            selectedBloodGroup: selectedBloodGroup,
            selectedFile: selectedFile
        };
        const jsonString = JSON.stringify(dataToSave);
        localStorage.setItem('biodetails', jsonString);
        navigate('/');
    };
    const handleDeleteFile = () => {
        setSelectedFile(null);
    };
    return (
        <>
            <Container>
                <Row className="d-flex justify-content-center align-items-center">
                    <Col xs={12} sm={12} md={6} lg={4} className="text-center">
                        <Card className="p-4 shadow" style={{ maxWidth: '100%', height: '100vh', position: 'relative' }}>
                            <Row className="d-flex justify-content-start align-items-start">
                                <Col className="text-start">
                                    <div >
                                        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}><IoIosArrowBack />My Bio</Link>{' '}
                                    </div>  
                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-center align-items-center">
                                <Col className="text-center">
                                    <div className="d-flex">
                                        <span>Write something about your self</span>
                                    </div>
                                    <div className="d-flex">
                                        <InputGroup>
                                            <Form.Control
                                                as="textarea"
                                                aria-label="With textarea"
                                                placeholder='Write something here'
                                                value={text}
                                                onChange={handleChange}
                                            />
                                        </InputGroup>
                                    </div>
                                    <p style={{ textAlign: 'right' }}>{text.length}/{maxCharacters}</p>
                                </Col>
                            </Row>
                            {
                                selectedFile && <Row className="d-flex justify-content-center align-items-center">
                                    <Col className="text-center">
                                        <iframe src={selectedFile} title='pdf file display'></iframe>
                                    </Col>
                                </Row>
                            }

                            <Row className="d-flex justify-content-center align-items-center">
                                <Col className="text-center">
                                    <div className="d-flex justify-content-center">
                                        <label htmlFor="resumeUpload" className="custom-file-upload">
                                            <AiFillFile style={{ marginRight: '10px' }} /> Upload Resume
                                        </label>
                                        <input
                                            type="file"
                                            id="resumeUpload"
                                            className="form-control-file"
                                            accept=".pdf"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    {selectedFileName && (
                                        <div className="d-flex">
                                            <p>Selected file: {selectedFileName}</p>
                                            <MdOutlineDeleteOutline style={{ color: 'red', border: 'none', cursor: 'pointer' }} onClick={handleDeleteFile} />
                                        </div>
                                    )}
                                </Col>
                            </Row>

                            <Row className="d-flex justify-content-center align-items-center">
                                <Col className="text-center">
                                    <div className="d-flex">
                                        <span>Blood Group</span>
                                    </div>

                                    <div className={`custom-dropdown ${isOpen ? 'open' : ''}`}>
                                        <div className="dropdown-header" onClick={toggleDropdown}>
                                            <span className="selected-option">
                                                {selectedBloodGroup || 'Select Blood Group'}
                                            </span>
                                            <span className="arrow-icon">&#9660;</span>
                                        </div>
                                        <div className="dropdown-options">
                                            {
                                                ['A+ (Positive)', ' A- (Negative)', ' B+ (Positive)'].map((group) => (
                                                    <div key={group + 1} className="option" onClick={() => handleSelect(group)}>
                                                        {group}
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    </div>

                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-center align-items-center">
                                <Col className="text-center align-items-end">
                                    <div className="custom-button" style={{ padding: '10px', position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
                                        <Button onClick={handleSave} variant="danger" className="custom-button" disabled={!selectedBloodGroup || !text || !selectedFile}>
                                            Save
                                        </Button>
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

export default BioEditScreen