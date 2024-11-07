import { Link, useNavigate } from "@tanstack/react-router";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../redux/slices/auth";  
import { profile } from "../../services/auth";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, token } = useSelector((state) => state.auth);

    useEffect(() => {
        const getProfile = async () => {
            const result = await profile();
            if (result.success) {
                dispatch(setUser(result.data));
                return;
            }
            dispatch(setUser(null));
            dispatch(setToken(null));
            navigate({ to: "/login" });
        };

        if (token) {
            getProfile();
        }
    }, [dispatch, navigate, token]);

    const logout = (event) => {
        event.preventDefault();
        dispatch(setUser(null));
        dispatch(setToken(null));
        navigate({ to: "/login" });
    };

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link to="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 d-none d-sm-inline">Student Wakanda App</span>
                        </Link>
                        <Nav className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <Nav.Link as={Link} to="/dashboard" className="nav-link align-middle px-0">
                                <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/cars" className="nav-link align-middle px-0">
                                <i className="fs-4 bi-car-front"></i> <span className="ms-1 d-none d-sm-inline">Cars</span>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/manufactures" className="nav-link align-middle px-0">
                                <i className="fs-4 bi-building"></i> <span className="ms-1 d-none d-sm-inline">Manufactures</span>
                            </Nav.Link>
                        </Nav>
                        <hr />
                        <div className="dropdown pb-4">
                            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <Image
                                    src={user?.profile_picture || "https://github.com/mdo.png"}
                                    alt="profile"
                                    width="30"
                                    height="30"
                                    className="rounded-circle"
                                />
                                <span className="d-none d-sm-inline mx-1">{user ? user.name : "Guest"}</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                <li><a className="dropdown-item" href="#">Profile</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" onClick={logout}>Sign out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col py-3">
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
