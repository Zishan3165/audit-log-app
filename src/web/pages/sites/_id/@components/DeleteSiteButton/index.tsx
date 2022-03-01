import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Spinner } from 'react-bootstrap';
import { confirmDialog, displayError, displaySuccess } from '../../../../../../utils/toaster';
import { FaTrash } from 'react-icons/fa';
import { Site } from '../../../../../models';
import { useAuth } from '../../../../../../utils/hooks/useAuth';
import services from '../../../../../../services';

interface DeleteSiteButtonProps {
  item: Site;
}

export function DeleteSiteButton(props: DeleteSiteButtonProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const item = props.item;

  const deleteSite = async () => {
    try {
      setLoading(true);
      const response = await services.deleteSite({ siteId: item?._id, userId: auth?._id });
      if (response?.responseCode === 200) {
        displaySuccess('Success', 'Deleted Site');
        navigate({ pathname: './../' });
      } else {
        return displayError({ title: 'Error', message: 'Failed to delete' });
      }
    } catch (err: any) {
      displayError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline-danger"
      style={{ width: 125 }}
      onClick={() =>
        confirmDialog({
          onConfirm: deleteSite,
          title: `Delete ${item.name}?`
        }).catch((err) => {
          displayError(err);
        })
      }>
      {loading ? (
        <Spinner animation="border" size="sm" />
      ) : (
        <div className="d-flex align-items-center justify-content-center">
          <FaTrash className="mx-1" />
          Delete
        </div>
      )}
    </Button>
  );
}
