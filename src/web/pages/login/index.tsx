import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router';
import { InputBox } from '../../common/forms/InputBox';
import { FaExclamation } from 'react-icons/fa';
import { displaySuccess } from '../../../utils/toaster';
import { useAuth } from '../../../utils/hooks/useAuth';
import services from '../../../services';
import { LoginRequest } from '../../../services/users';

export function Login() {
  const { auth, saveAuth } = useAuth();

  if (auth?.username) {
    return <Navigate to="/logs" />;
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setError(null);
      setLoading(true);
      const body: LoginRequest = { username, password };
      const response = await services.loginUser(body);
      setLoading(false);
      if (response?.responseCode === 401 || response?.responseCode === 400) {
        return setError('Invalid Credentials');
      }
      if (response?.responseCode === 404) {
        return setError('User does not exist');
      }
      displaySuccess('Success', 'Login successful!');
      saveAuth(response?.data);
      navigate('/logs');
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  };

  return (
    <div className="background-container">
      <div className="outer">
        <div className="inner">
          <h3>Log in</h3>
          <Form onSubmit={handleLogin}>
            <InputBox label="Username" onChange={setUsername} value={username} required />
            <InputBox
              label="Password"
              type="password"
              onChange={setPassword}
              value={password}
              required
            />
            {error && (
              <>
                <hr className="my-2" />
                <Alert variant="danger" className="my-0 py-2">
                  <FaExclamation /> {error + ''}
                </Alert>
              </>
            )}
            <div className="text-center my-2">
              <Button disabled={loading} type="submit" className="btn btn-dark btn-block w-100">
                Login
              </Button>
            </div>
          </Form>
          <p className="change-mode text-right">
            Not registered?
            <span
              className="px-1"
              onClick={() => navigate('./../signup')}
              style={{ cursor: 'pointer' }}>
              <u>Sign up</u>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
