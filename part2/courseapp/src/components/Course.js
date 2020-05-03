import React, { Component } from 'react';
import Part from '../components/Part';

const Course = ({ course }) => {
  
    return (
      <div>
        <h1>{course.name}</h1>
        <h2>Content</h2>
        <ul>
          {course.parts.map(part =>
            <Part key={part.id} part={part}/>)}
        </ul>
        <p> total of {course.parts.reduce((sum,part) => {
          return sum+ part.exercises},0)}
          </p>
          <hr></hr>
      </div>
    )
  }



export default Course;