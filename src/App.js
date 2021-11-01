import React, { useEffect, useState } from "react";
import "./App.css";
import tmdb from "./tmdb";

import MovieRow from "./components/MovieRow/";
import FeaturedMovie from "./components/FeaturedMovie/";
import Header from "./components/Header/";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);

  const [blackHeader, setBlackHeader] = useState(false);

  //Pega os dados dos filmes
  useEffect(() => {
    const loadAll = async () => {
      //pegando a lista total
      let list = await tmdb.getHomeList();
      setMovieList(list);

      //pegando o filme em destaque
      let originals = list.filter((i) => i.slug === "originals"); //filtrando pelo slug "originals"
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      ); //pega um numero aleatorio entre 0 e o tamanho do array
      let chosen = originals[0].items.results[randomChosen]; //pega o filme escolhido

      let chosenInfo = await tmdb.getMovieInfo(chosen.id, "tv"); //pega as informações do filme/serie

      setFeaturedData(chosenInfo);
    };
    loadAll();
  }, []);

  //observa o scroll do navegador e atualiza o estado do header
  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 50) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />

      {/*pega o filme em destaque */}
      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} /> //tras os filmes baseado no titulo e no ITEMS dentro do tmdb.js
        ))}
      </section>

      <footer>
        Feito por{" "}
        <a href="https://rxrichard.github.io/" target="_blank">
          <strong>Richard Bastos</strong>
        </a><br/>
        Direitos de imagem para{" "}
        <a href="https://www.netflix.com/" target="_blank">
          <strong>Netflix</strong>
        </a><br/>
        Dados pegos do site{" "}
        <a href="https://www.themoviedb.org/" target="_blank">
          <strong>The Movie DB</strong>
        </a>
      </footer>
      
      {/*SISTEMA DE CARGA DO LOADING */}
      {movieList.length === 0 && <div className='loading'>
          <img src='https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif' alt='Carregando'/>
      </div>}

      
    </div>
  );
};
