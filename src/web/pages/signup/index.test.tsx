import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Signup } from '.';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../../context/AuthProvider';

let container: any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container!);
  container!.remove();
  container = null;
});

describe('Sign up component tests', () => {
  it('Signup component renders without any errors', () => {
    act(() => {
      render(
        <Router>
          <AuthProvider>
            <Signup />
          </AuthProvider>
        </Router>,
        container
      );
    });
    expect(container.textContent).toEqual(
      'Sign UpUsernameEmailPasswordSign UpAlready registered?Login'
    );
  });
});
