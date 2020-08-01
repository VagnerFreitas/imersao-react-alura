import React, { useState, useEffect } from 'react';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoriasRepository from '../../../repositories/categorias';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  };

  const [categorias, setCategorias] = useState([]);

  const { handleChange, values, clearForm } = useForm(valoresIniciais);

  useEffect(() => {
    categoriasRepository.getAllWithVideos()
      .then((resposta) => {
        setCategorias([...resposta]);
      });
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {values.nome}
      </h1>

      <form onSubmit={function handleSubmit(e) {
        e.preventDefault();
        setCategorias([
          ...categorias,
          values,
        ]);
        clearForm();
      }}
      >
        <FormField
          label="Nome da Categoria"
          type="text"
          name="nome"
          value={values.nome}
          onChange={handleChange}
        />

        <FormField
          label="Descrição:"
          name="descricao"
          type="textarea"
          value={values.descricao}
          onChange={handleChange}
        />
        <FormField
          label="Cor:"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />
        <Button>
          Cadastrar
        </Button>
      </form>
      {categorias.length === 0 && (
        <div>
          Loading...
        </div>
      )}

      <ul>
        {categorias.map((categoria, indice) => (
          <li key={`${categoria.nome}${indice}`}>
            {categoria.nome}
          </li>
        ))}
      </ul>
    </PageDefault>
  );
}

export default CadastroCategoria;
