import React, { useRef,useState } from 'react';
import { useLocation } from 'react-router-dom';
import InvoicePDF from './InvoicePDF';
import { useReactToPrint } from 'react-to-print';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function Payment() {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const pdfRef = useRef(null);

  const { invoiceData } = location?.state || {};
  const {bookingId} = location?.state||{};

  const greenTickSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#00CC00" // Change the fill color to green
      width="48"
      height="48"
    >
      <path d="M9 16.17l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41z" />
    </svg>
  );
  const [cardDetails, setCardDetails] = useState({
    card_number: '',
    cardholder_name: '',
    expiry_month: '',
    expiry_year:'',
    cvv: '',
  });

  const handleCardInputChange = (event) => {
    const { name, value } = event.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const showBookingSuccessModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePayment = (event) => {
    event.preventDefault();
    axios
      .post('https://localhost:7168/api/Booking/Payment/Carddetail', cardDetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
        setSuccess(true);
        toast.success('Booking Successful');
  
          const statusUpdateData = {
            status: 'successful',
          };
  
          axios
            .put(`https://localhost:7168/api/Booking/Booking/Status/${bookingId}`, statusUpdateData, {
              headers: {
                'Content-Type': 'application/json',
              },
            })
            .then((statusResponse) => {
              console.log('Booking status updated to successful:', statusResponse.data);
              showBookingSuccessModal();

            })
            .catch((statusError) => {
              console.error('Error updating booking status:', statusError);
            });
      })
      .catch((error) => {
        console.error('Error during booking:', error);
        setSuccess(false);
        if (error.response && error.response.data) {
          setError(error.response.data);
          toast.error('Error Occurred', error);
        } else {
          setError('An error occurred while submitting the form.');
          toast.error('An error occurred while submitting the form.', error);
        }
      });
  };
  
    

  return (
    <div>
      {/* ... other payment-related components */}
      <form>
        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            className="form-control"
            name="card_number"
            value={cardDetails.card_number}
            onChange={handleCardInputChange}
          />
        </div>
        <div className="form-group">
          <label>Card Holder Name</label>
          <input
            type="text"
            className="form-control"
            name="cardholder_name"
            value={cardDetails.cardholder_name}
            onChange={handleCardInputChange}
          />
        </div>
        <div className="form-row">
          <div className="form-group col">
            <label>Expiry Date</label>
            <input
              type="text"
              className="form-control"
              name="expiry_month"
              value={cardDetails.expiry_month}
              onChange={handleCardInputChange}
            />
            <input
              type="text"
              className="form-control"
              name="expiry_year"
              value={cardDetails.expiry_year}
              onChange={handleCardInputChange}
            />
          </div>
          <div className="form-group col">
            <label>CVV</label>
            <input
              type="text"
              className="form-control"
              name="cvv"
              value={cardDetails.cvv}
              onChange={handleCardInputChange}
            />
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={handlePayment}
        >
          Pay Now
        </button>
      </form>
      <div className={showModal ? "blur-background" : ""}>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
          <Modal.Title>Booking Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p>Your booking has been successfully completed!</p>
          <div>
              {greenTickSVG}
            </div>
            <div>
            {invoiceData ? (
        <InvoicePDF invoiceData={invoiceData} ref={pdfRef} />
      ) : (
        <div>No invoice data available</div>
      )}              
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
    </div>
  );
}
