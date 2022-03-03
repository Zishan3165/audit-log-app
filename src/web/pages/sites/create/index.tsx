import React, { useState } from 'react';
import { Alert, Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import { FaExclamation } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../../utils/hooks/useAuth';
import { displaySuccess } from '../../../../utils/toaster';
import { InputBox } from '../../../common/forms/InputBox';
import { MainPageLayout } from '../../../layouts/MainPageLayout';
import services from '../../../../services';

export default function CreateSite() {
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setError(null);
      setLoading(true);
      const body = {
        name,
        region,
        description,
        lat: lat?.toString().substring(0, 12),
        long: long?.toString().substring(0, 12)
      };
      const response = await services.createSite({ body, userId: auth?._id });
      setLoading(false);
      if (response?.responseCode === 201) {
        displaySuccess('Success!', 'Site created');
        if (response?.data?._id) {
          navigate(`./../${response?.data?._id}`);
        } else {
          navigate(`./..`);
        }
      } else {
        return setError('Could not save site');
      }
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return (
    <MainPageLayout>
      <Card className="container p-0 mt-2" style={{ maxWidth: '825px', margin: '0 auto' }}>
        <Card.Header>
          <Card.Title>Create Site</Card.Title>
        </Card.Header>
        <div>
          <Form onSubmit={handleSubmit}>
            <Card.Body>
              <InputBox label="Name" value={name} onChange={setName} required />
              <InputBox label="Region" value={region} onChange={setRegion} required />
              <InputBox
                label="Description"
                value={description}
                textarea
                onChange={setDescription}
              />
              <Row>
                <Col lg={6}>
                  <InputBox
                    min={-90}
                    max={90}
                    maxLength={12}
                    step={'any'}
                    label="Latitude"
                    type="number"
                    value={lat}
                    onChange={setLat}
                    required
                  />
                </Col>
                <Col lg={6}>
                  <InputBox
                    min={-180}
                    max={180}
                    maxLength={12}
                    step={'any'}
                    label="Longitude"
                    type="number"
                    value={long}
                    onChange={setLong}
                    required
                  />
                </Col>
              </Row>
              {error && (
                <>
                  <hr className="my-2" />
                  <Alert variant="danger" className="my-0 py-2">
                    <FaExclamation /> {error + ''}
                  </Alert>
                </>
              )}
            </Card.Body>
            <Card.Footer className="d-flex align-items-center justify-content-end">
              <Button type="submit" variant="success" style={{ width: 125 }} disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Create'}
              </Button>
            </Card.Footer>
          </Form>
        </div>
      </Card>
    </MainPageLayout>
  );
}
