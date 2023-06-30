import { StoryFn, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { faRecycle, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { MemoziedConfirmationModal } from './ConfirmationModal';

export default {
    title: 'ConfirmationModal',
    component: MemoziedConfirmationModal,
    tags: ['autodocs'],
} as Meta<typeof MemoziedConfirmationModal>;

const Template: StoryFn<typeof MemoziedConfirmationModal> = (args) => (
    <BrowserRouter>
        <MemoziedConfirmationModal {...args} />
    </BrowserRouter>
);

export const DefaultCircularProgressWithLabel = Template.bind({});
DefaultCircularProgressWithLabel.args = {
    title: 'Delete',
    buttonIcon: faTrashCan,
    handleSubmit: () => {
        console.log('Delete successfully!');
    },
};

export const CircularProgessWithLabelInheritColor = Template.bind({});
CircularProgessWithLabelInheritColor.args = {
    title: 'Re-Index',
    buttonIcon: faRecycle,
    handleSubmit: () => {
        console.log('Re-Index successfully!');
    },
};
