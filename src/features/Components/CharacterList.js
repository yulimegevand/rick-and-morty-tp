import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import CharacterItem from './CharacterItem';
import EpisodeData from '../episodeData/EpisodeData';


export default function CharacterList(props) {
    
  const position = useSelector( state => state.global.position );
    
    
    const [character, setCharacter] = useState([]); 
    const [url, setUrl] = useState('https://rickandmortyapi.com/api/character');
    const [message, setMessage] = useState(null);
    
    useEffect( () => {
     
        (async () => {
          const Response = await axios.get(url)
                                      .catch(e => {
                                        setMessage("Ocurrio un error...");
                                        setCharacter([]);
                                      });
  
          if(Response && Response.status === 200) {
            const {results } = Response.data;
            setCharacter([
              ...results,
            ]);
          } else {
            setMessage("Ocurrio un Error en el llamado REST!");
            
            setCharacter([]);
          }
        })();
  
      }
      , [url]);
  


    return <div>
        {position === 0 &&  <EpisodeData />}
        <h4>Personajes: </h4>
        <table border={1}>
        <tr>
            <th>Nombre:</th>
            
        </tr>
        {character.map(c => < CharacterItem key={c.id} character={c}/>)}
        </table>
        
        

    </div>
}
