import React, { useEffect, useState } from 'react';
import { useParams,useLocation } from 'react-router-dom';

const Hot = () => {
    const { location, packageId } = useParams();
    const locationName = new URLSearchParams(useLocation().search).get('locationName');
    const [hotelData,setHotelData] = useState([]);

    useEffect(() => {
        fetch(`https://localhost:7134/api/Hotel/Hotels/filterbyloc/${locationName}`)
          .then((response) => response.json())
          .then((data) => {
            setHotelData(data);
          })
          .catch((error) => {
            console.error('Error fetching itinerary:', error);
          });
      }, [locationName]);

    return (
        <div>
            <h3>Hotel Nearby</h3>
      {hotelData.length > 0 ? (
        <div>
          <h2>Hotel Details</h2>
          <div className="card">
            {hotelData.map((hotel) => (
              <div key={hotel.hotel_id} className="card">
                <img src={hotel.hotel_image} alt={hotel.hotel_name} />
                <div className="card-content">
                  <h3>{hotel.hotel_name}</h3>
                  <p>Location: {hotel.hotel_location}</p>
                  <p>Email: {hotel.hotel_email}</p>
                  <p>Phone: {hotel.hotel_phone}</p>
                  <p>Detailed Location: {hotel.detailed_location}</p>
                  {/* Add more hotel details as needed */}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading hotel details...</p>
      )}
    </div>
    );
};

export default Hot;