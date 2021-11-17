import { useState, useEffect } from  'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { addEpisodeData, loadEpisodeData, saveEpisode } from './episodeData.slice';
import { next as nextPage} from '../global/global.slice';



export default function EpisodeData({userId=1}) {
  const data = useSelector(state => state.episodeData);
  console.log({data})
  const { episodeData } = data;
  const [nombre, setNombre] = useState(episodeData.name);
  const [episodio, setEpisodio] = useState(null);
  
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadEpisodeData(userId));
  }, [userId]);


  const next = () => {
    console.log({
      nombre,
      episodio,
     
    })
    if(nombre && episodio) {
      dispatch(addEpisodeData({
        nombre,
        episodio,
       
      }));
      dispatch(nextPage());
    } else {
      setMessage("Faltan capmos por completar")
    }
  };
  const onSubmit = (values) => {
    window.alert(JSON.stringify(values, undefined, 2));
    setNombre(values.name);
    setEpisodio(values.episode);
   

    dispatch(saveEpisode(values));
    return {
      [FORM_ERROR]: "Fallo el submit"
    }
  };


  
  return <section>
            {message && <span style={{color: 'red'}}>{message}</span>}
            <Form
              onSubmit={onSubmit}
              initialValues={{}}
              validate={(values) => {
                const errors = {};
                if(!values.name) {
                  errors.name = "Este campo es requerido";}

                if(!values.episode) {
                  errors.episode = "Este campo es requerido";}    
               
              }}
              render={({ handleSubmit, form, submitting, submitError }) => (

                    <form onSubmit={handleSubmit}  >
                      {submitError && <div style={{color: 'red'}}>{submitError}</div>}
                      <div>
                        <Field name="name" component="input">
                          {({ input, meta }) => (
                            <div>
                              <label>Name: </label>
                              <input {...input} type="text" placeholder="nombre..." />
                              {meta.error && meta.touched && <span style={{color: "red"}}>{meta.error}</span>}
                              {meta.submitError && <span style={{color: "red"}}>{meta.submitError}</span>}
                            </div>
                          )}
                        </Field>
                      </div>

                      <div  >
                        <Field name="episode" component="input">
                          {({ input, meta }) => (
                            <div>
                              <label>Episode: </label>
                              <input {...input} type="text" placeholder="episodio..." />
                              {meta.error && meta.touched && <span style={{color: "red"}}>{meta.error}</span>}
                              {meta.submitError && <span style={{color: "red"}}>{meta.submitError}</span>}
                            </div>
                          )}
                        </Field>
                      </div>
                      <div>
                        <button type="submit" disabled={submitting}>
                          Enviar
                        </button>
                        <button
                          type="button"
                          onClick={form.reset}
                          disabled={submitting}>
                          Borrar
                        </button>
                      </div>
                      
                    </form>
            )} />
            <button onClick={next} >Siguiente</button>
          
          </section>
}

