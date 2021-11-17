import React from 'react'
import EpisodeCreate from './EpisodeCreate'
import EpisodeData from './EpisodeData'
import EpisodesList from '../Components/EpisodesList';
import { useSelector} from 'react-redux';





export default function NewEpisode(props) {

   const position = useSelector( state => state.global.position );

    return<div>
        <h1>New</h1>

        {position === 0 &&  <EpisodeData />}
        {position === 1 &&  <EpisodeCreate />}
        {position === 2 &&   <EpisodesList />} 
        

    </div>
}