import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import EpisodeItem from './EpisodeItem';
import Pagination from './Pagination';
import { useSelector, useDispatch } from 'react-redux';
import {start}  from  '../global/global.slice';



export default function EpisodesList(props) {
    
    const EpisodeList = useSelector((state) => state.global.EpisodeList);
    const dispatch = useDispatch();
    console.log({EpisodeList});
    
    const history = useHistory();
    const goTo = () => {
        history.push(`episode-new`);
    } 
    const [episodes, setEpisodes] = useState([]); 
    const [url, setUrl] = useState('https://rickandmortyapi.com/api/episode');
    const [message, setMessage] = useState(null);
    const [info, setInfo] = useState(null);
    const [busqueda, setBusqueda]= useState("");
   
    const handleChange=e=>{
      setBusqueda(e.target.value);
      filtrar(e.target.value);
    }
    
    const filtrar=(terminoBusqueda)=>{
      var resultadosBusqueda=episodes.filter((elemento)=>{
        if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        || elemento.episode.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        ){
          return elemento;
        }
      });
      setEpisodes(resultadosBusqueda);
    }

    useEffect( () => {
     
      (async () => {
        const Response = await axios.get(url)
                                    .catch(e => {
                                      setMessage("Ocurrio un error...");
                                      setEpisodes([]);
                                    });

        if(Response && Response.status === 200) {
          const { info, results } = Response.data;
          setInfo(info);
          setEpisodes([
            ...results,
          ]);
        } else {
          setMessage("Ocurrio un Error en el llamado REST!");
          setInfo(null);
          setEpisodes([]);
        }
      })();

    }
    , [url]);

    const onPaginationPressedHandler = (newUrl)=> {
      console.log({newUrl})
      if(newUrl) {
        setUrl(newUrl);
      }
    };

    

    return <React.Fragment>
              {message && <span>{message}</span>}
              <button onClick={goTo}> New Episode </button>
              <div>
              <input
                value={busqueda}
                placeholder="Búsqueda por Nombre o Episodio"
                onChange={handleChange}
              />
              </div>
              <table border={1}>
              <tr>
                <th>Episodio</th><th>Nombre</th>
              </tr>
              {episodes.map(e => <EpisodeItem key={e.id} episodes={e} />)}
              </table>
              <Pagination info={info} onPrevPressed={onPaginationPressedHandler} onNextPressed={onPaginationPressedHandler} />
           </React.Fragment>;
}
