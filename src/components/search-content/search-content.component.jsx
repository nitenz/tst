import React from 'react';
import './search-content.styles.scss';
import Form from 'react-bootstrap/Form';

const SelectComponent = ({ optionsList, handleClick}) => (
  <div className="select-component">
    <Form >
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Movie List</Form.Label>
            <Form.Control onChange={handleClick} as="select" custom>
            <option defaultValue>Select movie</option>
              {
                optionsList.map((item) =>(
                  <optgroup key={item.id} label={item.type}>
                    {
                        item.videoList.map((movie) => (
                          <option key={movie.id} >{movie.name}</option>
                        ))
                    }
                  
                  </optgroup>
                ))
              }
            </Form.Control>
        </Form.Group>
        </Form>
  </div>
)

export default SelectComponent;
