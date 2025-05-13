import React from 'react';
const bannerData = [
    {
        title: "Trust the Starsaa",
        heading: "Take control of your professional destiny",
        description: "Astrology has guided countless individuals in understanding their unique strengths and weaknesses. Let the stars illuminate your path toward success.",
        buttonLabel: null,
    },
    {
        title: "What’s Your Signaa?",
        heading: "Discover Your Daily Horoscope",
        description: "Explore how today's celestial movements will influence your sign. Let astrology guide your decisions and help you stay aligned with your true purpose.",
        buttonLabel: "Chat with astrologer",
        buttonLink: "/astrologer",
    },
    {
        title: "Personalized Guidanceaa",
        heading: "Book an Appointment with Our Astrologers",
        description: "Consult with our professional astrologers to gain insights into your life's direction and make decisions based on the wisdom of the stars.",
        buttonLabel: "Chat with astrologer",
        buttonLink: "/astrologer",
    }
];

const DashboardBanner = () => {
    return (
        <section className="as_banner_wrapper">
            <div className="container">
                <div className="row as_verticle_center">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="as_banner_slider">
                            {bannerData.map((banner, index) => (
                                <div key={index} className="as_banner_detail">
                                    <h5>{banner.title}</h5>
                                    <h1>
                                        {banner.heading.split(' ').map((word, i) => (
                                            <React.Fragment key={i}>
                                                {word}{i === 2 ? <br /> : ' '}
                                            </React.Fragment>
                                        ))}
                                    </h1>
                                    <p>{banner.description}</p>
                                    {banner.buttonLabel && (
                                        <a className="as_btn" href={banner.buttonLink}>
                                            {banner.buttonLabel}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="as_banner_img text-center">
                            <img alt="" className="img-responsive as_hand_bg" src="/assets/images/hand_bg.png" />
                            <img alt="" className="img-responsive as_hand" src="/assets/images/hand.png" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardBanner;
