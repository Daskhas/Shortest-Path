//variable
let isNodePressed = false
let nodes=[]
let nodeValue= null
let edges=[]
let setSrc = false, toBeEdged= false
let src, dest





function setup(){
    canvas = createCanvas(window.innerWidth,window.innerHeight-100)
    canvas.position(0,99);
    canvas.mouseReleased(create)

    grid = createDiv()
    grid.attribute('class','grid')
    
    start = createDiv("Start ")
    start.attribute('class','startbox')
    grid.child(start)
    startsel = createSelect()
    startsel.attribute('class','startsel')
    start.child(startsel)

    dest = createDiv("Destination ")
    dest.attribute('class','destbox')
    grid.child(dest)
    destsel = createSelect()
    destsel.attribute('class','destsel')
    dest.child(destsel)

    //calculate button 
    calcbutton= createButton("Calculate")
    calcbutton.attribute('class','calculate')
    grid.child(calcbutton)

    //input node box with input and two button
    getNode = createDiv()
    getNode.attribute('class','getNodeBox')
    //getNode.position(500,500)
    getNodePrompt = createDiv('Enter node value:')
    getNode.child(getNodePrompt)

    inpNode = createInput('Node');
    inpNode.input(addNodeInput);
    inpNode.attribute('class','nodeinput')
    getNode.child(inpNode)

    setNode= createButton("Set")
    setNode.attribute('class','setNodeB')
    getNode.child(setNode)

    delNode= createButton("Delete")
    delNode.attribute('class','setDelB')
    getNode.child(delNode)
    
    getNode.hide()

    getEdge = createDiv()
    getEdge.attribute('class','getEdgeBox')
    //getEdge.position(400,400)
    getEdgePrompt = createDiv('Enter edge value:')
    getEdge.child(getEdgePrompt)

    inpEdge = createInput('Edge');
    inpEdge.input(addEdgeInput);
    inpEdge.attribute('class','edgeinput')
    getEdge.child(inpEdge)

    setEdge= createButton("Set")
    setEdge.attribute('class','setEdgeB')
    getEdge.child(setEdge)

    delEdge= createButton("Delete")
    delEdge.attribute('class','delEdgeB')
    getEdge.child(delEdge)

    getEdge.hide();

    noLoop()
}

function draw(){

    background(255);


    if (toBeEdged) {
        console.log('Edge drawn')
        edges.push(new Edge(src, dest, edgeValue))
        toBeEdged = false
        srcSet = false
    }

    if (nodeValue != null) {
        console.log('Node drawn')
        nodes.push(new Node(getNode.position().x, getNode.position().y, nodeValue, '#28fc03'))
        startsel.option(nodes[nodes.length - 1].showValue());
        destsel.option(nodes[nodes.length - 1].showValue())
    }

    for (var node of nodes) {
        node.display()
    }

    if (edges.length != 0) {
        for (var edge of edges) {
            console.log(edge.getSource().getX(), edge.getSource().getY(), edge.getDest().getX(), edge.getDest().getY())
            edge.display()
        }
    }

}

function addNodeInput(){
    nodeValue = this.value()
}

function addEdgeInput(){
    edgeValue = this.value()
}

function addNode(){
    
    if (nodeValue != null) {
        console.log('Node added')
        redraw()
        inpNode.value(null);
        getNode.hide()
    }
}

function removeNode() {
    inpNode.value(null);
    getNode.hide()
}

function removeEdge(){
    inpEdge.value(null);
    getEdge.hide()
}

function setEdgeValue(){
    
    if(edgeValue!= null){
        toBeEdged = true
    srcSet = false
    console.log('Edge added')
    redraw()
    inpEdge.value(null);
    getEdge.hide()
    
}
}

function handleEdge(node){
    if(!setSrc){
        src = node;
        setSrc = true
        //redraw()
    }
    else{
        dest = node;
        getEdge.position((src.getX()+dest.getX())*0.5,(src.getY()+dest.getY())*0.5)
        getEdge.show()
        setEdge.mouseReleased(setEdgeValue)
        delEdge.mouseReleased(removeEdge)
    }
}

function create(){
    for(var node of nodes){
        if (node.isPressed()){
            isNodePressed = true;
            console.log(node.getX(),node.getY())
            handleEdge(node)
            break
        }
    }
    if(!isNodePressed){
        setSrc = false
        getNode.position(mouseX,mouseY)
        getNode.show()
        setNode.mouseReleased(addNode)
        delNode.mouseReleased(removeNode)
    }
    else{
        isNodePressed = false;
    }

}