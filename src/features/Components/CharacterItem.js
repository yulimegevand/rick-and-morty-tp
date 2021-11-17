import React from 'react';



export default function CharacterItem({ character }) {
  

  return <React.Fragment>
        <tr>
          <td>{character.name}</td>
        </tr>
        </React.Fragment>
}