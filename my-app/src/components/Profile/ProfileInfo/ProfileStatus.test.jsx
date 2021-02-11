import React from 'react';
import ProfileStatus from './ProfileStatus';

test("after creation <span> should be displayed", ()=>{
const component=create(<ProfileStatus status='it-kamasutra'/>);
const root=component.root;
let span=root.findByType("span");
expect(span).not.toBeNull();
});


test2("after creation <span> should be displayed", ()=>{
  const component=create(<ProfileStatus status='it-kamasutra'/>);
  const root=component.root;
  let span=root.findByType("span");
  expect(span).not.toBeNull();
  });
  
  