import React from 'react';
import { useHistory } from 'react-router-dom';


export default function EpisodeItem({ episodes }) {
  const history = useHistory();

  const goTo = () => {
    history.push(`detail/${episodes.id}`);
  };

  return <React.Fragment>
        <tr>
          <td>{episodes.episode}</td>
          <td>{episodes.name}</td>
          <td><button onClick= {goTo}> Ver </button></td>
        </tr>
        </React.Fragment>
}