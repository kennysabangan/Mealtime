import Navigation from '../components/Navigation';

const ProfileCard = () => {

    return (
        <>
        <Navigation/>
        <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
            <div className="container py-5 h-75">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-8 mb-4 mb-lg-0">
                    <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                    <div className="row g-0">
                        <div className="col-md-4 gradient-custom text-center text-white" style={{ borderTopLeftRadius: ".5rem", borderBottomLeftRadius: ".5rem" }}>
                        <img
                            src={require('../static/no-profile.png')}
                            alt="Avatar"
                            className="img-fluid my-5"
                            style={{ width: "80px" }}
                        />
                        <h5>Marie Horwitz</h5>
                        <p>“Let food be thy medicine."</p>
                        <a href="/profile/edit" style={{ color: "black" }}><i className="far fa-edit mb-5"></i></a>
                        </div>
                        <div className="col-md-8">
                        <div className="card-body p-4">
                            <h6>Information</h6>
                            <hr className="mt-0 mb-4"/>
                            <div className="row pt-1">
                            <div className="col-6 mb-3">
                                <h6>Email</h6>
                                <p className="text-muted">johndoe@example.com</p>
                            </div>
                            <div className="col-6 mb-3">
                                <h6>Age</h6>
                                <p className="text-muted">-</p>
                            </div>
                            </div>
                            <h6>Diet</h6>
                            <hr className="mt-0 mb-4"/>
                            <div className="row pt-1">
                            <div className="col-6 mb-3">
                                <h6>Allergies</h6>
                                <p className="text-muted">Peanuts</p>
                            </div>
                            <div className="col-6 mb-3">
                                <h6>Additional Preferences</h6>
                                <p className="text-muted">GF, Pescatarian</p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default ProfileCard;