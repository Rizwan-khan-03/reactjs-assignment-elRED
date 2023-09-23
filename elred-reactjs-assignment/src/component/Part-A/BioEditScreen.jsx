import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { AiFillFile } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
function BioEditScreen() {
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const maxCharacters = 500;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

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
                // File is a valid PDF and within the size limit
                setSelectedFile(file);
            } else {
                // File is not a valid PDF or exceeds the size limit
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
    return (
        <Container>
            <Row className="d-flex justify-content-center align-items-center">
                <Col xs={12} sm={6} md={6} lg={6} className="text-center">
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

            <Row className="d-flex justify-content-center align-items-center">
                <Col xs={12} sm={6} md={6} lg={6} className="text-center">
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
                    {selectedFile && (
                        <div>
                            <p>Selected file: {selectedFile.name}</p>
                        </div>
                    )}
                </Col>

            </Row>

            <Row className="d-flex justify-content-center align-items-center">
                <Col xs={12} sm={6} md={6} lg={6} className="text-center">
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
                <Col xs={12} sm={6} md={6} lg={6} className="text-center align-items-end">
                    <Button onClick={handleSave} variant="danger" className="custom-button" disabled={!selectedBloodGroup || !text || !selectedFile}>
                        Save
                    </Button>
                </Col>
            </Row>

        </Container>

    )
}

export default BioEditScreen