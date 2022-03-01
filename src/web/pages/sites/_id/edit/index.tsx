import React, { useContext, useState } from 'react';
import { Alert, Button, Col, Form, Modal, Row, Spinner } from 'react-bootstrap';
import { FaExclamation } from 'react-icons/fa';
import { useParams } from 'react-router';
import { displayError, displaySuccess } from '../../../../../utils/toaster';
import { InputBox } from '../../../../common/forms/InputBox';
import { Site } from '../../../../models';
import { FaPencilAlt, FaTimes, FaSave } from 'react-icons/fa';
import { useAuth } from '../../../../../utils/hooks/useAuth';
import services from '../../../../../services';
import { ViewSiteContext } from '..';

interface EditSiteProps {
  item: Site;
}

export default function EditSite(props: EditSiteProps) {
  const { setCount } = useContext(ViewSiteContext);
  const [showModal, setShowModal] = useState(false);
  const { item } = props;
  const { id } = useParams();
  const [name, setName] = useState(item.name || '');
  const [region, setRegion] = useState(item.region || '');
  const [description, setDescription] = useState(item.description || '');
  const [lat, setLat] = useState(item.lat || '');
  const [long, setLong] = useState(item.long || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setError(null);
      setLoading(true);
      const body = { name, region, description, lat, long };
      const response = await services.updateSite({ body, userId: auth?._id, siteId: id });
      if (response?.responseCode == 200) {
        displaySuccess('Success', 'Edit successful!');
        setCount((count: number) => count + 1);
      } else {
        return displayError({ title: 'Error', message: 'Failed to edit' });
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Modal show={showModal}>
        <Modal.Header>Edit Site</Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <InputBox label="Name" value={name} onChange={setName} required />
            <InputBox label="Region" value={region} onChange={setRegion} required />
            <InputBox label="Description" value={description} textarea onChange={setDescription} />
            <Row>
              <Col lg={6}>
                <InputBox
                  min={-90}
                  max={90}
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
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => setShowModal(false)}
              variant="outline-danger"
              style={{ width: 125 }}
              disabled={loading}>
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <div className="d-flex align-items-center justify-content-center">
                  <FaTimes className="mx-1" />
                  Cancel
                </div>
              )}
            </Button>
            <Button
              onClick={handleSubmit}
              variant="outline-primary"
              style={{ width: 125 }}
              disabled={loading}>
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <div className="d-flex align-items-center justify-content-center">
                  <FaSave className="mx-1" />
                  Save
                </div>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Button
        onClick={() => setShowModal((showModal) => !showModal)}
        style={{ width: 125 }}
        variant="outline-warning">
        <FaPencilAlt /> Edit
      </Button>
    </>
  );
}
