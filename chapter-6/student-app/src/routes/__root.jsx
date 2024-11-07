import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Container, Row, Col } from "react-bootstrap";;
import NavigationBar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export const Route = createRootRoute({
    component: () => (
        <div className="d-flex vh-100">
            <Row className="w-100 m-0">
                {/* Sidebar */}
                <Col md={3} className="bg-dark text-white p-0">
                    <Sidebar />
                </Col>

                {/* Main content */}
                <Col md={9} className="p-0 d-flex flex-column">
                    <NavigationBar />

                    <Container fluid className="flex-grow-1 overflow-auto p-3">
                        {/* Render the component based on the current route */}
                        <Outlet />
                    </Container>
                </Col>
            </Row>

            {/* Router DevTools for debugging */}
            <TanStackRouterDevtools />
        </div>
    ),
});