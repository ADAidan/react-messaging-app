import React from 'react';
import renderer from 'react-test-renderer';
import Message from '../src/components/Message';

it('displays the message', () => {
  const message = { 
    id: 1, 
    author: 'AidanDyer', 
    text: 'Hello, World!', 
    time: '10:00AM'
  };

  const component = renderer.create(<Message message={message} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});