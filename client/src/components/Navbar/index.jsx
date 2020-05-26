import React from "react"; 
import {NavLink, Link} from "react-router-dom";
import {ReactComponent as Logo} from "../../images/crown.svg";
import {useSelector , useDispatch} from "react-redux";
import {selectCurrentUser} from "../../redux/user/user.selector.js";
import {signOutAsync} from "../../redux/user/user.action.js";
import {selectIsPageYtop} from "../../redux/system/system.selector.js"
import {Navbar, Nav} from "react-bootstrap";
import SearchBar from "../SearchBar";
import CartIcon from "../CartIcon";
import {Container,CustomBContainer} from "./style.jsx";
import profileIconSvg from  "../../images/profile-icon.svg";
import ProfileIcon from "../ProfileIcon";
const {Link:BLink} = Nav;






const CustomNavbar = (props) => {
    const currentUser = useSelector(selectCurrentUser);
    const isPageYTop = useSelector(selectIsPageYtop);
    const dispatch = useDispatch(); 
    
    const handleSignOut = (e) => {
       dispatch(signOutAsync());
    }
    return (
        <Container isPageYTop={isPageYTop} >
              <Navbar expand="sm" variant="light" className="navBar"> 
              <CustomBContainer fluid>
              <Navbar.Brand  as={Link} to='/' style={{flex:1}}><Logo /></Navbar.Brand> 
               <CartIcon className= "d-sm-none"/>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav px-0 text-center w-100">
                <SearchBar className="d-none w-50 d-lg-inline-flex justify-content-end" style={{flex:1}}/>
                        <Nav className="ml-auto text-uppercase w-100 justify-content-end text-center" style={{flex:1}}>       
                                <BLink as={NavLink} to='/' activeClassName="active" className="link" exact>Homepage</BLink>
                                <BLink as={NavLink} to="/Browse" className="link" exact>Browse</BLink>
                                <BLink as={NavLink} to="/contactus" className="link" exact>Contact us</BLink>
                                {currentUser?
                                    <BLink  onClick = {handleSignOut} to={"/"}>Sign out</BLink> :
                                    <BLink  as={NavLink} to="/signin" className="link">Sign in</BLink>
                                }
                        </Nav>
                       
                </Navbar.Collapse> 
               <CartIcon className= "d-none d-sm-flex ml-3" styled={{flex:1}}/> 
                <ProfileIcon src={profileIconSvg} alt={"profile icon"}/>
                </CustomBContainer>
                </Navbar>     
        </Container>
    )
}



export default CustomNavbar; 

     
    



 