import { render } from '@testing-library/react';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { MemoziedConfirmationModal } from './ConfirmationModal';
import React from 'react';

describe('MemoziedBackButton', () => {
    let value: number;

    beforeAll(() => {
        value = 35;
    });

    it('renders', () => {
        const { queryAllByText } = render(
            <MemoziedConfirmationModal
                title="Delete"
                buttonIcon={faTrashCan}
                handleSubmit={(event: React.MouseEvent<HTMLButtonElement>) => {
                    console.log(event);
                }}
            />
        );
        expect(queryAllByText(`${value}%`)).toHaveLength(1);
    });
});
