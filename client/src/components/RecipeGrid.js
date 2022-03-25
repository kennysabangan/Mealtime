import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

const RecipeGrid = () => {
    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol size='md' className='col-example'>
                    <MDBCard style={{ maxWidth: '22rem' }}>
                        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                            <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/111.webp' fluid alt='...' />
                            <a>
                                <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                            </a>
                        </MDBRipple>
                        <MDBCardBody>
                            <MDBCardTitle>Recipe Title</MDBCardTitle>
                            <MDBCardText>
                                Short description of recipe
                            </MDBCardText>
                            <MDBBtn style={{ backgroundColor: "#48BD8F" }} href='#'>Add to 'My Recipes'</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol size='md' className='col-example'>
                    <MDBCard style={{ maxWidth: '22rem' }}>
                        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                            <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/111.webp' fluid alt='...' />
                            <a>
                                <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                            </a>
                        </MDBRipple>
                        <MDBCardBody>
                            <MDBCardTitle>Recipe Title</MDBCardTitle>
                            <MDBCardText>
                                Short description of recipe
                            </MDBCardText>
                            <MDBBtn style={{ backgroundColor: "#48BD8F" }} href='#'>Add to 'My Recipes'</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol size='md' className='col-example'>
                    <MDBCard style={{ maxWidth: '22rem' }}>
                        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                            <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/111.webp' fluid alt='...' />
                            <a>
                                <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                            </a>
                        </MDBRipple>
                        <MDBCardBody>
                            <MDBCardTitle>Recipe Title</MDBCardTitle>
                            <MDBCardText>
                                Short description of recipe
                            </MDBCardText>
                            <MDBBtn style={{ backgroundColor: "#48BD8F" }} href='#'>Add to 'My Recipes'</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default RecipeGrid;