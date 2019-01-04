class Element {
  constructor(element, attributes = [], textContent = "", parent = document.querySelector(".app"), actions = []) {
    this.element = document.createElement(element);
    this.type = element;
    this.attributes = attributes;
    this.textContent = textContent;
    this.parent = parent;
    this.actions = actions;
  }

  render() {
    if (this.attributes.length > 0) {
      this.attributes.forEach(attr => {
        this.element.setAttribute(attr.type, attr.value);
      });
    }
    if(this.textContent !== ""){
      if (
        this.type !== "area" ||
        this.type !== "base" ||
        this.type !== "br" ||
        this.type !== "col" ||
        this.type !== "embed" ||
        this.type !== "hr" ||
        this.type !== "img" ||
        this.type !== "input" ||
        this.type !== "link" ||
        this.type !== "meta" ||
        this.type !== "param" ||
        this.type !== "source" ||
        this.type !== "track" ||
        this.type !== "wbr"
      ) {
        this.element.textContent = this.textContent;
      }
    }
    if(this.actions.length !== 0){
      this.actions.forEach(action => {
        this.element[`on${action.event}`] = (e) => {
          action.callback(action.params);
        }
      });
    }
    this.parent.appendChild(this.element);
  }
}

class InnerHTML{
  constructor(parent, elements){
    this.parent = parent;
    this.elements = elements;
  }

  render(){
    this.parent.innerHTML += this.elements;
  }
}

class Component {
  constructor(container, parent = document.querySelector("body"), root = {}) {
    this.container = document.createElement(container);
    this.parent = parent;
    this.root = root;
    this.queue = [];
    this.components = new Tree();
    this.setComponentId();
  }

  addAction(){
    
  }

  addAttributeToContainer(container, options) {
    Object.keys(options).forEach(attr => {
      container.setAttribute(attr, options[attr]);
    })
  }

  addComponent(component) {
    this.components.addComponent(component);
    this.queue.push(component);
  }

  addElement(element) {
    this.queue.push(new Element(element.element, element.attributes, element.textContent, element.parent, element.actions, element.innerHTML));
  }

  addInnerHTML(elements) {
    this.queue.push(new InnerHTML(this.container, elements));
  }

  arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length)
      return false;
    for (var i = arr1.length; i--;) {
      if (arr1[i] !== arr2[i])
        return false;
    }
    return true;
  }

  callSelf() {
    return this;
  }

  async componentDidMount() { }

  async componentDidUnmount() { }

  getColorScheme(num){
    if(Object.keys(this.traveler("00:", this).store.colors).length < num){
      return;
    }
    return this.traveler("00:", this).store.colors[`scheme${num}`]
  }

  getMatchingElements(match) {
    return this.queue.filter(element => element.constructor.name === match);
  }

  getParent() {
    return this.parent;
  }

  getComponentId() {
    return this.components.componentId;
  }

  getRoot() {
    return this.root;
  }

  queueReducer(){}

  reBuild() {
    this.container.innerHTML = "";
    this.queue.forEach(elem => {
      elem.render(this.container);
    })
  }

  render() {
    this.queue.forEach(elem => {
      elem.render(this.container);
    });
    this.parent.appendChild(this.container);
  }

  setComponentId(change) {
    if (this.getRoot() === "root") {
      return this.components.componentId = "00:"
    }
    if (change) {
      return change;
    }
    this.components.componentId = `${this.getRoot().components.componentId}${(this.getRoot().components.nodes + 1)}||`
  }

  setInitState(state) {
    this.state = state;
    this.sendToStore({
      items: state,
      queues: []
    });
  }

  sendToStore(item) {
    this.traveler("00:", this.callSelf()).store[`${this.constructor.name}${this.getComponentId()}`] = item;
  }

  storeQueue(action, caller, target, queue){
    if(!this.traveler("00:", this.callSelf()).store[`${this.constructor.name}${this.getComponentId()}`]){
      this.traveler("00:", this.callSelf()).store[`${this.constructor.name}${this.getComponentId()}`] = {
        item: {},
        queues:[]
      };
    }
    this.traveler("00:", this.callSelf()).store[`${this.constructor.name}${this.getComponentId()}`].queues.push({ action, caller, target, queue });  
  }

  traveler(componentId, currentRoute = this, reachedRoot = false) {
    //Found right location
    if (componentId === currentRoute.getComponentId() && reachedRoot === true) {
      return currentRoute;
    }
    //traveling down the tree
    if (componentId !== currentRoute.getComponentId() && reachedRoot === true) {
      //1||2
      console.log(`Travelilng down the tree`);
      const ending = componentId.split(":")[1];
      //""
      const current = currentRoute.getComponentId().split(":")[1];
      //["1", "2"]
      // console.log(ending);
      // console.log(current);
      const splitEnding1 = ending.split("||");
      // console.log(`Array of the target:`);
      // console.log(splitEnding1);
      //["1"]
      const splitCurrent1 = current.split("||");
      // console.log(`Array of the current route:`)
      // console.log(splitCurrent1);
      const nextRoute = splitEnding1[splitCurrent1.length-1];
      // console.log(currentRoute.components.tree[`node${nextRoute}`]);
      // console.log(splitCurrent1.length);
      // console.log(nextRoute);
      return this.traveler(componentId, currentRoute.components.tree[`node${nextRoute}`], true);
    }
    //At route which is its destination
    if (componentId === "00:" && currentRoute.getComponentId() === "00:" && reachedRoot === false) {
      return currentRoute;
    }
    //At route, switching from moving up the tree to down the tree
    if (currentRoute.getComponentId() === "00:" && componentId !== "00:" && reachedRoot === false) {
      const ending = componentId.split(":")[1];
      const splitEnding1 = ending.split("||");
      return this.traveler(componentId, this.components.tree[`node${splitEnding1[ending[0]]}`], true);
    }
    //traveling up the tree
    if (componentId !== currentRoute.getComponentId() && reachedRoot === false) {
      const ending = componentId.split(":")[1];
      const current = currentRoute.getComponentId().split(":")[1];
      const splitEnding1 = ending.split("||");
      const splitCurrent1 = current.split("||");
      const splitCurrent2 = splitCurrent1.slice(0, splitCurrent1.length - 2);
      const splitEnding2 = splitEnding1.slice(0, splitCurrent1.length);
      if (ending.length !== 0 && current.length !== 0 && splitEnding2.join("||") === splitCurrent2.join("||")) {
        return this.traveler(componentId, this.components.tree[`node${splitEnding1[splitEnding2.length]}`], true);
      }
      return this.traveler(componentId, currentRoute.getRoot(), false);
    }
  }

  unmountComponent(num){
    const emptyObject = {};
    if(this.queue.length < num || num < 0){
      console.error(`Your call to remove a component failed because they were not able to find component. The parameter you provided did not return an element in the queue`);
      return;
    }
    this.queue[num] = emptyObject;
  }
}

class Tree {
  constructor(id) {
    this.componentId = id
    this.nodes = 0;
    this.tree = {};
  }

  addComponent(component) {
    this.tree[`node${this.nodes + 1}`] = component;
    this.nodes++;
  }

  removeComponent() { }

  findComponent(id) {
    Object.keys(this.tree).filter(component => {
      if (this.tree[component].components.componentId === id) {
        return true;
      }
    });
  }
}

class Store {
  constructor() { 
    this.schemes = 0;
    this.colors = {};
  }

  addAction(action = {}){

  }

  dispatch(){}

  getState(componentId){}

  storeItem(id, state) {
    this.items[id] = state;
  }

  storeQueue(id, queue){
    // this[id].
  }

  setColorScheme(color){
    this.schemes++;
    this.colors[`scheme${this.schemes}`] = color;
  }
}

class Init extends Component {
  constructor() {
    super(null, document.querySelector("body"), "root");
    this.container = document.querySelector(".root");
    this.store = new Store();
  }
}