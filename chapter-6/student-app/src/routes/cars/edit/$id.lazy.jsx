import { createLazyFileRoute, useNavigate, } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getManufactures } from '../../../services/manufactures';
import { getTypes } from '../../../services/types';
import { getModels } from '../../../services/models';
import { getCarById, updateCar } from '../../../services/cars';

export const Route = createLazyFileRoute('/cars/edit/$id')({
  component: EditCar,
});

function EditCar() {
  const navigate = useNavigate();
  const { id } = Route.useParams();
  const [plate, setPlate] = useState('');
  const [manufactureId, setManufactureId] = useState(0);
  const [modelId, setModelId] = useState(0);
  const [image, setImage] = useState(undefined);
  const [rentPerDay, setRentPerDay] = useState('');
  const [capacity, setCapacity] = useState('');
  const [description, setDescription] = useState('');
  const [availableAt, setAvailableAt] = useState('');
  const [transmission, setTransmission] = useState('Automatic');
  const [available, setAvailable] = useState(false);
  const [typeId, setTypeId] = useState(0);
  const [year, setYear] = useState('');
  const [options, setOptions] = useState([]);
  const [specs, setSpecs] = useState([]);
  const [manufactures, setManufactures] = useState([]);
  const [types, setTypes] = useState([]);
  const [carData, setCarData] = useState(null);

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
        setTypes(result.data);
      }
    };

    const fetchCarData = async () => {
      const result = await getCarById(id);
      if (result?.success) {
        setCarData(result.data);
        // Populate form fields with car data
        setPlate(result.data.plate);
        setManufactureId(result.data.manufacture_id);
        setModelId(result.data.model_id);
        setRentPerDay(result.data.rentPerDay);
        setCapacity(result.data.capacity);
        setDescription(result.data.description);
        setAvailableAt(result.data.availableAt);
        setTransmission(result.data.transmission);
        setAvailable(result.data.available);
        setTypeId(result.data.type_id);
        setYear(result.data.year);

        setOptions(result.data.options || []);
        setSpecs(result.data.specs || []);
      } else {
        navigate('/'); 
      }
    };

    fetchManufactures();
    fetchTypes();
    fetchModels();
    fetchCarData();
  }, [id, navigate]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('plate', plate);
    formData.append('manufacture_id', manufactureId);
    formData.append('model_id', modelId);
    formData.append('image', image); // Optional, only if updating the image
    formData.append('rentPerDay', rentPerDay);
    formData.append('capacity', capacity);
    formData.append('description', description);
    formData.append('availableAt', availableAt);
    formData.append('transmission', transmission);
    formData.append('available', available);
    formData.append('type_id', typeId);
    formData.append('year', year);

    options.forEach((option) => formData.append('options[]', option));
    specs.forEach((spec) => formData.append('specs[]', spec));

    try {
      const response = await updateCar(id, formData); // Update car using your service
      if (response.success) {
        // Handle success, redirect to car list or details page
        navigate('/cars'); // Redirect after successful update
        return;
      } else {
        console.error('Error updating car:', response.message);
        alert(response.message); // Display error message
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Failed to update car, please try again later.'); // Display network error message
    }
  };

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Create Car</Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="plate">
                <Form.Label column sm={3}>
                  Plate
                </Form.Label>
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
                <Form.Label column sm={3}>
                  Manufacture
                </Form.Label>
                <Col sm={9}>
                  <Form.Select
                    required
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
                <Form.Label column sm={3}>
                  Model
                </Form.Label>
                <Col sm={9}>
                  <Form.Select
                    required
                    value={modelId}
                    onChange={(event) => setModelId(event.target.value)}
                  >
                    <option disabled>Select Model</option>
                    {/* Populate models based on selected manufacture */}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="image">
                <Form.Label column sm={3}>
                  Image
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="file"
                    accept=".jpg,.png"
                    onChange={(event) => setImage(event.target.files[0])}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="rentPerDay">
                <Form.Label column sm={3}>
                  Rent per Day
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="number"
                    placeholder="Rent per Day"
                    required
                    value={rentPerDay}
                    onChange={(event) => setRentPerDay(event.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="year">
                <Form.Label column sm={3}>
                  Year
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    placeholder="Year"
                    required
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="capacity">
                <Form.Label column sm={3}>
                  Capacity
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="number"
                    placeholder="Capacity"
                    required
                    value={capacity}
                    onChange={(event) => setCapacity(event.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="description">
                <Form.Label column sm={3}>
                  Description
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    as="textarea"
                    placeholder="Description"
                    required
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="availableAt">
                <Form.Label column sm={3}>
                  Available At
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="date"
                    placeholder="Available At"
                    required
                    value={availableAt}
                    onChange={(event) => setAvailableAt(event.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="transmission">
                <Form.Label column sm={3}>
                  Transmission
                </Form.Label>
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
                <Form.Label column sm={3}>
                  Available
                </Form.Label>
                <Col sm={9}>
                  <Form.Check
                    type="checkbox"
                    checked={available}
                    onChange={(event) => setAvailable(event.target.checked)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="typeId">
                <Form.Label column sm={3}>
                  Type
                </Form.Label>
                <Col sm={9}>
                  <Form.Select
                    required
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
                <Form.Label column sm={3}>
                  Options
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    placeholder="Add options separated by commas"
                    value={options.join(', ')}
                    onChange={(event) =>
                      setOptions(
                        event.target.value.split(',').map((opt) => opt.trim()),
                      )
                    }
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="specs">
                <Form.Label column sm={3}>
                  Specs
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    placeholder="Add specs separated by commas"
                    value={specs.join(', ')}
                    onChange={(event) =>
                      setSpecs(
                        event.target.value
                          .split(',')
                          .map((spec) => spec.trim()),
                      )
                    }
                  />
                </Col>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
