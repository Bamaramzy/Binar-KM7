import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getCars } from "../services/cars";
import { getManufactures } from "../services/manufactures";
import ManufactureItem from "../components/Cars/manufacturesItem";
import CarItem from "../components/cars/carsItem";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { token } = useSelector((state) => state.auth);

  const [cars, setCars] = useState([]);
  const [manufactures, setManufactures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedData, setSelectedData] = useState("cars");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      setLoading(true);
      setError(null);

      try {
        const carResult = await getCars();
        if (carResult.success) {
          setCars(carResult.data);
        } else {
          setError(carResult.message || "Failed to fetch cars");
        }

        const manufactureResult = await getManufactures();
        if (manufactureResult.success) {
          setManufactures(manufactureResult.data);
          setSelectedData("manufactures");
        } else {
          setError(manufactureResult.message || "Failed to fetch manufactures");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      ) : error ? (
        <Col>
          <h1>{error}</h1>
        </Col>
      ) : (
        <Col>
          <h1>Data Selection</h1>
          <div>
            <button onClick={() => setSelectedData("cars")}>Show Cars</button>
            <button onClick={() => setSelectedData("manufactures")}>Show Manufactures</button>
          </div>

          {selectedData === "cars" && cars.length > 0 && (
            <div>
              <h2>Cars</h2>
              <ul>
                {cars.map((car) => (
                  <li key={car.id}>
                    <CarItem car={car} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedData === "manufactures" && manufactures.length > 0 && (
              <div>
                  <h2>Manufactures</h2>
                  <ul>
                      {manufactures.map((manufacture) => (
                          <li key={manufacture.id}>
                              <ManufactureItem manufacture={manufacture} />
                          </li>
                      ))}
                  </ul>
              </div>
          )}

          {selectedData === "cars" && cars.length === 0 && (
            <h2>No cars found</h2>
          )}
          {selectedData === "manufactures" && manufactures.length === 0 && (
            <h2>No manufactures found</h2>
          )}
        </Col>
      )}
    </Row>
  );
}