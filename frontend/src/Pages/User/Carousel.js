import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@material-ui/core';

function ImageCarousel(props) {
    const { images } = props;

    const paperStyle = {
        marginTop: '40px',
        background : 'none'
    };

    return (
        <Carousel animation="slide">
            {images.map((image, i) => (
               <Paper key={i} style={paperStyle}>
                    <img style={{ width: '1200px', height: '600px'}} src={image} alt={`Image ${i}`} />
                </Paper>
            ))}
        </Carousel>
    );
}

function AppCarousel() {
    const images = [
        'https://res.cloudinary.com/dolq5ge5g/image/upload/v1682835313/Thinnai1_ky38de.jpg',
        'https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760041/Pottery2_qb6q2n.jpg',
        'https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760040/Museum1_aiokpw.jpg',
        'https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760041/oil_making_center2_gvgm6b.jpg',
        'https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760040/Beach2_uvkmwo.jpg',
        'https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760040/Crafttary1_yjxv1q.jpg',
        'https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760040/Thinnai2_m4zpj0.jpg',
        'https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760040/Pottery1_dseqya.jpg',
        'https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760040/Museum2_dczixq.jpg',
        'https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760041/oil_making_center1_e0oqxq.png',
        'https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760039/Beach1_ujhudh.jpg',
        'https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760040/Crafttary2_vtpjsn.jpg',
    ];

    return (
        <div>
            <ImageCarousel images={images} />
        </div>
    );
}

export default AppCarousel;
