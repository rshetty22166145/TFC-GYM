import { Carousel } from 'react-bootstrap';
import './NavBar.css'

function CarouselPlans() {
  return (
    <div>
    <Carousel fade>
        <Carousel.Item>
            <img
            className="d-block"
            style={{height:500 ,width:800,marginLeft:"auto",marginRight:"auto"}}
            src="https://www.aipersonaltrainer.com/wp-content/uploads/tabata-training-news-aipt.jpg"
            alt="First slide"
            />
            <Carousel.Caption>
            <h3>Tabata</h3>
            <p>A fun HIIT workout featuring exercises that last four minutes.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block"
            style={{height:500 ,width:800,marginLeft:"auto",marginRight:"auto"}}
            src="https://mejorconsalud.as.com/wp-content/uploads/2022/06/gimnasio-peso-muerto-768x513.jpg?auto=webp&quality=45&width=1920&crop=16:9,smart,safe"
            alt="Second slide"
            />
            <Carousel.Caption>
            <h3> Crossfit</h3>
            <p>Strength and conditioning workout of functional movement at high intensities.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block"
            style={{height:500 ,width:800,marginLeft:"auto",marginRight:"auto"}}
            src="https://ichef.bbci.co.uk/news/976/cpsprodpb/106A7/production/_107093276_gettyyoga.jpg.webp"
            alt="Third slide"
            />

            <Carousel.Caption>
            <h3>Yoga</h3>
            <p> A healthy activity of postures connected by flowing sequences.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block"
            style={{height:500 ,width:800,marginLeft:"auto",marginRight:"auto"}}
            src="https://www.verywellfit.com/thmb/C6rjRnUDoG-sXnDfrkVBwLo2vTY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/zumba-fatcamera-c9d4ee824a0f4fda883484f878abc8ae.jpg"
            alt="Fourth slide"
            />

            <Carousel.Caption>
            <h3>Zumba</h3>
            <p>Each workout involves highly choreographed movements set to upbeat salsa.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block"
            style={{height:500 ,width:800,marginLeft:"auto",marginRight:"auto"}}
            src="https://i.insider.com/563e3734dd0895f46b8b4627?width=1000&format=jpeg&auto=webp"
            alt="Fifth slide"
            />

            <Carousel.Caption>
            <h3>Spin</h3>
            <p>Ride together in this 55-minute high-intensity Cycle class.</p>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
</div>
  );
}

export default CarouselPlans;