import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Login } from '.';
import { BrowserRouter as Router } from 'react-router-dom';

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

describe('Login component tests', () => {
  it('Login component renders without any errors', () => {
    act(() => {
      render(
        <Router>
          <Login />
        </Router>,
        container
      );
    });
    expect(container.textContent).toEqual('Log inUsernamePasswordLoginNot registered?Sign up');
  });
});
