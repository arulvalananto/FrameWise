import { StoryFn, Meta } from '@storybook/react';

import { MemoziedCircularProgressWithLabel } from './CircularProgressWithLabel';
import { BrowserRouter } from 'react-router-dom';

export default {
    title: 'Circular Progress With Label',
    component: MemoziedCircularProgressWithLabel,
    tags: ['autodocs'],
} as Meta<typeof MemoziedCircularProgressWithLabel>;

const Template: StoryFn<typeof MemoziedCircularProgressWithLabel> = (args) => (
    <BrowserRouter>
        <MemoziedCircularProgressWithLabel {...args} />
    </BrowserRouter>
);

export const DefaultCircularProgressWithLabel = Template.bind({});
DefaultCircularProgressWithLabel.args = {
    value: 50,
};

export const CircularProgessWithLabelInheritColor = Template.bind({});
CircularProgessWithLabelInheritColor.args = {
    value: 85,
    color: 'inherit',
};
