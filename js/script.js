class Header extends Component {
  constructor(props) {
    super("header", props.parent, props.root);
    this.addElement({
      element: "img",
      attributes: [
        { type: "src", value: "https://via.placeholder.com/120x120" },
        { type: "alt", value: "Logo" },
      ],
      textContent: "",
      parent: this.container
    });
    this.addElement({
      element: "div",
      attributes: [
        { type: "class", value: "title" }
      ],
      textContent: "Example Title",
      parent: this.container
    });
    this.addComponent(new Navigation({
      parent: this.container, links: {
        "link1": "Placeholder",
        "link2": "Placeholder",
        "link3": "Placeholder",
        "link4": "Placeholder",
      }, root: this
    }));
  }
}

class Navigation extends Component {
  constructor(props) {
    super("span", props.parent, props.root);
    this.setInitState({
      links: props.links
    });
    this.appendLinks(props.links);
  }

  appendLinks(links) {
    Object.keys(links).forEach(link => {
      this.addElement({
        element: "a",
        attributes: [],
        textContent: links[link],
        parent: this.container
      });
    });
  }
}

class Main extends Component {
  constructor(props) {
    super("main", props.parent, props.root);
    this.addElement({
      element: "p",
      attributes: [
        { type: "class", value: "about" }
      ],
      textContent: "",
      parent: this.container
    });
    this.addComponent(new PlaceholderImage({
      parent: this.container,
      root: this,
      class: "image375x375 parallax-section",
      id: "image1"
    }));
    this.addElement({
      element: "p",
      attributes: [],
      textContent: "",
      parent: this.container
    });
    this.addElement({
      element: "p",
      attributes: [],
      textContent: "",
      parent: this.container
    });
    this.addComponent(new PlaceholderImage({
      parent: this.container,
      root: this,
      class: "image375x375 parallax-section",
      id: "image2"
    }));
    this.addElement({
      element: "p",
      attributes: [],
      textContent: "",
      parent: this.container
    });
    this.addElement({
      element: "p",
      attributes: [],
      textContent: "",
      parent: this.container
    });
    this.addElement({
      element: "p",
      attributes: [],
      textContent: "",
      parent: this.container
    });
    this.addComponent(new Slider({
      parent: this.container,
      root: this,
      class: "slider",
      images: [
        { src: `http://localhost:8000/barber/images/barber-pole.jpg`, alt: "Barber Pole" },
        { src: `http://localhost:8000/barber/images/barber-pole.jpg`, alt: "Barber Pole" },
        { src: `http://localhost:8000/barber/images/barber-pole.jpg`, alt: "Barber Pole" },
        { src: `http://localhost:8000/barber/images/barber-pole.jpg`, alt: "Barber Pole" },
        { src: `http://localhost:8000/barber/images/barber-pole.jpg`, alt: "Barber Pole" },
      ]
    }));
    this.addElement({
      element: "p",
      attributes: [],
      textContent: "",
      parent: this.container
    });
    this.componentDidMount();
  }

  setText(num) {
    return this.state.texts[`text${num}`];
  }

  async componentDidMount() {
    fetch('http://localhost:8000/barber/text')
      .then(res => res.json())
      .then(data => {
        this.setInitState({
          texts: data
        });
        this.getMatchingElements("Element").forEach((element, index) => {
          element.textContent = this.state.texts[`text${index + 1}`];
        });
        this.reBuild();
      });
  }
}

class PlaceholderImage extends Component {
  constructor(props) {
    super("div", props.parent, props.root);
    this.addAttributeToContainer(this.container, {
      class: props.class,
      id: props.id
    });
  }
}

class Slider extends Component {
  constructor(props) {
    super("div", props.parent, props.root);
    this.images = 0;
    this.addAttributeToContainer(this.container, {
      class: "slider"
    });
    this.setSliderImages(props.images);
    this.addElement({
      element: "div",
      attributes: [
        { type: "class", value: "slider_button_1" }
      ],
      textContent: "",
      parent: this.container,
      actions: [
        {
          event: "click", callback: () => {
            this.getMatchingElements("Element").forEach(element => {
              if (element.element.tagName === "IMG") {
                const spot = element.element.className.split(" ")[1];
                let index = parseInt(spot.charAt(spot.length - 1));
                index = (index - 1 < 1) ? this.images : index - 1;
                element.element.classList.toggle(spot);
                element.element.classList.toggle(`spot${index}`);
              }
            })
          }
        }
      ]
    });
    this.addElement({
      element: "div",
      attributes: [
        { type: "class", value: "slider_button_2" }
      ],
      textContent: "",
      parent: this.container,
      actions: [
        {
          event: "click", callback: () => {
            this.getMatchingElements("Element").forEach(element => {
              if (element.element.tagName === "IMG") {
                const spot = element.element.className.split(" ")[1];
                let index = parseInt(spot.charAt(spot.length - 1));
                index = (index + 1 > this.images) ? 1 : index + 1;
                element.element.classList.toggle(spot);
                element.element.classList.toggle(`spot${index}`);
              }
            })
          }
        }
      ]
    });
  }

  setSliderImages(images) {
    images.forEach((image, index) => {
      this.images++;
      this.addElement({
        element: "img",
        attributes: [
          { type: "class", value: `spots spot1` },
          { type: "src", value: image.src },
          { type: "alt", value: image.alt }
        ],
        textContent: "",
        parent: this.container
      })
    });
  }
}

class Footer extends Component{
  constructor(props){
    super("footer", props.parent, props.root);
    // this.addComponent();
    // this.addComponent();
    // this.addComponent();
  }
}

class FooterContainer extends Component{
  constructor(props){
    super("div", props.parent, props.root);
    

  }
}

class App extends Init {
  constructor() {
    super();
    this.addComponent(new Header({ parent: this.container, root: this }));
    this.addComponent(new Main({ parent: this.container, root: this }));
    this.addComponent(new Footer({ parent: this.container, root: this}));
    this.render();
  }
}

(() => {
  const app = new App();
  console.log(app);
})();