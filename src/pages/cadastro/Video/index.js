import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import useForm from '../../../hooks/useForm';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';

function CadastroVideo() {
  const history = useHistory();
  const { values, handleChange } = useForm({
    titulo: 'E lá vamos nós',
    url: 'https://www.youtube.com/watch?v=Kwrfc4HghBA',
    categoria: 'front-end',
  });
  const [categorias, setCategorias] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);
  useEffect(() => {
    categoriasRepository.getAll()
      .then((response) => {
        setCategorias(response);
      });
  }, []);
  return (
    <PageDefault>
      <h1>Cadastro de Vídeos</h1>
      <form onSubmit={(event) => {
        event.preventDefault();
        const categoriaEscolhida = categorias.find((categoria) => categoria.titulo === values.categoria);
        videosRepository.create({
          titulo: values.titulo,
          url: values.url,
          categoriaId: categoriaEscolhida.id,
        }).then(() => {
          history.push('/');
        });
      }}
      >
        <FormField
          label="Titulo do Vídeo"
          type="text"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />
        <FormField
          label="URL"
          type="text"
          name="url"
          value={values.url}
          onChange={handleChange}
        />
        <FormField
          label="Categoria"
          type="text"
          name="categoria"
          value={values.categoria}
          onChange={handleChange}
          suggestions={categoryTitles}
        />
        <Button type="submit">
          Cadastrar
        </Button>
      </form>
    </PageDefault>
  );
}

export default CadastroVideo;
