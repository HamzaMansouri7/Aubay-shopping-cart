import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    Input,
    QueryList,
    TemplateRef,
    ViewChild,
  } from '@angular/core';

  import { ForProductDirective } from '../../core/directives/for-product.directive';
  import { Product } from '../../core/interfaces/product.interface';

  @Component({
    selector: 'products-list',
    templateUrl: 'products-list.component.html',
    styleUrls: ['products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
  })
  export class ProductsListComponent implements AfterContentInit {
    @ViewChild(ForProductDirective, { read: ForProductDirective, static: true }) defaultTemplate: ForProductDirective;

    @ContentChildren(ForProductDirective, { read: ForProductDirective }) productContainers = new QueryList<ForProductDirective>();

    @Input() products: Product[];

    templates: { [type: string]: TemplateRef<any> } = {};

    constructor() {}

    ngAfterContentInit(): void {
      this.productContainers.forEach(container => {
        this.templates[container.forProductOfType] = container.template;
      });
      if (this.templates['default']) {
        this.defaultTemplate.template = this.templates['default'];
      }
    }


    getTemplate(product: Product): TemplateRef<any> {
      let template: TemplateRef<any> = this.templates[product.type];
      if (!template) {
        template = this.defaultTemplate.template;
      }
      return template;
    }

    getContext(product: Product) {
      return {
        $implicit: product,
      };
    }
  }
