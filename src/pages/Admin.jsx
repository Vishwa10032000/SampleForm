import React, { useEffect, useState } from "react";
import "../App.css";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { IoEyeSharp, IoClose, IoAddCircle } from "react-icons/io5";
import Modal from 'react-bootstrap/Modal';
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { firebase } from "../firebase";
import randomatic from 'randomatic';
import { HiShare } from "react-icons/hi";
import Swal from 'sweetalert2'

const AdminPlan = () => {
    const [registerDetails, setRegisterDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [showIndividualData, setShowIndividualData] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const getRegisteredData = async () => {
        const data = query(collection(firebase, 'registrationForm'));
        const querySnapshot = await getDocs(data);
        let registerData = [];
        querySnapshot.forEach((doc) => {
            registerData.push({ ...doc.data(), id: doc.id });
        });
        console.log(registerData);
        setRegisterDetails(registerData);
    }

    useEffect(() => {
        getRegisteredData();
    }, []);




    const filteredData = registerDetails.filter((item) =>
        Object.values(item)
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handleView = (data) => {
        setSelectedData(data);
        setShowIndividualData(true);
    };

    const closeModal = () => {
        setShowIndividualData(false);
        setSelectedData(null);
    };

    const handleItemsPerPageChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            const generatedUUID = randomatic('a', 6);
            // Create a reference to the document
            const docRef = doc(firebase, 'registrationForm', id);
            // Update the document
            await updateDoc(docRef, {
                status: status,
                referralId: generatedUUID
            });
            closeModal();
            getRegisteredData();
            Swal.fire({
                title: 'Success',
                text: 'Application Successfully Approved',
                icon: 'success',
                confirmButtonText: 'Ok',
                width: "400px"
            })
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    }

    const handleShareLink = (phoneNumber, referralCode) => {
       
        const message = `Your confirmation code is: ${referralCode}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappLink = `https://wa.me/+91${phoneNumber}?text=${encodedMessage}`;
      
        console.log(whatsappLink);
        return whatsappLink;
    }

    return (
        <div className="m-md-5">
            <div className="tableLayout">
                <div className="d-flex justify-content-between">
                    <h5 className="tableTitle">
                        Jallikattu Registration List
                    </h5>
                    <div className="d-flex justify-content-end align-items-center">
                        <input type="search" className="searchInput" placeholder="&#x1F50D; Search ..." onChange={handleSearchChange} value={searchQuery} />
                    </div>
                </div>
                <div className="tableResponsive mb-3">
                    <table className="customTable">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Action</th>
                                <th>Owner Name</th>
                                <th>Primary WhatsApp</th>
                                <th>Aadhar Number</th>
                                <th>Address</th>
                                <th>Bull Breed</th>
                                <th>Bull Age</th>
                                <th>Bull Color</th>
                                <th>Bull Identification Marks</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <button className="actionButton" onClick={() => handleView(item)}>
                                            <IoEyeSharp size={20} />
                                        </button>
                                    </td>
                                    <td>{item.ownerName}</td>
                                    <td>{item.primaryWhatsApp}</td>
                                    <td>{item.aadharNumber}</td>
                                    <td>{item.address}</td>
                                    <td>{item.bullBreed}</td>
                                    <td>{item.bullAge}</td>
                                    <td>{item.bullColor}</td>
                                    <td>{item.identificationMarks}</td>
                                    <td>{item.status}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="d-flex flex-wrap justify-content-sm-between justify-content-center align-items-center">
                    <div className="d-flex flex-row mb-2">
                        <label> Show Rows:
                            <select onChange={handleItemsPerPageChange} value={itemsPerPage} className="itemsPerPage">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </label>
                    </div>
                    <div className="d-flex">
                        <button className="paginationButton" onClick={handlePrevious} disabled={currentPage === 1}>
                            <CiCircleChevLeft size={30} className="tableIcons" />
                        </button>
                        <span className="m-2 align-self-center">
                            {currentPage} / {totalPages}
                        </span>
                        <button className="paginationButton" onClick={handleNext} disabled={currentPage === totalPages}>
                            <CiCircleChevRight size={30} className="tableIcons" />
                        </button>
                    </div>
                </div>
            </div>
            <Modal show={showIndividualData} onHide={closeModal} centered size="lg">
                <Modal.Header >

                    <div className="modal-hearder">
                        <span className="float-start">Registration Details</span>
                        <div className="float-end modalClose">
                            <button onClick={closeModal} className="modalClose-btn"><IoClose size={25} /></button>
                        </div>
                    </div>

                </Modal.Header>
                <div className="p-4 modal-body">
                    {selectedData && (
                        <>
                            <p><strong>Owner Name:</strong> {selectedData.ownerName}</p>
                            <p><strong>Primary WhatsApp:</strong> {selectedData.primaryWhatsApp}</p>
                            <p><strong>Email Address:</strong> {selectedData.emailAddress}</p>
                            <p><strong>Address:</strong> {selectedData.address}</p>
                            <p><strong>Bull Breed:</strong> {selectedData.bullBreed}</p>
                            <p><strong>Bull Age:</strong> {selectedData.bullAge}</p>
                            <p><strong>Bull Color:</strong> {selectedData.bullColor}</p>
                            <p><strong>Location:</strong> {selectedData.location}</p>
                            <p><strong>Pledge:</strong> {selectedData.pledge ? 'Yes' : 'No'}</p>
                            <p><strong>Medical Certificate:</strong> <a href={`/attachments/${selectedData.medicalCertificate}`} target="_blank" rel="noopener noreferrer">{selectedData.medicalCertificate}</a></p>
                            <p><strong>Bull Image:</strong> <a href={`/attachments/${selectedData.bullImage}`} target="_blank" rel="noopener noreferrer">{selectedData.bullImage}</a></p>
                            <p><strong>Appllication Status:</strong> {selectedData.status}</p>
                        </>
                    )}
                    <div>
                        {
                            selectedData?.status === 'Pending' &&
                            <div className="d-flex justify-content-end gap-2">
                                <button className="approveButton" onClick={() => handleUpdateStatus(selectedData.id, 'Confirmed')}>Approved</button>
                                <button className="rejecteButton" onClick={() => handleUpdateStatus(selectedData.id, "Rejected")}>Reject</button>
                            </div>
                        }
                        {
                            selectedData?.status === 'Confirmed' &&
                            <div className="d-flex justify-content-end gap-2">
                                <button className="shareButton" onClick={() => window.open(handleShareLink(8220226332,selectedData.referralId), '_blank')} > <HiShare size={20} /> Share</button>
                            </div>
                        }
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default AdminPlan;
