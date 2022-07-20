import noResults from "../../../assets/img/no_result_found.png";

export default function NoResults () {
    return (
        <div className="d-flex flex-column align-items-center w-100">
            <img src={noResults} alt="No results" />
            <h2 style={{color: '#bcbdbe'}}>No results match your search</h2>
        </div>
    )
}