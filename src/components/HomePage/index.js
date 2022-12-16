import About from './About';
import Footer from '../Footer';
import HeaderMain from '../Header/HeaderMain';
import HowItWorks from './HowItWorks';
import Reviews from './Reviews';

function HomePage() {
  return (
    <div>
      <HeaderMain />
      <About />
      <HowItWorks />
      <Reviews />
      <Footer />
    </div>
  );
}

export default HomePage;
