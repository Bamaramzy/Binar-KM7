import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getCars } from "../services/cars";
import CarItem from "../components/cars/carsItem";

export const Route = createLazyFileRoute("/")({
    component: Index,
});

function Index() {
    const { token } = useSelector((state) => state.auth);

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCarData = async () => {
            setLoading(true);
            const result = await getCars();
            if (result.success) {
                setCars(result.data);
            }
            setLoading(false);
        };

        if (token) {
            getCarData();
        }
    }, [token]);

    return (
        <Row className="mt-4">
            {!token && (
                <Col>
                    <h1>Please login first to get car data!</h1>
                </Col>
            )}
            
            {loading ? (
                <Col>
                    <h1>Loading...</h1>
                </Col>
            ) : cars.length === 0 ? (
                <Col>
                    <h1>No data is found</h1>
                </Col>
            ) : (
                cars.map((car) => (
                    <CarItem car={car} key={car.id} />
                ))
            )}
        </Row>
    );
}
