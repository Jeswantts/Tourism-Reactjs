import React, { useRef,useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InvoicePDF from './InvoicePDF';
import { useReactToPrint } from 'react-to-print';
import { Modal, Button,Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import Rating from 'react-rating-stars-component';



export default function Payment() {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const pdfRef = useRef(null);
  const navigate = useNavigate('');

  const { invoiceData } = location?.state || {};
  const {bookingId,packageId} = location?.state||{};

  const [userRating, setUserRating] = useState(1); // Initialize with a default value
  const [customerName, setCustomerName] = useState('');
  const [keyword, setKeyword] = useState('');
  const [description, setDescription] = useState('');
  const [showRatingModal, setShowRatingModal] = useState(false);


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
    setShowRatingModal(true);

  };

  const handleRatingModalClose = () => {
    setShowRatingModal(false);
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

  const submitRating = () => {
    // Create the rating object with all the values
    const ratingData = {
      package_id: packageId,
      customer_name: customerName,
      keyword,
      description,
      rating: userRating,
    };

    // Send the rating data to the server
    axios
      .post('https://localhost:7266/api/Feedback/Rating', ratingData)
      .then(response => {
        console.log('Rating submitted:', response.data);
        setShowRatingModal(false);
        toast.success('Thankyou for the feedback')
        navigate('/Loc')
      })
      .catch(error => {
        // Handle error
        console.error('Error submitting rating:', error);
        // You can display an error message here if needed
      });
  };
  
    

  return (
    <div>
      {/* ... other payment-related components */}
      <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="card_number" className="form-label">Card Number</label>
                            <input type="text" className="form-control" id="card_number" name="card_number" value="" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cardholder_name" className="form-label">Card Holder Name</label>
                            <input type="text" className="form-control" id="cardholder_name" name="cardholder_name" value="" />
                        </div>
                        <div className="mb-3 row">
                            <div className="col">
                                <label htmlFor="expiry_month" className="form-label">Expiry Month</label>
                                <input type="text" className="form-control" id="expiry_month" name="expiry_month" value="" />
                            </div>
                            <div className="col">
                                <label htmlFor="expiry_year" className="form-label">Expiry Year</label>
                                <input type="text" className="form-control" id="expiry_year" name="expiry_year" value="" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cvv" className="form-label">CVV</label>
                            <input type="text" className="form-control" id="cvv" name="cvv" value="" />
                        </div>
                        <button type="button" className="btn btn-primary">Pay Now</button>
                    </form>
                </div>
            </div>
        </div>
      <Modal show={showRatingModal} onHide={handleRatingModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rate Your Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Your Rating</Form.Label>
              <Rating
                count={5}
                size={30}
                value={userRating}
                activeColor="#ffd700"
                onChange={newRating => setUserRating(newRating)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Keyword</Form.Label>
              <Form.Control
                type="text"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" onClick={submitRating}>
              Submit Rating
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRatingModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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
