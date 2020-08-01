import React, { useEffect, useState } from 'react';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import categoriasRepository from '../../repositories/categorias';
import PageDefault from '../../components/PageDefault';

function App() {
  const [dadosIniciais, setDadosIniciais] = useState([]);

  useEffect(() => {
    categoriasRepository.getAllWithVideos()
      .then((resposta) => {
        console.log(resposta);
        setDadosIniciais([...resposta]);
      }).catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <PageDefault paddingAll={0}>
      {dadosIniciais.length === 0 && (<div>Loading...</div>)}
      {dadosIniciais.length > 0 && (
        dadosIniciais.map((categoria, indice) => {
          if (indice === 0) {
            return (
              <div key={categoria.id}>
                <BannerMain
                  videoTitle={dadosIniciais[0].videos[0].titulo}
                  url={dadosIniciais[0].videos[0].url}
                  videoDescription={dadosIniciais[0].videos[0].titulo}
                />

                <Carousel
                  ignoreFirstVideo
                  category={dadosIniciais[0]}
                />
              </div>
            );
          }

          return (
            <Carousel
              key={categoria.id}
              category={categoria}
            />
          );
        })
      )}
    </PageDefault>
  );
}

export default App;
