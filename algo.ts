import * as fs from 'fs';

const MAP: string[] = fs.readFileSync(process.argv[2], 'utf-8').split('\n');
type Position = [number, number];

class Node {
  y: number;
  x: number;
  value: string;
  visited: boolean;
  
  constructor(y: number, x: number, value: string) {
    this.y = y;
    this.x = x;
    this.value = value;
    this.visited = false;
  }

  heuristic(end: Node): number {
    let distance: number = 0;
    distance = Math.abs(this.y - end.y) + Math.abs(this.x - end.x);
    return distance;
  }
}

function errorCheck(maze: string[]): void {
  let startCheck: boolean = false;
  let endCheck: boolean = false;
  let initCheck: number = maze[0].length;
  let sCount: number = 0;
  let eCount: number = 0;
  
  if (maze[0] === '') {
    console.log('Error: .map file is empty. Quitting the program.');
    process.exit();
  }

  for (let i: number = 0; i < maze.length; i ++) {
    if (maze[i].length !== initCheck) {
      console.log('Error: All the lines don\'t have the same length. Quitting the program.');
      process.exit();
    }
    for (let j: number =  0; j < maze[i].length; j++) {
      if (maze[i][j] === 'S') {
        startCheck = true;
        sCount += 1;
      }
      if (maze[i][j] === 'E') {
        endCheck = true;
        eCount += 1;
      }
      if (maze[i][j] !== 'o' && maze[i][j] !== 'E' && maze[i][j] !== 'S' && maze[i][j] !== '.') {
        console.log('Error: Found a different node than "S", "E", "o" or ".". Quitting the program.');
        process.exit();
      }
    }
  }
  if (startCheck !== true) {
    console.log('Error: Starting point not found. Quitting the program.');
    process.exit();
  }
  if (endCheck !== true) {
    console.log('Error: Ending point not found. Quitting the program.');
    process.exit();
  }
  if (sCount > 1) {
    console.log('Error: Multiple starting points found. Quitting the program.');
    process.exit();
  }
  if (eCount > 1) {
    console.log('Error: Multiple ending points found. Quitting the program.');
    process.exit();
  }
}

function nodeMap(maze: string[]): Node[][] {
  let map: Node[][] = [];
  for (let i: number = 0; i < maze.length; i ++) {
    let line: Node[] = [];
    for (let j: number =  0; j < maze[i].length; j++) {
      line.push(new Node(i,j,maze[i][j]));
    }
    map.push(line);
  }
  // console.log(map);
  return map;
}

function points(nodeMap: Node[][]): Node[] {
  let start: Node = nodeMap[0][0];
  let end: Node = nodeMap[0][0];

  for (let i: number = 0; i < nodeMap.length; i += 1) {
    for (let j: number = 0; j < nodeMap[i].length; j += 1) {
      if (nodeMap[i][j].value === 'S') {
        start = nodeMap[i][j];
      }
      if (nodeMap[i][j].value === 'E') {
        end = nodeMap[i][j];
      }
    }
  }
  // console.log(start);
  return [start, end];
}

function aStar(graph: Node[][], start: Node, end: Node): Position[] {
  

  let queue: Node[] = [];
  let previous: Node[] = [];
  queue.push(start);
  let coordinates: Position[] = [];
  let cur: Node | undefined = queue.shift()

  function isTrue(item: Node) {
    return item.visited === true;
  }

  while(true) {
    let compare: Node[] = [];

    if (cur !== undefined) {

      if (cur.value === 'E') {
        coordinates.push([cur.y,cur.x]);
        return coordinates;
      }
      // Vérif haut
      if (cur.y >= 1 && cur.y < graph.length && graph[cur.y - 1][cur.x].value !== 'o' && graph[cur.y - 1][cur.x].value !== 'S' ) {
        compare.push(graph[cur.y - 1][cur.x]);
      }
      // Vérif bas
      if (cur.y < graph.length - 1 && graph[cur.y + 1][cur.x].value !== 'o') {
        compare.push(graph[cur.y + 1][cur.x]);
      }
      // Vérif gauche
      if (cur.x >= 1 && cur.x < graph[0].length && graph[cur.y][cur.x - 1].value !== 'o') {
        compare.push(graph[cur.y][cur.x - 1]);
      }
      // Vérif droite
      if (cur.x < graph[0].length - 1 && graph[cur.y][cur.x + 1].value !== 'o') {
        compare.push(graph[cur.y][cur.x + 1]);
      }

      if (compare.length === 0) {
        console.log('Error: Impossible to find a path. Quitting the program.');
        process.exit();
      }

      if (compare.every(isTrue)) {
        cur.visited = true;
        coordinates.splice(coordinates.length - 1, 1);
        cur = previous.shift();
      } else {
        // Vérifier si tout les voisins sont true ou pas, sinon, rebrousser chemin.
        // Créer une condition qui me fait rebrousser chemin faisant un shift de l'array previous à la place
        
        previous.splice(0, 0, cur);
        previous[0].visited = true;
        if (coordinates.includes([cur.y,cur.x]) === false) {
          coordinates.push([cur.y,cur.x]);
        }
        loop1 : for (let i: number = 0; true; i++) {
          for (let j: number = 0; j < compare.length; j++) {
            
            if (i === compare[j].heuristic(end) && compare[j].visited === false) {
              queue.splice(0, 0, compare[j]);
              cur = queue.shift();
              break loop1;
            }
          }
        }
      }
      
    }
  }
}

function helloNeighbor(path: Position[]): void {

let anomalyY: Position[] = [];
let anomalyX: Position[] = [];
//Détecteur d'anomalie
  for (let i: number = 0; i < path.length; i++) {
    
    for (let j: number = 0; j < path.length; j++) {

      if (path[i][0] + 1 === path[j][0] && path[i][1] === path[j][1] || path[i][0] - 1 === path[j][0] && path[i][1] === path[j][1]) {
        anomalyY.push(path[j]);
      }
      if (anomalyY.length > 1) {
        path.splice(i+1, j - (i + 1));
        anomalyY = [];
        break;
      }
    }
  }
    for (let i: number = 0; i < path.length; i++) {
      for (let j: number = 0; j < path.length; j++) {
        if (path[i][0] === path[j][0] && path[i][1] + 1 === path[j][1] || path[i][0] === path[j][0] && path[i][1] - 1 === path[j][1]) {
          anomalyX.push(path[j]);
        }
        if (anomalyX.length > 1) {
          path.splice(i+1, j - (i + 1));
          anomalyX = [];
          break;
        }
      }
    }

let coords: string[] = [];

    for (let i: number = 0; i < path.length; i++) {
      coords.push(path[i].toString().replace(',',':'));
    }
    console.log(coords.toString().replaceAll(',',' '));
}

errorCheck(MAP);
let graph: Node[][] = nodeMap(MAP)
let head: Node = points(nodeMap(MAP))[0];
let finish: Node = points(nodeMap(MAP))[1];
const path: Position[] = aStar(graph, head, finish);
helloNeighbor(path);
