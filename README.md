# GifsApp02

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.5.

# Project Creation

Although this example is created with `Angular 17`, a modular architecture will be used for the time being.

```bash
$> ng new gifs-app-02 --no-standalone
```

The innovation of not using modules is postponed to future examples.

# Project structure

As indicated in the previous point, functional modules will be defined (which can be executed independently)

* `gifs`: Module containing everything related to GIFs
* `shared`: Common elements to more than one module

How to create a module? From the root of the project

```bash
$> ng g m gifs
CREATE src/app/gifs/gifs.module.ts (202 bytes)
$> ng generate module shared
CREATE src/app/shared/shared.module.ts (204 bytes)
```

How to create components? From the `app` directory

```bash
$> ng g component shared/components/sidebar
CREATE src/app/shared/components/sidebar/sidebar.component.html (23 bytes)
CREATE src/app/shared/components/sidebar/sidebar.component.spec.ts (631 bytes)
CREATE src/app/shared/components/sidebar/sidebar.component.ts (213 bytes)
CREATE src/app/shared/components/sidebar/sidebar.component.css (0 bytes)
UPDATE src/app/shared/shared.module.ts (304 bytes)
```

This generates the Sidebar component within the `shared` module.

Another example is: 

```bash
$> ng g component gifs/pages/home-page
CREATE src/app/gifs/pages/home-page/home-page.component.html (25 bytes)
CREATE src/app/gifs/pages/home-page/home-page.component.spec.ts (639 bytes)
CREATE src/app/gifs/pages/home-page/home-page.component.ts (220 bytes)
CREATE src/app/gifs/pages/home-page/home-page.component.css (0 bytes)
UPDATE src/app/gifs/gifs.module.ts (384 bytes)
```

# View Child Decorator

This decorator allows to collect HTML elements from the component.

For example: given an `input` identified as `txtTagInput`, you want to collect its `value` and print it by console when `Enter` is pressed. The `@ViewChild` decorator allows you to retrieve the `HTML` element in the `TS`.

```typescript
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  searchTag () {
    const newTag = this.tagInput.nativeElement.value;
    console.log({ newTag });
  }

}
```

```html
<input type="text"
  class="form-control"
  placeholder="Buscar gifs..."
  (keyup.enter)="searchTag()"
  #txtTagInput
>	
```

It is important to see how `TS` and `HTML` are interdependent.

# Services

The **services** enable data management. In this case, they are created at module level and their basic structure is simple:

```typescript
@Injectable({providedIn: 'root'})
export class GifsService {
  constructor() { }
}
```

After this, a stream can be set up to carry the value of an `HTML` element (an `imput` for example), to an array that exists in the `Service`.

```typescript
@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagsHistory: string[] = [];

  constructor() { }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  public searchTag(tag: string) : void {
    this._tagsHistory.unshift(tag);
  }
}
```

```typescript
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService) { }

  searchTag () {
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
  }

}
```

> NOTE:** the `unshift` method is an `js` method that adds element to an array.
> NOTE:** the `...` operator is known as a **spread operator. It basically copies the contents of a variable into a new variable, instead of returning the variable by reference.

**And how to call the content of that service?** The component that needs it, must declare the service in its constructor.

```typescript
export class SidebarComponent {
  constructor(private gifsService: GifsService) {};
}
```

You can now make use of it:

```typescript
export class SidebarComponent {

  constructor(private gifsService: GifsService) {};

  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }
}  
```

---
---
---

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
