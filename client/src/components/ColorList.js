import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from '../utils/axiosWithAuth'
import '../styles.scss'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    console.log(colorToEdit)

    axiosWithAuth().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
                      .then(res=> {

                        axiosWithAuth().get('/api/colors')
                                          .then(res=> {

                                            updateColors(res.data)

                                          })
                                          .catch(err=> {

                                            console.log(err)

                                          })

                      })

  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`/api/colors/${color.id}`)
                      .then(res=> {

                        axiosWithAuth().get('/api/colors')
                                          .then(res=> {

                                            updateColors(res.data)

                                          })
                                          .catch(err=> {

                                            console.log(err)

                                          })
                        

                      })
                      .catch(err=> {

                        console.log(err)

                      })

  };

  const addColor = (e) => {


    e.preventDefault()

    axiosWithAuth().post('/api/colors', newColor)
                      .then(res=> {

                        setNewColor(initialColor)

                        axiosWithAuth().get('/api/colors')
                                          .then(res=> {

                                            updateColors(res.data)

                                          })
                                          .catch(err=> {

                                            console.log(err)

                                          })

                      })
                      .catch(err=> {

                        console.log(err)

                      })


  }

  const handleColor = (e) => {


    if(e.target.name !== 'hex')
    {

      setNewColor({...newColor, [e.target.name]: e.target.value})

    }
    else {

      setNewColor({...newColor, code: {hex: e.target.value}})

    }


  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}


      <div className="spacer" />
      
      {/* stretch - build another form here to add a color */}
      <form>
        <div className='add-color'>
        <p>Add a Color</p>
        <input onChange={handleColor} placeholder='...color name' type='text' name='color' value={newColor.color} />
        <input onChange={handleColor} placeholder='...hex' type='text' name='hex' value={newColor.code.hex}/>
        <button onClick={addColor}>Add Color</button>
        </div>
      </form>
      
    </div>
  );
};

export default ColorList;
