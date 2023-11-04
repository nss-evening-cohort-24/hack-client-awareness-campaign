import React from 'react';
import PropTypes from 'prop-types';

function HeroBanner({
  title, description, ctaText, ctaLink, backgroundImage,
}) {
  return (
    <div className="hero-banner" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-description">{description}</p>
        <a href={ctaLink} className="cta-button">{ctaText}</a>
      </div>
    </div>
  );
}

HeroBanner.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ctaText: PropTypes.string.isRequired,
  ctaLink: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
};

export default HeroBanner;
