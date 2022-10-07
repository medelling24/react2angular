import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client";
import HeroSearchReact from './hero-search';
import {HeroService} from "../hero.service";
import {Hero} from "../hero";
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

const containerElementName = 'heroSearchReact';

@Component({
  selector: 'hero-search-react',
  template: `<span #${containerElementName}></span>`,
  encapsulation: ViewEncapsulation.None,
})


export class HeroSearchReactWrapper implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild(containerElementName, { static: true }) containerRef!: ElementRef;
  private root: any;

  constructor(private heroService: HeroService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.render();
  }

  ngAfterViewInit() {
    this.root = createRoot(this.containerRef.nativeElement);
    this.render();
  }

  ngOnDestroy() {
    ReactDOM.unmountComponentAtNode(this.containerRef.nativeElement);
  }

  private render() {
    this.root.render(
      <React.StrictMode>
        <div>
          <HeroSearchReact heroService={this.heroService} />
        </div>
      </React.StrictMode>
      );
  }
}
