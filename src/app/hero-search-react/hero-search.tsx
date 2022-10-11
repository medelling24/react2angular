import * as React from 'react';
import { FunctionComponent, useEffect, useRef, useState, useMemo } from 'react';
import { debounce } from 'lodash';

import {Hero} from "../hero";
import './hero-search.component.css'
import {HeroService} from "../hero.service";

export interface IHeroSearchProps {
  heroService: HeroService,
}


const HeroSearchReact: FunctionComponent<IHeroSearchProps> = (props: IHeroSearchProps) => {
  const [heroes, setHeroes] = useState([])
  const [term, setTerm] = useState(null)

  const debouncedData = debounce((term) => {
    props.heroService.searchHeroes(term).subscribe((heroes: Hero[]) => {
      // @ts-ignore
      setHeroes(heroes)
    });
  }, 300)

  useEffect(() => {
    if (term) {
      debouncedData(term);
    } else {
      setHeroes([])
    }
  }, [term]);

  const handleClick = (id: any) => {
    return id;
  }

  const handleChange = ($event: any) => {
    setTerm($event.target.value);
  }

  const renderHeroes = useMemo(() => {
    return heroes.map((h: Hero) => {
      return (
        <li key={h.id}>
          <a onClick={() => handleClick(h.id)}>
            {h.name}
          </a>
        </li>
      )
    })
  }, [heroes])

  return (
    <div id="search-component">
      <label>Hero Search React</label>
      <input id="search-box" onChange={handleChange} value={term || ''} />
      <ul className="search-result">
        {renderHeroes}
      </ul>
    </div>
  );
}




export default HeroSearchReact;
