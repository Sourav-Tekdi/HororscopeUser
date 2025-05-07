import { useEffect, useState } from "react"
import Helpers from "../../Helpers/Helpers"
import { useNavigate } from "react-router-dom"
import Breadcrum from "../../components/Breadcrum"
import { useProfile } from "../../context/ProfileContext"

const KundliReportComponent = ({ title }) => {
    const helpers = Helpers()
    // const { userInfo } = useProfile()
    // const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("Basic")
    const [kundliSearchDetails, setKundliSearchDetails] = useState({})

    const [kundliData, setKundliData] = useState(null) // Store fetched data
    const [kundliImageData, setKundliImageData] = useState(null) // Store fetched data
    const [numberology, setNumberology] = useState(null) // Store fetched data
    const [ascendantReport, setAscendantReport] = useState(null) // Store fetched data
    const [planets, setPlanets] = useState(null) // Store fetched data
    const [loading, setLoading] = useState(false) // Manage loading state

    // Fetch Kundli Report on Component Load
    const fetchKundliReport = async () => {
        setLoading(true) // Start loading
        try {
            const data = helpers.getStorage('kundliSearchDetails')
            // Fetch data (adjust endpoint if necessary)
            const response = await helpers.httpRequest(`/kundli/basic_details`, "POST", data)

            if (response && response.data) {
                setKundliData(response.data)
            }
        } catch (error) {
            console.error("Error fetching Kundli details:", error)
        } finally {
            setLoading(false) // Stop loading
        }
    }


    const fetchKundliImage = async () => {
        setLoading(true) // Start loading
        try {
            const data = helpers.getStorage('kundliSearchDetails')
            // Fetch data (adjust endpoint if necessary)
            const response = await helpers.httpRequest(`/kundli/horo_chart_image`, "POST", data)

            if (response && response.data) {
                setKundliImageData(response.data)
            }
        } catch (error) {
            console.error("Error fetching Kundli details:", error)
        } finally {
            setLoading(false) // Stop loading
        }
    }

    const fetchNumberology = async () => {
        setLoading(true) // Start loading
        try {
            const data = helpers.getStorage('kundliSearchDetails')
            // Fetch data (adjust endpoint if necessary)
            const response = await helpers.httpRequest(`/kundli/numerology_details`, "POST", data)

            if (response && response.data) {
                setNumberology(response.data)
            }
        } catch (error) {
            console.error("Error fetching Kundli details:", error)
        } finally {
            setLoading(false) // Stop loading
        }
    }

    const fetchAscendantReport = async () => {
        setLoading(true) // Start loading
        try {
            const data = helpers.getStorage('kundliSearchDetails')
            // Fetch data (adjust endpoint if necessary)
            const response = await helpers.httpRequest(`/kundli/general_ascendant_report`, "POST", data)

            if (response && response.data) {
                setAscendantReport(response.data)
            }
        } catch (error) {
            console.error("Error fetching Kundli details:", error)
        } finally {
            setLoading(false) // Stop loading
        }
    }

    const fetchPlanets = async () => {
        setLoading(true) // Start loading
        try {
            const data = helpers.getStorage('kundliSearchDetails')
            // Fetch data (adjust endpoint if necessary)
            const response = await helpers.httpRequest(`/kundli/planets`, "POST", data)

            if (response && response.data) {
                setPlanets(response.data)
            }
        } catch (error) {
            console.error("Error fetching Kundli details:", error)
        } finally {
            setLoading(false) // Stop loading
        }
    }



    useEffect(() => {
        const searchDetails = helpers.getStorage('kundliSearchDetails')
        setKundliSearchDetails(searchDetails)
        fetchKundliReport()
        fetchKundliImage()
        fetchNumberology()
        fetchAscendantReport()
        fetchPlanets()
    }, [])

    const handleTabClick = (tab) => {
        setActiveTab(tab)
    }

    const getValue = (value) => (value ? value : "N/A");


    return (
        <>
            <Breadcrum title={title} />
            <section className="as_shop_wrapper as_padderTop20">
                <div className="container">
                    <div className="row">
                        <div className="tabs">
                            <ul className="nav nav-pills">
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === "Basic" ? "active" : ""}`}
                                        onClick={() => handleTabClick("Basic")}
                                    >
                                        Basic
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === "Kundli" ? "active" : ""}`}
                                        onClick={() => handleTabClick("Kundli")}
                                    >
                                        Kundli
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === "Numberology" ? "active" : ""}`}
                                        onClick={() => handleTabClick("Numberology")}
                                    >
                                        Numberology
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === "ascendantReport" ? "active" : ""}`}
                                        onClick={() => handleTabClick("ascendantReport")}
                                    >
                                        Ascendant Report
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === "planets" ? "active" : ""}`}
                                        onClick={() => handleTabClick("planets")}
                                    >
                                        Planets
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <hr />
            {activeTab === "Basic" && (
                <section className="as_shop_wrapper as_padderBottom90">
                    <div className="container">
                        <h3 className="sub_heading_horoscope_matching">Kundli Report</h3>

                        {/* Show Loader */}
                        {loading ? (
                            <div>Loading...</div>
                        ) : kundliData ? (
                            <div id="pills-basic" role="tabpanel" className="tab-pane fade active show">
                                <div className="main_background_basic">
                                    <div className="row">
                                        {/* Basic Details */}
                                        <div className="col-6">
                                            <h2 className="heading_birth headBasic">Basic Details</h2>
                                            <div className="table-responsive table-br">
                                                <table className="table_custom table table-bordered">
                                                    <tbody>
                                                        <tr><td>Name</td><td>{kundliSearchDetails.name || "N/A"}</td></tr>
                                                        <tr><td>Day</td><td>{kundliSearchDetails.day || ""}</td></tr>
                                                        <tr><td>Month</td><td>{kundliSearchDetails.month || ""}</td></tr>
                                                        <tr><td>Year</td><td>{kundliSearchDetails.year || ""}</td></tr>
                                                        <tr><td>Time</td><td>{kundliSearchDetails.hour || ""}:{kundliSearchDetails.min || ""}</td></tr>
                                                        <tr><td>Place</td><td>{kundliSearchDetails.place || "N/A"}</td></tr>
                                                        <tr><td>Latitude</td><td>{kundliSearchDetails.lat || "N/A"}</td></tr>
                                                        <tr><td>Longitude</td><td>{kundliSearchDetails.lon || "N/A"}</td></tr>
                                                        {/* <tr><td>Timezone</td><td>{kundliData.timezone || "N/A"}</td></tr>
                                                    <tr><td>Sunrise</td><td>{kundliData.sunrise || "N/A"}</td></tr>
                                                    <tr><td>Sunset</td><td>{kundliData.sunset || "N/A"}</td></tr> */}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/* Avakhada Details */}
                                        <div className="col-6">
                                            <h2 className="heading_birth headBasic">Avakhada Details</h2>
                                            <div className="table-responsive table-br">
                                                <table className="table_custom table table-bordered">
                                                    <tbody>
                                                        <tr><td>Gan</td><td>{kundliData.avakhadaDetails.gan || "Dev"}</td></tr>
                                                        <tr><td>Karan</td><td>{kundliData.avakhadaDetails.karan || "Taitil"}</td></tr>
                                                        <tr><td>Nadi</td><td>{kundliData.avakhadaDetails.nadi || "Adi"}</td></tr>
                                                        <tr><td>Name Alphabet</td><td>{kundliData.avakhadaDetails.nameAlphabet || "Cho"}</td></tr>
                                                        <tr><td>Paya</td><td>{kundliData.avakhadaDetails.paya || "Gold"}</td></tr>
                                                        <tr><td>Sign</td><td>{kundliData.avakhadaDetails.sign || "Aries"}</td></tr>
                                                        <tr><td>Sign Lord</td><td>{kundliData.avakhadaDetails.signLord || "Mars"}</td></tr>
                                                        <tr><td>Tatva</td><td>{kundliData.avakhadaDetails.tatva || "Fire"}</td></tr>
                                                        <tr><td>Tithi</td><td>{kundliData.avakhadaDetails.tithi || "Shukla-Dashami"}</td></tr>
                                                        <tr><td>Varna</td><td>{kundliData.avakhadaDetails.varna || "Kshatriya"}</td></tr>
                                                        <tr><td>Vashya</td><td>{kundliData.avakhadaDetails.vashya || "Chatuspad"}</td></tr>
                                                        <tr><td>Yog</td><td>{kundliData.avakhadaDetails.yog || "Siddh"}</td></tr>
                                                        <tr><td>Yoni</td><td>{kundliData.avakhadaDetails.yoni || "Ashwa"}</td></tr>
                                                        <tr><td>Yunja</td><td>{kundliData.avakhadaDetails.yunja || "Poorva"}</td></tr>
                                                    </tbody>

                                                </table>
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <h2 className="heading_birth headBasic">Panchang Details</h2>
                                            <div className="table-responsive table-br">
                                                <table className="table_custom table table-bordered">
                                                    <tbody>
                                                        <tr><td>Karan</td><td>{kundliData.panchangDetails.karan || ""}</td></tr>
                                                        <tr><td>Naksahtra</td><td>{kundliData.panchangDetails.naksahtra || ""}</td></tr>
                                                        <tr><td>NaksahtraLord</td><td>{kundliData.panchangDetails.naksahtraLord || ""}</td></tr>
                                                        <tr><td>Tithi</td><td>{kundliData.panchangDetails.tithi || ""}</td></tr>
                                                        <tr><td>Yog</td><td>{kundliData.panchangDetails.yog || ""}</td></tr>

                                                    </tbody>

                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>No data available</div>
                        )}
                    </div>
                </section>
            )}

            {activeTab === "Kundli" && (
                <section className="as_shop_wrapper as_padderBottom90">
                    <div className="container">

                        {/* Show Loader */}
                        {loading ? (
                            <div>Loading...</div>
                        ) : kundliData ? (
                            <div id="pills-basic" role="tabpanel" className="tab-pane fade active show">
                                <div className="main_background_basic">
                                    <div className="row">
                                        {/* Basic Details */}
                                        <div className="col-6">
                                            <h2 className="heading_birth headBasic">Kundli Image</h2>
                                            <div dangerouslySetInnerHTML={{ __html: kundliImageData.svg }} />
                                        </div>


                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>No data available</div>
                        )}
                    </div>
                </section>
            )}

            {activeTab === "Numberology" && (
                <section className="as_shop_wrapper as_padderBottom90">
                    <div className="container">

                        {/* Show Loader */}
                        {loading ? (
                            <div>Loading...</div>
                        ) : kundliData ? (
                            <div id="pills-basic" role="tabpanel" className="tab-pane fade active show">
                                <div className="main_background_basic">
                                    <div className="row">
                                        {/* Basic Details */}
                                        <div className="col-12">
                                            <h2 className="heading_birth headBasic">Numberology</h2>
                                            <table border="1" className="table table-bordered" cellSpacing="0" cellPadding="5">
                                                <tbody>
                                                    <tr>
                                                        <th>Name</th>
                                                        <td>{getValue(numberology.name)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Date of Birth</th>
                                                        <td>{getValue(numberology.date)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Destiny Number</th>
                                                        <td>{getValue(numberology.destiny_number)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Radical Number</th>
                                                        <td>{getValue(numberology.radical_number)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Name Number</th>
                                                        <td>{getValue(numberology.name_number)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Evil Numbers</th>
                                                        <td>{getValue(numberology.evil_num)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Favorite Color</th>
                                                        <td>{getValue(numberology.fav_color)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Favorite Days</th>
                                                        <td>{getValue(numberology.fav_day)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Favorite God</th>
                                                        <td>{getValue(numberology.fav_god)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Favorite Mantra</th>
                                                        <td>{getValue(numberology.fav_mantra)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Favorite Metal</th>
                                                        <td>{getValue(numberology.fav_metal)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Favorite Stone</th>
                                                        <td>{getValue(numberology.fav_stone)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Favorite Substones</th>
                                                        <td>{getValue(numberology.fav_substone)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Friendly Numbers</th>
                                                        <td>{getValue(numberology.friendly_num)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Neutral Numbers</th>
                                                        <td>{getValue(numberology.neutral_num)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Radical Number</th>
                                                        <td>{getValue(numberology.radical_num)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Radical Ruler</th>
                                                        <td>{getValue(numberology.radical_ruler)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>No data available</div>
                        )}
                    </div>
                </section>
            )}
            {activeTab === "ascendantReport" && (
                <section className="as_shop_wrapper as_padderBottom90">
                    <div className="container">

                        {/* Show Loader */}
                        {loading ? (
                            <div>Loading...</div>
                        ) : kundliData ? (
                            <div id="pills-basic" role="tabpanel" className="tab-pane fade active show">
                                <div className="main_background_basic">
                                    <div className="row">
                                        {/* Basic Details */}
                                        <div className="col-12">
                                            <h2 className="heading_birth headBasic">Ascendant Report</h2>
                                            <h5 className="heading_birth headBasic">Ascendant : {ascendantReport?.asc_report?.ascendant}</h5>
                                            <p>{ascendantReport?.asc_report?.report}</p>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>No data available</div>
                        )}
                    </div>
                </section>
            )}

            {activeTab === "planets" && (
                <section className="as_shop_wrapper as_padderBottom90">
                    <div className="container">

                        {/* Show Loader */}
                        {loading ? (
                            <div>Loading...</div>
                        ) : kundliData ? (
                            <div id="pills-basic" role="tabpanel" className="tab-pane fade active show">
                                <div className="main_background_basic">
                                    <div className="row">
                                        {/* Basic Details */}
                                        <div className="col-12">
                                            <h2 className="heading_birth headBasic">Planets Report</h2>
                                            <div className="table-responsive">
                                                <table className="table table-borderd" style={{ width: '100%', textAlign: 'left' }}>
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Name</th>
                                                            <th>Full Degree</th>
                                                            <th>Normalized Degree</th>
                                                            <th>Speed</th>
                                                            <th>Retrograde</th>
                                                            <th>Sign</th>
                                                            <th>Sign Lord</th>
                                                            <th>Nakshatra</th>
                                                            <th>Nakshatra Lord</th>
                                                            <th>Nakshatra Pad</th>
                                                            <th>House</th>
                                                            <th>Planet Set</th>
                                                            <th>Planet Awastha</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {planets.map((planet) => (
                                                            <tr key={planet.id}>
                                                                <td>{planet.id + 1}</td>
                                                                <td>{planet.name}</td>
                                                                <td>{planet.fullDegree.toFixed(2)}</td>
                                                                <td>{planet.normDegree.toFixed(2)}</td>
                                                                <td>{planet.speed.toFixed(2)}</td>
                                                                <td>{planet.isRetro}</td>
                                                                <td>{planet.sign}</td>
                                                                <td>{planet.signLord}</td>
                                                                <td>{planet.nakshatra}</td>
                                                                <td>{planet.nakshatraLord}</td>
                                                                <td>{planet.nakshatra_pad}</td>
                                                                <td>{planet.house}</td>
                                                                <td>{planet.is_planet_set ? "Yes" : "No"}</td>
                                                                <td>{planet.planet_awastha}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>No data available</div>
                        )}
                    </div>
                </section>
            )}
        </>
    )
}

export default KundliReportComponent
