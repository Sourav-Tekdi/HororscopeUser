import { useEffect, useState, useRef, useCallback } from "react"
import Helpers from "../../../Helpers/Helpers"
import AstrologerCard from "../../components/AstrologerCard"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Breadcrum from "../../components/Breadcrum"

const AstrologerComponent = ({ title }) => {
    const helpers = Helpers()
    const navigate = useNavigate()
    const { search } = useLocation()
    const params = new URLSearchParams(search)
    const pageFromUrl = parseInt(params.get('page'), 10) || 1

    const [astrologers, setAstrologers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)

    // Observer reference to track when we reach the end of the list
    const observer = useRef()

    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true)
    //         try {
    //             const response = await helpers.httpRequest(`/astrologer/?page=${currentPage}&limit=5&type=astrologer`, 'GET')

    //             if (response.status === 'success') {
    //                 setAstrologers(prevAstrologers => [
    //                     ...prevAstrologers,
    //                     ...response.data
    //                 ])
    //                 setTotalPages(response.totalPages)
    //                 setTotal(response.total)
    //             }
    //             console.log("setTotalPages",totalPages,"setTotal",total);
                
    //         } catch (error) {
    //             console.error('Error fetching Astrologers:', error)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }

    //     fetchData()
    // }, [currentPage])

    // Infinite scroll logic
    useEffect(() => {
        const fetchData = async () => {
            if (loading) return; // Prevent duplicate requests
            setLoading(true);
            try {
                const response = await helpers.httpRequest(`/astrologer/?page=${currentPage}&limit=5&type=astrologer`, 'GET');
    
                if (response.status === 'success') {
                    setAstrologers(prevAstrologers => {
                        // Check for duplicates before adding
                        const newData = response.data.filter(astrologer => 
                            !prevAstrologers.some(existing => existing.id === astrologer.id)
                        );
                        return [...prevAstrologers, ...newData];
                    });
                    setTotalPages(response.totalPages);
                    setTotal(response.total);
                }
            } catch (error) {
                console.error('Error fetching Astrologers:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [currentPage]); // Fetch new data when currentPage changes
    
    const lastElementRef = useCallback(node => {
        if (loading || currentPage >= totalPages) return; // Stop fetching beyond total pages
        if (observer.current) observer.current.disconnect();
    
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setCurrentPage(prevPage => prevPage + 1);
            }
        });
    
        if (node) observer.current.observe(node);
    }, [loading, currentPage, totalPages]);
    

    return (
        <>
            <Breadcrum title={title} />
            <section className="as_shop_wrapper as_padderBottom90 as_padderTop80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-8 col-sm-12 col-xs-12">
                            <div className="as_shop_topbar">
                                <span className="as_result_text">
                                    Showing {astrologers.length} of {total} astrologers
                                </span>
                                <div className="as_select_box">
                                    <Link to='/recharge-plans' className="btn btn-outline-success">Recharge</Link>
                                </div>
                            </div>
                            <div className="row">
                                {astrologers.map((astrologer, index) => (
                                    <div
                                        key={astrologer.id}
                                        ref={index === astrologers.length - 1 ? lastElementRef : null}
                                        className="col-lg-4 col-md-6 col-sm-12 col-xs-12"
                                    >
                                        <AstrologerCard astrologer={astrologer} />
                                    </div>
                                ))}
                            </div>
                            {loading && <p>Loading...</p>}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AstrologerComponent
