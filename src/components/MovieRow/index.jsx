import React,{useState} from "react";
import "./MovieRow.css";
import { NavigateBefore , NavigateNext } from '@material-ui/icons';

export default ({ title, items }) => {
  const [scrollX, setScrollX] = useState(-1040);
  
  
  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if(x > 0){
      x = 0;
    }
    setScrollX(x);
  };
  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listw = items.results.length * 208;
    if((window.innerWidth - listw) > x){
      x =( window.innerWidth - listw) - 60;
    }
    setScrollX(x);
  };

  return (
    <div className='movieRow'>
      <h2>{title}</h2>

      <div className="movieRow--before" onClick={handleLeftArrow}>
        < NavigateBefore style={{fontSize: 50}}/>
      </div>
      <div className="movieRow--next">
        <NavigateNext style={{fontSize: 50}}onClick={handleRightArrow}/>
      </div>
      <div className="movieRow--listarea">
        <div className="movieRow--list" style={{
            marginLeft: scrollX,
            width: items.results.length * 208

          }}>
          {items.results.length > 0 && //verifica se tem algum filme na lista
            items.results.map((item, key) => ( //se tiver filme, entao cria um map para cada filme
              <div key={key} className="movieRow--item">
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}//tras a imagem do filme
                  alt={item.title}//caso nao suba o filme vem o title do filme
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
