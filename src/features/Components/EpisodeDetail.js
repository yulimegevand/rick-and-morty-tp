import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import CharacterList from './CharacterList';


export default function EpisodeDetail(props) {

    const { id } = useParams();
    const [episode, setEpisode] = useState(null);

    useEffect(() => {
        (async () => {

            const Response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`)
                .catch(e => {

                });


            if (Response && Response.status === 200) {
                const  episodeInfo  = Response.data;
                setEpisode(episodeInfo);
            } else {
                setEpisode(null);
            }
        })();




    }, [id]);

    return <div>
        
        <h4>Detalle del Episodio nro {id}</h4>
        {episode && <React.Fragment>
            <h5>Nombre: {episode.name}</h5>
            <h5>Estreno: {episode.air_date}</h5>
            <h5>Episodio: {episode.episode}</h5>
            <CharacterList characters= {episode.characters}/>
        </React.Fragment>
        }
       
    </div>
}