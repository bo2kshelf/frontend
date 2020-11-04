import {Meta, Story} from '@storybook/react/types-6-0';
import clsx from 'clsx';
import React from 'react';
import {Component, ComponentProps} from '.';

export default {
  title: 'Navbar',
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;
const Template: Story<ComponentProps> = ({...args}) => <Component {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  className: clsx('w-full'),
  profile: {
    displayName: 'SnO₂WMaN',
    name: 'SnO2WMaN',
    picture: 'https://avatars3.githubusercontent.com/u/15155608?v=4',
  },
};
