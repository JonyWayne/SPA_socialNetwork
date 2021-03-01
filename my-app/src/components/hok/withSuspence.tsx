import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';



export function withSuspence <WCP>(WrappedComponent:React.ComponentType<WCP>) {

  return (props:WCP)=> {
  return  <React.Suspense fallback={<div>Loading...</div>}> 
  <WrappedComponent {...props}/>
  </React.Suspense>
  }
} 