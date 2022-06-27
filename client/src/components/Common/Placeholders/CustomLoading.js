import loading from "../../../assets/img/loading.gif";

export default function CustomLoading ({className}) {
    return (
        <div  className={"d-flex flex-column align-items-center justify-content-center w-100 " + className}>
            <img src={loading} alt="Loading" width="400" height="300"/>
            <h1 style={{fontWeight: 'bold', fontSize: '30px'}}>LOADING...</h1>
        </div>
    )
}