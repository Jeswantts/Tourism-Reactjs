import React, { useState,useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Button, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon,Grid,CardMedia,Card,CardContent } from '@mui/material';
import {  TableContainer, Table, TableBody, TableRow, TableCell, TextField,Paper } from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation, Link } from 'react-router-dom';
import './Trans.css';

const Trans = () => {
    const location = useLocation();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [navHidden, setNavHidden] = useState(false);
  
    const images = [
      'url("https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
      'url("https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")', 
      'url("https://images.pexels.com/photos/951076/pexels-photo-951076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")', 
      'url("https://images.pexels.com/photos/258045/pexels-photo-258045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")', 
    ];
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 5000); // Change image every 5 seconds
  
      return () => clearInterval(interval);
    }, [images]);
  
    const handleDrawerToggle = () => {
      setDrawerOpen(!drawerOpen);
      setNavHidden(!navHidden);
    };

    const [image, setImages] = useState([]);


    useEffect(() => {
        // Fetch images from your API
        fetch('https://localhost:7017/api/Admin/All')
          .then((response) => response.json())
          .then((data) => {
            setImages(data); // Set the fetched images in the state
          })
          .catch((error) => {
            console.error('Error fetching images:', error);
          });
      }, []);

  return (
    <div>
    <div style={{ backgroundImage: images[currentImageIndex], backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      <AppBar style={{ backgroundColor: 'transparent', boxShadow: 'none', transition: 'transform 0.3s' }} position="static" className={navHidden ? 'hidden' : ''}>
        <Toolbar>
          {/* Custom Navigation Brand */}
          <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img src="https://w7.pngwing.com/pngs/318/944/png-transparent-logo-travel-agent-train-airline-ticket-travel-text-logo-transport-thumbnail.png" alt="Brand" style={{ height: 40, width: 50 }} />
          </div>
          
          {/* Hamburger Icon (visible on small screens) */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            {drawerOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          
          {/* Navigation Links (visible on larger screens) */}
          <div className="nav-links" style={{ display: { xs: 'none', sm: 'flex' } }}>
  <Button color="inherit" component={Link} to="/Loc" style={{ textDecoration: 'none', color: location.pathname === '/location' ? 'blue' : 'inherit', marginRight: 15 }}>
    <LocationOnIcon /> Location
  </Button>
  <Button color="inherit" component={Link} to="/profile" style={{ textDecoration: 'none', color: location.pathname === '/profile' ? 'blue' : 'inherit', marginRight: 15 }}>
    <PersonIcon /> Profile
  </Button>
  <Button color="inherit" component={Link} to="/login" style={{ textDecoration: 'none', color: location.pathname === '/login' ? 'blue' : 'inherit' }}>
    Login
  </Button>
</div>
        </Toolbar>
      </AppBar>

      {/* Collapsible Drawer (visible on small screens) */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          <ListItem button component={Link} to="/location">
            <ListItemIcon><LocationOnIcon /></ListItemIcon>
            <ListItemText primary="Location" />
          </ListItem>
          <ListItem button component={Link} to="/profile">
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button component={Link} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
        </List>
      </Drawer>

      <Container>
        {/* Your content goes here */}
        <Typography variant="h2" gutterBottom>
          Welcome to Our Website
        </Typography>
        <Typography variant="body1">
The best Travel Website U can get the Fullest Experienced
        </Typography>
      </Container>
    </div>
    <br></br><br></br>
    <Container>
      <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
  <Card className="h-100">
    <div style={{ position: 'relative' }}>
      <CardMedia
        component="img"
        height="220"
        src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWFsZGl2ZXN8ZW58MHx8MHx8&w=1000&q=80"
        alt="Stony Beach"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      />
      <div className="card-img-overlay overlay-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)',color:'white' }}>
        <Typography variant="h6" style={{ fontWeight: 600 }}>
          Sign up for exclusive coupons
        </Typography>
        <Typography variant="body1" style={{ fontWeight: 400, textAlign: 'center' }}>
          Exclusive access to coupons, special offers, and promotions.
        </Typography>
        <center>
          <Button className="bg-transparent" style={{ color: '#FFFFFF', border: '2px solid #FFFFFF', borderRadius: 3 }}>
            Sign Up
          </Button>
        </center>
      </div>
    </div>
  </Card>
</Grid>

<Grid item xs={12} md={4}>
  <Card className="h-100">
    <div style={{ position: 'relative' }}>
      <CardMedia
        component="img"
        height="220"
        src="https://poloandtweed.com/wp-content/uploads/2020/04/ciudad-maderas-MXbM1NrRqtI-unsplash.jpg"
        alt="Stony Beach"
      />
      <div className="card-img-overlay overlay-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)',color:'white' }}>
        <Typography variant="h6" style={{ fontWeight: 600 }}>
          Sign up for exclusive coupons
        </Typography>
        <Typography variant="body1" style={{ fontWeight: 400, textAlign: 'center' }}>
          Exclusive access to coupons, special offers, and promotions.
        </Typography>
        <center>
          <Button className="bg-transparent" style={{ color: '#FFFFFF', border: '2px solid #FFFFFF', borderRadius: 3 }}>
          Download App
          </Button>
        </center>
      </div>
    </div>
  </Card>
</Grid>

        <Grid item xs={12} md={4}>
  <Card className="h-100">
    <div style={{ position: 'relative' }}>
      <CardMedia
        component="img"
        height="220"
        src="https://www.sekab.com/app/uploads/2021/07/john-mcarthur-u0rekqol6ss-unsplash.jpg"
        alt="Stony Beach"
      />
      <div className="card-img-overlay overlay-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)',color:'white' }}>
        <Typography variant="h6" style={{ fontWeight: 600 }}>
          Sign up for exclusive coupons
        </Typography>
        <Typography variant="body1" style={{ fontWeight: 400, textAlign: 'center' }}>
          Exclusive access to coupons, special offers, and promotions.
        </Typography>
        <center>
          <Button className="bg-transparent" style={{ color: '#FFFFFF', border: '2px solid #FFFFFF', borderRadius: 3 }}>
            Learn More
          </Button>
        </center>
      </div>
    </div>
  </Card>
</Grid>

      </Grid>
    </Container>

    <br></br><br></br>

    <Container>
      <Typography variant="h3" gutterBottom>
        Best Packages For You
      </Typography>
      <Typography variant="body1" gutterBottom>
        Get back out there for less with the best tour packages we've found
      </Typography>
      <Grid container spacing={2}>
        {/* Card 1 */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className="h-100">
            <CardMedia
              component="img"
              height="220"
              image="https://images.pexels.com/photos/1606623/pexels-photo-1606623.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt="Orlando"
            />
            <CardContent>
              <Typography variant="h5">
                <strong>Orlando</strong>
              </Typography>
              <div className="card-text">
                <Typography variant="caption">
                  <small>Cheap Flights to Orlando</small>
                </Typography>
                <Typography variant="body2" className="fw-lighter">
                  <strong>$359</strong>&nbsp;per person
                </Typography>
                <div className="text-end">
                  <Button href="#" style={{ textDecoration: 'none', color: '#EC772F' }}>
                    Find Flight
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="h-100">
            <CardMedia
              component="img"
              height="220"
              image="https://images.pexels.com/photos/1902806/pexels-photo-1902806.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt="Orlando"
            />
            <CardContent>
              <Typography variant="h5">
                <strong>Orlando</strong>
              </Typography>
              <div className="card-text">
                <Typography variant="caption">
                  <small>Cheap Flights to Orlando</small>
                </Typography>
                <Typography variant="body2" className="fw-lighter">
                  <strong>$359</strong>&nbsp;per person
                </Typography>
                <div className="text-end">
                  <Button href="#" style={{ textDecoration: 'none', color: '#EC772F' }}>
                    Find Flight
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="h-100">
            <CardMedia
              component="img"
              height="220"
              image="https://images.pexels.com/photos/1724418/pexels-photo-1724418.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt="Orlando"
            />
            <CardContent>
              <Typography variant="h5">
                <strong>Orlando</strong>
              </Typography>
              <div className="card-text">
                <Typography variant="caption">
                  <small>Cheap Flights to Orlando</small>
                </Typography>
                <Typography variant="body2" className="fw-lighter">
                  <strong>$359</strong>&nbsp;per person
                </Typography>
                <div className="text-end">
                  <Button href="#" style={{ textDecoration: 'none', color: '#EC772F' }}>
                    Find Flight
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="h-100">
            <CardMedia
              component="img"
              height="220"
              image="https://images.pexels.com/photos/1178448/pexels-photo-1178448.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt="Orlando"
            />
            <CardContent>
              <Typography variant="h5">
                <strong>Orlando</strong>
              </Typography>
              <div className="card-text">
                <Typography variant="caption">
                  <small>Cheap Flights to Orlando</small>
                </Typography>
                <Typography variant="body2" className="fw-lighter">
                  <strong>$359</strong>&nbsp;per person
                </Typography>
                <div className="text-end">
                  <Button href="#" style={{ textDecoration: 'none', color: '#EC772F' }}>
                    Find Flight
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        {/* Similar Cards for other destinations */}
      </Grid>
    </Container>
    <br></br><br></br>
    <Container>
    <Typography variant="h3" gutterBottom>
        Image Gallery
      </Typography>
    <Grid container spacing={2} style={{ marginTop: '2rem' }}>
          {image.map((image) => (
            <Grid item xs={6} sm={4} md={3} key={image.id}>
              <Card>
                <CardMedia
                  component="img"
                  alt={image.imageName}
                  height="140"
                  image={`/Admin/${image.image}`} // Set the image URL here
                />
              </Card>
            </Grid>
          ))}
        </Grid>

    </Container>
    <br></br><br></br>
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card className="w-100">
            <CardContent className="p-5">
              <Typography variant="h4" className="card-title">
                Download App Now!
              </Typography>
              <Typography variant="body1" className="fw-lighter">
                Download our app, join 100 Million+ happy travellers!
              </Typography>
              <Grid container spacing={2}>
                <br></br><br></br>
                <Grid item xs={8}>
                  <TableContainer component={Card}>
                    <Table aria-label="download-table" className="table table-borderless">
                      <TableBody>
                        <TableRow>
                          <TableCell rowspan={2}>
                            <img
                              src="https://png.pngtree.com/png-vector/20201207/ourlarge/pngtree-human-hand-holding-smartphone-vector-png-image_2489428.jpg"
                              width="90px"
                              height="120px"
                              alt="Phone"
                            />
                          </TableCell>
                          <TableCell className="fw-lighter">
                            Use code WELCOM and get upto $50 off on your first flight booking
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pe-5">
                            <form className="form-inline">
                              <div className="form-group">
                                <div className="input-group mb-3">
                                  <span className="input-group-text">+91</span>
                                  <TextField
                                    type="text"
                                    placeholder="Enter Mobile No"
                                    variant="outlined"
                                    className="form-control"
                                  />
                                  <Button
                                    type="submit"
                                    variant="outlined"
                                    color="error"
                                    className="btn btn-close-white btn-outline-danger"
                                  >
                                    Get Download Link
                                  </Button>
                                </div>
                              </div>
                            </form>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={4}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Qr-1.svg/220px-Qr-1.svg.png"
                    className="img-fluid mb-5"
                    height="150px"
                    width="150px"
                    alt="QR Code"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
    <Paper
      style={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '20px 0',
        marginTop: '30px',
        textAlign: 'center',
      }}
      elevation={0}
    >
      <Container>
        <Typography variant="body1">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
      </Container>
    </Paper>
    </div>
    
  );
};

export default Trans;
