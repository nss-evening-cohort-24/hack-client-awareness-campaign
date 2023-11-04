import HeroBanner from '../components/HeroBanner';

function Home() {
  return (
    <div className="hero-div">
      <HeroBanner
        title="WELCOME..."
        description="Join us in the journey towards a more aware world.

      Our mission is to provide support, spread awareness, and create a community where individuals feel safe to share their stories, struggles, and triumphs. Together, we can make a difference by promoting understanding and empathy.

      Explore our campaigns, resources, and stories from those who have faced the challenges of mental health head-on. Let's shatter the silence and stand together.

      Join us on this journey. Your voice matters."
        ctaText="Create a campaign"
        ctaLink="http://localhost:3000/posts/new"
      />
    </div>
  );
}

export default Home;
