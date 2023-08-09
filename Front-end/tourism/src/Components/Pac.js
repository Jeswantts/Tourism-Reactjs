import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { usePackageContext } from '../Context/PackageContext';
import { useCustomerId } from '../Context/CustomerIdContext';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';
import Ratestar from './Ratestar';

const Pac = () => {
  const [packages, setPackages] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const locationId = searchParams.get('location');
  const locationName = searchParams.get('locationName');
  const { setSelectedPackage } = usePackageContext();
  const { customerId } = useCustomerId();
  const [packageDetails, setPackageDetails] = useState([]);


  const [averageRating, setAverageRating] = useState(0);


  useEffect(() => {
    if (locationId) {
      fetch(`https://localhost:7114/api/Package/GetPackage/ByLocationId/${locationId}`)
        .then((response) => response.json())
        .then((data) => {
          setPackages(data);
        })
        .catch((error) => {
          console.error('Error fetching packages:', error);
        });
    }
  }, [locationId]);

  useEffect(() => {
    // Fetch additional details for each package
    if (packages.length > 0) {
      const averageRatingPromises = packages.map(pkg =>
        fetch(`https://localhost:7266/api/Feedback/average/${pkg.package_id}`)
          .then(response => response.json())
          .catch(error => {
            console.error(`Error fetching average rating for package ${pkg.package_id}:`, error);
            return null;
          })
      );
  
      Promise.all(averageRatingPromises).then(averageRatings => {
        setPackageDetails(averageRatings);
      });
    }
  }, [packages]);
  

  const handlePackageSelect = (selectedPackage) => {
    setSelectedPackage(selectedPackage);
  };

  return (
    <div>
      <h2>Packages</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        {packages.length > 0 ? (
          packages.map((pkg,index) => (
            <Card key={pkg.package_id} className="card">
              <CardMedia
                component="img"
                height="200"
                image={`/Admin/${pkg.image}`}
                alt={pkg.package_name}
                style={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Package Name: {pkg.package_name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Duration:</strong> {pkg.package_duration}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Spots Nearby:</strong> {pkg.spots_nearby}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Speciality:</strong> {pkg.speciality}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Budget:</strong> {pkg.budget}
                </Typography>
                <Ratestar rating={packageDetails[index] || 0}  />
                <Link
                  to={`/Loc/Pac/${locationId}/Itinerary/${pkg.package_id}?locationName=${encodeURIComponent(
                    locationName
                  )}`}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handlePackageSelect(pkg)}
                  >
                    Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1">No packages available for the selected location.</Typography>
        )}
      </div>
    </div>
  );
};

export default Pac;
