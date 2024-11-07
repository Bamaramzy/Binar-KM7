import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { getManufactures } from "../../services/manufactures";
import { getTypes } from "../../services/types";
import { getModels } from "../../services/models";
import { createCar } from "../../services/cars"; 


export const Route = createLazyFileRoute("/cars/create")({
    component: CreateCar,
});

function CreateCar() {
    const navigate = useNavigate();

    const [plate, setPlate] = useState("");
    const [manufactureId, setManufactureId] = useState(0);
    const [modelId, setModelId] = useState(0);
    const [image, setImage] = useState(undefined);
    const [currentImage, setCurrentImage] = useState(undefined);
    const [rentPerDay, setRentPerDay] = useState("");
    const [capacity, setCapacity] = useState("");
    const [description, setDescription] = useState("");
    const [availableAt, setAvailableAt] = useState("");
    const [transmission, setTransmission] = useState("Automatic");
    const [available, setAvailable] = useState(false);
    const [typeId, setTypeId] = useState(0);
    const [year, setYear] = useState("");
    const [options, setOptions] = useState([]);
    const [specs, setSpecs] = useState([]);
    const [manufactures, setManufactures] = useState([]);
    const [types, setTypes] = useState([]);
    const [models, setModels] = useState([]);

    useEffect(() => {
        const fetchManufactures = async () => {
            const result = await getManufactures();
            if (result?.success) {
                setManufactures(result.data);
            }
        };

        const fetchTypes = async () => {
            const result = await getTypes();
            if (result?.success) {
                setTypes(result.data);
            }
        };

        const fetchModels = async () => {
            const result = await getModels();
            if (result?.success) {
                setModels(result.data);
            }
        };

        fetchManufactures();
        fetchTypes();
        fetchModels();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();

        const request = {
            plate,
            modelId, 
            manufactureId, 
            rentPerDay,
            capacity,
            description,
            available,
            availableAt,
            transmission,
            typeId, 
            year,
            options,
            specs,
            image,
        };

        const result = await createCar(request);
        if (result?.success) {
            navigate({ to: "/" });
            return;
        }

        alert(result?.message || "Failed to create car");
    };

    return (
        <Row className="mt-5">
            <Col className="offset-md-3">
                <Card>
                    <Card.Header className="text-center">Create Car</Card.Header>
                    <Card.Body>
                        <Form onSubmit={onSubmit}>
                            <Form.Group as={Row} className="mb-3" controlId="plate">
                                <Form.Label column sm={3}>Plate</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Plate"
                                        required
                                        value={plate}
                                        onChange={(event) => setPlate(event.target.value)}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="manufactureId">
                                <Form.Label column sm={3}>Manufacture</Form.Label>
                                <Col sm={9}>
                                    <Form.Select
                                        
                                        value={manufactureId}
                                        onChange={(event) => setManufactureId(event.target.value)}
                                    >
                                        <option disabled>Select Manufacture</option>
                                        {manufactures.map((manufacture) => (
                                            <option key={manufacture.id} value={manufacture.id}>
                                                {manufacture.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="modelId">
                                <Form.Label column sm={3}>Model</Form.Label>
                                <Col sm={9}>
                                    <Form.Select
                                        
                                        value={modelId}
                                        onChange={(event) => setModelId(event.target.value)}
                                    >
                                        <option disabled>Select Model</option>
                                        {models.map((model) => (
                                            <option key={model.id} value={model.id}>
                                                {model.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="rentPerDay">
                                <Form.Label column sm={3}>Rent per Day</Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        type="number"
                                        placeholder="Rent per Day"
                                        
                                        value={rentPerDay}
                                        onChange={(event) => setRentPerDay(event.target.value)}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="year">
                                <Form.Label column sm={3}>Year</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Year"
                                        
                                        value={year}
                                        onChange={(event) => setYear(event.target.value)}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="capacity">
                                <Form.Label column sm={3}>Capacity</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="number"
                                        placeholder="Capacity"
                                        
                                        value={capacity}
                                        onChange={(event) => setCapacity(event.target.value)}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="description">
                                <Form.Label column sm={3}>Description</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Description"
                                        
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="availableAt">
                                <Form.Label column sm={3}>Available At</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="date"
                                        placeholder="Available At"
                                        
                                        value={availableAt}
                                        onChange={(event) => setAvailableAt(event.target.value)}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="transmission">
                                <Form.Label column sm={3}>Transmission</Form.Label>
                                <Col sm={9}>
                                    <Form.Select
                                        value={transmission}
                                        onChange={(event) => setTransmission(event.target.value)}
                                    >
                                        <option value="Automatic">Automatic</option>
                                        <option value="Manual">Manual</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="available">
                                <Form.Label column sm={3}>Available</Form.Label>
                                <Col sm={9}>
                                    <Form.Check
                                        type="checkbox"
                                        checked={available}
                                        onChange={(event) => setAvailable(event.target.checked)}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="typeId">
                                <Form.Label column sm={3}>Type</Form.Label>
                                <Col sm={9}>
                                    <Form.Select
                                        
                                        value={typeId}
                                        onChange={(event) => setTypeId(event.target.value)}
                                    >
                                        <option disabled>Select Type</option>
                                        {types.map((type) => (
                                            <option key={type.id} value={type.id}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="options">
                                <Form.Label column sm={3}>Options</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Add options separated by commas"
                                        value={options.join(", ")}
                                        onChange={(event) => setOptions(event.target.value.split(",").map(opt => opt.trim()))}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="specs">
                                <Form.Label column sm={3}>Specs</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Add specs separated by commas"
                                        value={specs.join(", ")}
                                        onChange={(event) => setSpecs(event.target.value.split(",").map(spec => spec.trim()))}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group
                              as={Row}
                              className="mb-3"
                              controlId="image"
                            >
                              <Form.Label column sm={3}>
                                Image
                              </Form.Label>
                              <Col sm={9}>
                                <Form.Control
                                  type="file"
                                  placeholder="Choose File"
                                  
                                  onChange={(event) => {
                                    setImage(event.target.files[0]);
                                    setCurrentImage(URL.createObjectURL(event.target.files[0]));
                                  }}
                                  accept=".jpg,.png"
                                />
                              </Col>
                            </Form.Group>
                            <Form.Group
                              as={Row}
                              className="mb-3"
                              controlId="image"
                            >
                              <Form.Label column sm={3}></Form.Label>
                              <Col sm={9}>
                                <Image src={currentImage} fluid />
                              </Col>
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit">Submit</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={3}></Col>
        </Row>
    );
    
}