import { render, screen } from '@testing-library/react';
import Home from './Home';

it('should render the Home view', () => {
  const { container } = render(<Home />);

  expect(container).toMatchSnapshot();
});
