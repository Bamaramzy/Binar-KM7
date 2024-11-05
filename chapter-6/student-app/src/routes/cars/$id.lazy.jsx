import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { getDetailCars } from "../../services/cars";


export const Route = createLazyFileRoute("/cars/$id")({
    component: CarDetail,
});

function CarDetail() {
    const { id } = Route.useParams();

    const [car, setCar] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);

    useEffect(() => {
        const getDetailCarsData = async (carId) => {
            setIsLoading(true);
            try {
                const result = await getDetailCars(carId);
                console.log(result.data); // Check data structure here
                if (result?.success && result.data) {
                    setCar(result.data);
                    setIsNotFound(false);
                } else {
                    setIsNotFound(true);
                }
            } catch (error) {
                console.error("Error fetching car details:", error);
                setIsNotFound(true);
            } finally {
                setIsLoading(false);
            }
        };
    
        if (id) {
            getDetailCarsData(id);
        }
    }, [id]);
    

    if (isLoading) {
        return (
            <Row className="mt-5">
                <Col>
                    <h1 className="text-center">Loading...</h1>
                </Col>
            </Row>
        );
    }

    if (isNotFound) {
        return (
            <Row className="mt-5">
                <Col>
                    <h1 className="text-center">Car not found!</h1>
                </Col>
            </Row>
        );
    }

    return (
        <Row className="mt-5">
            <Col md={{ span: 6, offset: 3 }}>
                <Card className="shadow-sm">
                    <Card.Img
                        variant="top"
                        src={car?.image}
                        alt={car?.plate || "Car image"}
                        style={{ height: "300px", objectFit: "cover" }}
                    />
                    <Card.Body>
                        <Card.Title>{car?.plate || "Unknown Plate"}</Card.Title>
                        <Card.Text>
                            <strong>Model:</strong> {car?.models?.description || "N/A"}
                        </Card.Text>
                        <Card.Text>
                            <strong>Year:</strong> {car?.year || "N/A"}
                        </Card.Text>
                        <Card.Text>
                            <strong>Description:</strong> {car?.description || "N/A"}
                        </Card.Text>
                        <Card.Text>
                            <strong>Rent per Day:</strong> ${car?.rentPerDay || "N/A"}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default CarDetail;
