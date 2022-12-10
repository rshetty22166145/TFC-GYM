import NavBar from "../components/NavBar"
import CarouselFadeExample from "../components/homeapgecar"
import "../css/index.css";

function Home() {
    return (
    <div>
        <NavBar></NavBar>
        <br></br>
        <br></br>
        <h1 class="welcome">Welcome to Toronto Fitness Club</h1>
        <CarouselFadeExample></CarouselFadeExample>
        <p class="welcome_sub"> We are a group of Gyms located all over Toronto, and were esatblished in 1969. Being physically and mentally fit is necessary to live a happy, long life. Exercise is one of the best ways to keep a person healthy. Hence, it is always best to find a workout routine no matter how busy you are. With the numerous diseases that spread today, many individuals realized the essence of workout. Specifically, having a workout routine will give an individual the greatest physical, mental, and social benefits. Accordingly, exercise will help you increase energy levels, reduce chronic disease risk, lose weight, and help improve brain health and memory. With such benefits, you probably will love to do workout routines soon. Luckily, you don’t need to do it yourself as various personal trainers, or professional fitness coaches provide the help you need. And joining fitness classes is just at your fingertips. Today, we will provide you with ample gym websites designed to help fitness enthusiasts and personal trainers craft unique gym websites with innovation.</p>
    </div>
    )
}
export default Home