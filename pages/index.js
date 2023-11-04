import HeroBanner from '../components/HeroBanner';

function Home() {
  return (
    <div className="hero-div">
      <HeroBanner
        title="Welcome"
        description="Join us in the journey toward better mental health for all. At Awareness.org, we believe that mental well-being is a fundamental right, and we're dedicated to breaking down the barriers and stigmas that surround it.

Our mission is to provide support, spread awareness, and create a community where individuals feel safe to share their stories, struggles, and triumphs. Together, we can make a difference by promoting understanding, empathy, and access to mental health resources.

Explore our campaigns, resources, and stories from those who have faced the challenges of mental health head-on. Let's shatter the silence, stand together, and build a world where mental health is valued, understood, and supported.

Join us on this journey. Your voice matters."
      />
    </div>
  );
}

export default Home;
