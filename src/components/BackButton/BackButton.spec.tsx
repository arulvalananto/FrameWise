import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { MemoziedBackButton } from './BackButton';

describe('BackButton', () => {
    let title: string, to: string;

    beforeAll(() => {
        title = 'Go back';
        to = '/';
    });

    it('renders', () => {
        const { queryAllByText } = render(
            <BrowserRouter>
                <MemoziedBackButton to={to} title={title} />
            </BrowserRouter>
        );
        expect(queryAllByText(title)).toHaveLength(1);
    });

    it('should navigate to specific location', () => {
        const { container } = render(
            <BrowserRouter>
                <MemoziedBackButton to={to} title={title} />
            </BrowserRouter>
        );
        container.click();
        expect(window.location.pathname).toEqual(to);
    });
});
