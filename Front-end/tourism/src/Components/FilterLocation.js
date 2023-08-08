import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const FilterLocation = () => {
    const location = useLocation();
    const { filteredData } = location.state || {};
  //   const { state } = location;
  // const filteredData = state && state.filteredData ? state.filteredData : [];


  return (
    <div>
      <h2>Filtered Results</h2>
      <ul>
      {filteredData.map((item) => (
              <div key={item.package_id} className="col-md-12 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Package Name: {item.package_name}</h5>
                  <p className="card-text"><strong>Duration:</strong> {item.package_duration}</p>
                  <p className="card-text"><strong>Spots Nearby:</strong> {item.spots_nearby}</p>
                  <p className="card-text"><strong>Speciality:</strong> {item.speciality}</p>
                  <p className="card-text"><strong>Budget:</strong> {item.budget}</p>
                  <p className="card-text"><strong>Image:</strong> {item.image}</p>
                  <img src={`path/to/image/${item.image}`} alt={item.package_name} />
                </div>
              </div>
            </div>
            ))}
      </ul>
    </div>
  );
};

export default FilterLocation;
