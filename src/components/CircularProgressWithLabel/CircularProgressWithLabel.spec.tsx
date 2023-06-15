import { render } from '@testing-library/react';

import { CircularProgressWithLabel } from './CircularProgressWithLabel';

describe('MemoziedBackButton', () => {
    let value: number;

    beforeAll(() => {
        value = 35;
    });

    it('renders', () => {
        const { queryAllByText } = render(
            <CircularProgressWithLabel value={value} />
        );
        expect(queryAllByText(`${value}%`)).toHaveLength(1);
    });
});
