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

const containerElementName = 'heroSearchReact';

@Component({
  selector: 'hero-search-react',
  template: `<span #${containerElementName}></span>`,
  encapsulation: ViewEncapsulation.None,
})


export class HeroSearchReactWrapper implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild(containerElementName, { static: true }) containerRef!: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    ReactDOM.unmountComponentAtNode(this.containerRef.nativeElement);
  }

  private render() {
    const root = createRoot(this.containerRef.nativeElement);
    root.render(
      <React.StrictMode>
        <div>
          <HeroSearchReact />
        </div>
      </React.StrictMode>
      );
  }
}
