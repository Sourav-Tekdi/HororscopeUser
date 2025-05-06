import React from 'react'
import { Link } from 'react-router-dom'

const Pagination = ({ page, lastPage, setPage, response, path }) => {
    // Generate page numbers for the pagination
    const pageNumbers = []

    // Always show page 1
    if (page > 3) {
        pageNumbers.push(
            <li className="page-item" key={1}>
                <Link
                    className="page-link"
                    to={`/${path}?page=1`}
                    onClick={() => setPage(1)}
                >
                    1
                </Link>
            </li>
        )
        if (page > 4) {
            pageNumbers.push(<li className="page-item disabled" key="ellipsis1"><span className="page-link">...</span></li>)
        }
    }

    // Page numbers to the left of the current page
    for (let i = Math.max(1, page - 3); i < page; i++) {
        pageNumbers.push(
            <li className="page-item" key={i}>
                <Link
                    className="page-link"
                    to={`/${path}?page=${i}`}
                    onClick={() => setPage(i)}
                >
                    {i}
                </Link>
            </li>
        )
    }

    // Current page
    pageNumbers.push(
        <li className="page-item active" key={page}>
            <span className="page-link">{page}</span>
        </li>
    )

    // Page numbers to the right of the current page
    for (let i = page + 1; i <= Math.min(page + 3, lastPage); i++) {
        pageNumbers.push(
            <li className="page-item" key={i}>
                <Link
                    className="page-link"
                    to={`/${path}?page=${i}`}
                    onClick={() => setPage(i)}
                >
                    {i}
                </Link>
            </li>
        )
    }

    // Always show the last page if it's not the current page
    if (lastPage > page + 3) {
        if (lastPage > page + 4) {
            pageNumbers.push(<li className="page-item disabled" key="ellipsis2"><span className="page-link">...</span></li>)
        }
        pageNumbers.push(
            <li className="page-item" key={lastPage}>
                <Link
                    className="page-link"
                    to={`/${path}?page=${lastPage}`}
                    onClick={() => setPage(lastPage)}
                >
                    {lastPage}
                </Link>
            </li>
        )
    }

    return (
        <div className="row">
            <div className="col-sm-12 col-md-5 d-flex flex-column-reverse">
                  <div className="dataTables_info" id="example5_info" role="status" aria-live="polite">

                    <p className="text-center text-muted float-left">
                      Showing {response.from} to {response.to} of {response.total} entries
                    </p>

                  </div>
                </div>
            <div className="col-sm-12 col-md-7">
                <nav className="float-right">
                    <ul className="pagination pagination-outline-info">
                        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                            <Link
                                className="page-link"
                                to={`/${path}?page=${page - 1}`}
                                onClick={() => page > 1 && setPage(page - 1)}
                            >
                                Previous
                            </Link>
                        </li>
                        {pageNumbers}
                        <li className={`page-item ${page === lastPage ? 'disabled' : ''}`}>
                            <Link
                                className="page-link"
                                to={`/${path}?page=${page + 1}`}
                                onClick={() => page < lastPage && setPage(page + 1)}
                            >
                                Next
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Pagination
