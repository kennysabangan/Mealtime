import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBRipple, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

const RecipeGrid = () => {
    // const Display = (props) => {
    //     const {id} = props;
    //     const [petList, setPetList] = useState([]); -----but for recipe list   -------
    
    
    //     useEffect(() => {
    //         axios.get('http://localhost:8000/api/pets') ------ our API of choice --------
    //             .then(res=> {
    //                 console.log(res);
    //                 console.log(res.data);
    //                 setPetList(res.data);
    //             })
    //             .catch((err)=> {
    //                 console.log(err);
    //                 navigate("/error");
    //             })
    //     }, [id])

    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol size='md' className='col-example'>
                {/* {
                            petList? ------ but for recipeList -------

                            petList.map((pet, index) => (
                                <tr key={index}>
                                    <td style={{borderRight:"1px solid black"}}>{pet.petName}</td>
                                    <td style={{borderRight:"1px solid black"}}>{pet.petType}</td>
                                    <td style={{display:"flex"}}>
                                        <Link to={`/pets/${pet._id}`} style={{borderRight:"1px solid black", paddingRight:"10px"}}>details</Link>
                                        <Link to={`/pets/${pet._id}/edit`} style={{marginLeft:"5px"}}>edit</Link> 
                                    </td>
                                </tr>
                            ))
                            :null
                        } */}
                    <MDBCard style={{ maxWidth: '22rem' }}>
                        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                            <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/111.webp' fluid alt='...' />
                            <a href='/onerecipe'>
                                <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                            </a>
                        </MDBRipple>
                        <MDBCardBody>
                            <MDBCardTitle>Recipe Title</MDBCardTitle>
                            <MDBCardText>
                                <span style={{ fontStyle: 'italic' }}> Short description of recipe </span>
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol size='md' className='col-example'>
                    <MDBCard style={{ maxWidth: '22rem' }}>
                        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                            <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/111.webp' fluid alt='...' />
                            <a href='/onerecipe'>
                                <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                            </a>
                        </MDBRipple>
                        <MDBCardBody>
                            <MDBCardTitle>Recipe Title</MDBCardTitle>
                            <MDBCardText>
                                <span style={{ fontStyle: 'italic' }}> Short description of recipe </span>
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol size='md' className='col-example'>
                    <MDBCard style={{ maxWidth: '22rem' }}>
                        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                            <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/111.webp' fluid alt='...' />
                            <a href='/onerecipe'>
                                <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                            </a>
                        </MDBRipple>
                        <MDBCardBody>
                            <MDBCardTitle>Recipe Title</MDBCardTitle>
                            <MDBCardText>
                                <span style={{ fontStyle: 'italic' }}> Short description of recipe </span>
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default RecipeGrid;