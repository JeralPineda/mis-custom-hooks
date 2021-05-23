import { useEffect, useRef, useState } from 'react';

export const useFetch = (url) => {
   // Para desmontar y que no renderise
   /*
   Cuando le damos click al btn show/hiden y carga el loading y si lo cancelamos antes
   de que cargue el componente de los quotes lanza un error
   con useRef lo prevenimos
   */

   const isMouted = useRef(true);

   const [state, setState] = useState({ data: null, loading: true, error: null });

   useEffect(() => {
      return () => {
         isMouted.current = false;
      };
   }, []);

   useEffect(() => {
      //    Para que cargue el loading en cada petición
      setState({ data: null, loading: true, error: null });

      fetch(url)
         .then((resp) => resp.json())
         .then((data) => {
            if (isMouted.current) {
               setState({
                  loading: false,
                  error: null,
                  data,
               });
            }
         })
         .catch(() => {
            setState({
               data: null,
               loading: false,
               error: 'No se pudo cargar la info',
            });
         });
   }, [url]);

   return state;
};
