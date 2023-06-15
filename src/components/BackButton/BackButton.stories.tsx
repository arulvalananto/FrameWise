import { StoryFn, Meta } from '@storybook/react';

import MemoziedBackButton from '.';
import { BrowserRouter } from 'react-router-dom';

export default {
    title: 'BackButton',
    component: MemoziedBackButton,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'input' },
    },
} as Meta<typeof MemoziedBackButton>;

const Template: StoryFn<typeof MemoziedBackButton> = (args) => (
    <BrowserRouter>
        <MemoziedBackButton {...args} />
    </BrowserRouter>
);

export const RedirectToMainPage = Template.bind({});
RedirectToMainPage.args = {
    title: 'Go Back',
    to: '/',
    className: '',
};

export const RedirectToLibrary = Template.bind({});
RedirectToLibrary.args = {
    title: 'Go Back To Library',
    to: '/library',
    className: '',
};
