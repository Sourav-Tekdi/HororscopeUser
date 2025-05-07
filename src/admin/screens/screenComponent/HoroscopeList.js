import { Link } from "react-router-dom";
import horoscopesListData from "../../json/horoscope"

const HoroscopeCard = ({ name, date, image }) => (
  <div className="col-lg-2 col-sm-4 col-xs-6">
    <div className="as_sign_box text-center">
      <Link to={`/horoscope/${name.toLowerCase()}`}>
        <span className="as_sign">
          <img alt={`Horoscope for ${name}`} src={image} />
        </span>
        <div>
          <h5>{name}</h5>
          {/* <p>{date}</p> */}
        </div>
      </Link>
    </div>
  </div>
)

const HoroscopeList = () => (
  <div className="row">
    {horoscopesListData.map((horoscope) => (
      <HoroscopeCard
        key={horoscope.name} // Assuming `name` is unique
        name={horoscope.name}
        date={horoscope.date}
        image={horoscope.image}
      />
    ))}
  </div>
);

export default HoroscopeList;
