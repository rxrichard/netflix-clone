import React from "react";
import "./FeaturedMovie.css";

export default ({ item }) => {
  console.log(item);
  let firstDate = new Date(item.first_air_date);

  let genres =[];

  for (let i in item.genres) {
    genres.push(item.genres[i].name);
  }


  let description = item.overview;

  if (description.length > 200) {
    description = description.substring(0, 200) + "...";
  }

  return (
    <section
      className="featured"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.backdrop_path})`,
      }}
    >
      <div className="featured--vertical">{/*somente cria a sombra vertical */}

        <div className="featured--horizontal">
          <div className="featured--name">{item.name}</div>
          {/*pega o nome */}
          <div className="featured--info">
            <div className="featured--points">{item.vote_average} pontos</div>
            {/*pega a pontuacao */}
            <div className="featured-year">{firstDate.getFullYear()}</div>
            {/*pega o ano */}
            <div className="featured--seasons">
              {item.number_of_seasons} temporada{/*pega nº temporadas */}
              {item.number_of_seasons === 1 ? "" : "s"}{" "}
              {/*verifica se tem 1 ou + temporadas para colocar o S */}
            </div>

            <div className="featured--description">{description}</div>
            {/*pega a descricao */}

            <div className="featured--buttons">
                <a className='featured--watchButton' href={`/watch/${item.id}`}> ► Assistir </a>
                <a className='featured--myListButton'href={`/list/add/${item.id}`}> + Minha lista </a>
            </div>
            {/*botoes de assistir, adicionar, favoritos */}

            <div className="featured--genres"><strong>Generos: </strong>{genres.join(', ')}</div>
            {/*pega os generos */}
          </div>
        </div>
      </div>
    </section>
  );
};
