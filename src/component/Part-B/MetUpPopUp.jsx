import React  from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function MetUpPopUp({showModal,setShowModal,meetUp,isDataFecthed}) {
    const handleClose = () => setShowModal(false);
 
    return (
        <>
            <Modal show={showModal} onHide={handleClose} dialogClassName="modal-90w">
                <Modal.Header closeButton>
                    <Modal.Title>{meetUp?.length} meet in real life/vidoe call</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="user-content">
                    {isDataFecthed && <p> Loading...</p>}
                        {meetUp?.map((meet, index) => (
                            <div key={index} className="user-item d-flex  justify-content-start align-items-center">
                                <img
                                    className='profile_img'
                                    src={meet?.dpURL}
                                    alt={`User${index + 1}`}
                                />
                                <div className="user-info ml-3  pl-4">
                                    <p className="mb-0">{meet?.firstname} {meet?.lastname}</p>
                                    <p className="text-muted mb-0">Founder</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default MetUpPopUp