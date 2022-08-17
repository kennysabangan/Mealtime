import axios from 'axios';
import { Buffer } from 'buffer';
import { useEffect, useState } from 'react';
import FormData from 'form-data';
import noProfile from '../static/no-profile.png'
import toast from 'react-hot-toast';

const ProfileCard = (props) => {

    const [ edit, setEdit ] = useState(false);
    const { user } = props;
    const [ image, setImage ] = useState("");
    const [ pic, setPic ] = useState();
    const [ firstName, setFirstName ] = useState(user.firstName);
    const [ lastName, setLastName ] = useState(user.lastName);
    const [ quote, setQuote ] = useState(user.quote);
    const [ email, setEmail ] = useState(user.email);
    const [ age, setAge ] = useState(user.age);
    const [ allergies, setAllergies ] = useState(user.allergies);
    const [ restrictions, setRestrictions ] = useState(user.restrictions);
    const [ update, setUpdate ] = useState(false)

    const uploadPic = (e) => {
        e.preventDefault();
        if (e.target[0].value) {
            const data = new FormData();
            data.append("image", image);
            data.append("creator", image.creator)

            fetch(`${process.env.REACT_APP_SERVER}/api/users/upload`, {
              method: "POST",
              body: data
            })
              .then(() => {
                window.location.reload(false);
                toast.success("Profile picture uploaded successfully!");
              })
              .catch((err) => {
                console.log(err.message);
              });
        } else {
            toast.error("Choose a file you wish to upload!")
        }
    }

    const uploadHandler = (e) => {
        const obj = e.target.files[0]
        obj.creator = user._id
        setImage(obj)
    }

    const [params, setParams] = useState({
        tags: [],
        number: 0,
        dairyFreeIsChecked: user.restrictions.includes('dairy free'),
        veganIsChecked: user.restrictions.includes('vegan'),
        grainFreeIsChecked: user.restrictions.includes('grain free'),
        ketoIsChecked: user.restrictions.includes('keto'),
        whole30IsChecked: user.restrictions.includes('whole30'),
    });

    const onChangeHandler = () => {
        const newStateObject = { ...params };
        const newTags = []

        var inputs = document.querySelectorAll("input[type='checkbox']");
        inputs.forEach(input => {
            const objectRestriction = input.id + "IsChecked";
            input.checked ? newStateObject[objectRestriction] = true : newStateObject[objectRestriction] = false
            input.checked && newTags.push(input.value)
        })

        newStateObject.tags = newTags;
        setParams(newStateObject);
        console.log(newStateObject);
    };

    const saveHandler = () => {
        axios.put(`${process.env.REACT_APP_SERVER}/api/users/update`,
            { id: user._id , firstName, lastName, quote, email, age, allergies, restrictions: params['tags'] },
            { withCredentials: true })
                .then(user => {
                    console.log(user);
                    setFirstName(user.data.firstName);
                    setLastName(user.data.lastName);
                    setQuote(user.data.quote)
                    setEmail(user.data.email);
                    setAge(user.data.age);
                    setAllergies(user.data.allergies);
                    setRestrictions(user.data.restrictions);

                    setEdit(!edit);
                    setUpdate({ ...update });
                })
                .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_SERVER}/api/users/pic`, { user: user }, { responseType: "arraybuffer" })
            .then(res => {
                let base64ImageString = Buffer.from(res.data, 'binary').toString('base64')
                let srcValue = "data:image/png;base64,"+base64ImageString
                setPic(srcValue)
            })
            .catch(err => console.log(err))
    }, [])

    const cancelHandler = () => {
        window.location.reload(false);
    }

    return (
        <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
            <div className='profile-background'>
        { user &&
            <div className="container py-5 h-75">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-8 mb-4 mb-lg-0">
                    <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                    <div className="row g-0">
                        <div className="col-md-4 gradient-custom text-center text-white" style={{ borderTopLeftRadius: ".5rem", borderBottomLeftRadius: ".5rem" }}>

                        { edit ?
                            <div className='img-edit'>
                                <form onSubmit={uploadPic} className="mt-2">
                                    <input type="file" onChange={uploadHandler} className="ms-4 mt-5" />
                                    <button className="btn btn-primary my-3 mb-4" type="submit">Upload Picture</button>
                                </form>
                            </div> :
                            <div className="mt-3">
                                <img src={ pic ? pic : noProfile } style={{ borderRadius: "50%", height:"100px", width: "100px", objectFit: "cover", objectPosition: "0% 15%" }}  className="my-4" />
                            </div>
                        }

                        { edit ?
                        <div>
                            <div className="d-flex justify-content-center gap-3 px-4 mb-1 mt-1">
                                <input type="text" className="form-control text-center" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                                <input type="text" className="form-control text-center" value={lastName} onChange={e => setLastName(e.target.value)}/>
                            </div>
                            <div className="px-4 mb-3">
                                <input type="text" className="form-control text-center" value={quote} onChange={e => setQuote(e.target.value)}/>
                            </div>
                        </div> :
                        <>
                            <h5 className="mt-1">{ firstName } { lastName }</h5>
                            <p>"{ quote }"</p>
                        </>
                        }

                        { !edit &&
                            <button className="btn btn-dark" onClick={() => setEdit(!edit)}>
                                <i className="far fa-edit me-1"></i>
                                Edit
                            </button>
                        }

                        { edit &&
                            <div className="d-flex justify-content-center gap-3">
                                <button className="btn btn-primary" style={{ marginLeft: "15px" }} onClick={saveHandler}>
                                    Save
                                </button>
                                <button className="btn btn-danger" onClick={cancelHandler}>
                                    Cancel
                                </button>
                            </div>
                        }

                        </div>
                        <div className="col-md-8">
                        <div className="card-body p-4">
                            <h6>Information</h6>
                            <hr className="mt-0 mb-4"/>
                            <div className="row pt-1">
                            <div className="col-6 mb-3">
                                <h6>Email</h6>
                                { !edit && <p className="text-muted">{ email }</p> }
                                { edit && <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />}
                            </div>
                            <div className="col-6 mb-3">
                                <h6>Age</h6>
                                { !edit && <p className="text-muted">{ age }</p> }
                                { edit && <input type="number" className="form-control w-50" value={age} onChange={e => setAge(e.target.value)}/>}
                            </div>
                            </div>
                            <h6>Diet</h6>
                            <hr className="mt-0 mb-4"/>
                            <div className="row pt-1">
                            <div className="col-6 mb-3">
                                <h6>Allergies</h6>
                                { !edit && <p className="text-muted">{ allergies ? allergies : "None" }</p> }
                                { edit && <input type="text" className="form-control" value={allergies} onChange={e => setAllergies(e.target.value)}/>}
                            </div>
                            { !edit &&
                            <div className="col-6 mb-3">
                                <h6>Dietary Restrictions</h6>
                                <p className="text-muted">
                                { restrictions.length !== 0 ?
                                    restrictions.map(restriction => {
                                        return restriction[0].toUpperCase() + restriction.slice(1)
                                    }).join(', ')

                                    : <span>None</span>
                                }
                                </p>
                            </div>
                            }
                            { edit &&
                                <div className="restrictions">
                                    <h6>Restrictions</h6>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            checked={params.dairyFreeIsChecked}
                                            onChange={onChangeHandler}
                                            type="checkbox"
                                            id="dairyFree"
                                            value="dairy free"
                                        />
                                        <label className="form-check-label" htmlFor="dairyFree">
                                            Dairy Free
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            checked={params.veganIsChecked}
                                            onChange={onChangeHandler}
                                            type="checkbox"
                                            id="vegan"
                                            value="vegan"
                                        />
                                        <label className="form-check-label" htmlFor="vegan">
                                            Vegan
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            checked={params.grainFreeIsChecked}
                                            onChange={onChangeHandler}
                                            type="checkbox"
                                            id="grainFree"
                                            value="grain free"
                                        />
                                        <label className="form-check-label" htmlFor="grainFree">
                                            Grain Free
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            checked={params.ketoIsChecked}
                                            onChange={onChangeHandler}
                                            type="checkbox"
                                            id="keto"
                                            value="keto"
                                        />
                                        <label className="form-check-label" htmlFor="keto">
                                            Keto
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            checked={params.whole30IsChecked}
                                            onChange={onChangeHandler}
                                            type="checkbox"
                                            id="whole30"
                                            value="whole30"
                                        />
                                        <label className="form-check-label" htmlFor="whole30">
                                            Whole30
                                        </label>
                                    </div>
                                </div>
                            }
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        }
        </div>
        </section>
    )
}

export default ProfileCard;