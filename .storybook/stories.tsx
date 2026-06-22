export default {
  title: 'Example',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Button = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const HelloWorld = {
  render: () => <div>Hello World</div>,
};
