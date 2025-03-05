import React from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

const accounts = [
  { id: 1, balance: 100000, risk: 5 },
  { id: 2, balance: 100000, risk: 5 },
  { id: 3, balance: 100000, risk: 5 },
  { id: 4, balance: 100000, risk: 5 },
];

const alerts = [
  ["Setup Buys", "Setup Sells"],
  ["Open Gap Buys", "Open Gap Sells"],
  ["Alerts Buy", "Alerts Sell"],
];

const Dashboard = () => {
  return (
    <Container className="p-4 bg-light">
      <Row className="d-flex">
        <Col sm={6} className="d-flex flex-column gap-4">
          {/* Lot Size Controls */}
          <Card className="bg-dark text-white p-4 rounded-2xl shadow-lg flex-grow-1">
            <Card.Body>
              <Card.Title className="text-lg font-semibold mb-4 text-center">
                Lot Size Controls
              </Card.Title>
              {[
                ["Buy", "Sell"],
                ["Trailing buy", "Trailing sell"],
                ["Another buy", "Another sell"],
              ].map((pair, i) => (
                <div key={i} className="d-flex align-items-center gap-2 mb-2">
                  <Button variant="success" className="px-4 py-2 flex-grow-1">
                    {pair[0]}
                  </Button>
                  <Form.Control
                    type="text"
                    defaultValue={"1.0"}
                    className="border p-2 w-25 text-center rounded-lg"
                  />
                  <Button variant="danger" className="px-4 py-2 flex-grow-1">
                    {pair[1]}
                  </Button>
                </div>
              ))}
            </Card.Body>
          </Card>
          {/* Account Details */}
          <Card className="bg-dark text-white p-4 rounded-2xl shadow-lg flex-grow-1">
            <Card.Body>
              <Card.Title className="text-lg font-semibold mb-4 text-center">
                Account Details
              </Card.Title>
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="mb-4 p-4 bg-light rounded-lg text-dark"
                >
                  <h3 className="font-semibold">Account #{account.id}</h3>
                  <p>
                    Balance:{" "}
                    <span className="font-bold">
                      ${account.balance.toLocaleString()}
                    </span>
                  </p>
                  <p>
                    Risk %: <span className="font-bold">{account.risk}</span>
                  </p>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} className="d-flex flex-column gap-4">
          {/* Alerts */}
          <Card className="bg-dark text-white p-3 rounded-2xl shadow-lg flex-grow-1">
            <Card.Body>
              <Card.Title className="text-lg font-semibold mb-3 text-center">
                Alerts
              </Card.Title>
              {alerts.map((pair, index) => (
                <Row key={index} className="mt-5 mb-5">
                  {pair.map((title) => (
                    <Col key={title} sm={6}>
                      <Card className="bg-light p-3 rounded-2xl shadow-md">
                        <Card.Body>
                          <Card.Title className="font-semibold text-dark border-bottom pb-2 mb-2">
                            {title}
                          </Card.Title>
                          <div
                            className="h-40 overflow-auto"
                            style={{ maxHeight: "150px", overflowY: "scroll" }}
                          >
                            <ul
                              className="pl-0 w-100"
                              style={{ listStyleType: "none" }}
                            >
                              {[...Array(20)].map((_, i) => (
                                <li
                                  key={i}
                                  className="text-sm bg-white text-dark mb-2 p-2 bg-white rounded-lg shadow-sm w-100"
                                >
                                  New buy setup @ 13:00
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
