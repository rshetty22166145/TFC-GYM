import { Carousel } from 'react-bootstrap';
//src="../images/dumbell.jpeg"

function CarouselFadeExample() {
  return (
    <div>
        <Carousel fade>
            <Carousel.Item>
                <img
                className="d-block"
                style={{height:500 ,width:800,marginLeft:"auto",marginRight:"auto"}}
                src="https://t4.ftcdn.net/jpg/03/17/72/47/360_F_317724775_qHtWjnT8YbRdFNIuq5PWsSYypRhOmalS.jpg"
                alt="First slide"
                />
                <Carousel.Caption>
                <h3>Come and Train with us</h3>
                <p>Become Fit and Enhance your body and soul.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block"
                style={{height:500 ,width:800,marginLeft:"auto",marginRight:"auto"}}
                src="https://www.precor.com/sites/default/files/community/_S1_2736_0.jpg"
                alt="Second slide"
                />

                <Carousel.Caption>
                <h3> Best in class Staff</h3>
                <p>Our Professionally Trained staff and fitness experts are always ready to help.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block"
                style={{height:500 ,width:800,marginLeft:"auto",marginRight:"auto"}}
                src="https://www.precor.com/sites/default/files/community/precor_in%20club_experience%20series%20cardio%20830_0168.jpg"
                alt="Third slide"
                />

                <Carousel.Caption>
                <h3>World Class Faciliities</h3>
                <p>
                    We have squat racks, treadmills, weight sets and much more.
                </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </div>
  );
}

export default CarouselFadeExample;