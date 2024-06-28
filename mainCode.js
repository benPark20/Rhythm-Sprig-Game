/*
@title: Rythm Game
@author: Ben Park
@tags: []
@addedOn: 2024-06-21
*/

// Define sprites
const cursor = "c"
const levelBlock = "b"
const comingSoon = "s"
const title1 = "1"
const title2 = "2"
const title3 = "3"
const title4 = "4"
const title5 = "5"
const title6 = "6"
const title7 = "7"
const lane = "l"
const blockTop = "t"
const blockMid = "m"
const blockBottom = "o"

setLegend(
  [cursor, bitmap`
................
................
................
................
................
................
.......00.......
......0..0......
......0..0......
.......00.......
................
................
................
................
................
................`],
  [levelBlock,bitmap`
....55555555....
..555555555555..
.55555555555555.
.55555555555555.
5555555555555555
5555555555555555
5555557777555555
5555557777555555
5555557777555555
5555557777555555
5555555555555555
5555555555555555
.55555555555555.
.55555555555555.
..555555555555..
....55555555....`],
  [comingSoon,bitmap`
....LLLLLLLL....
..LLLLLLLLLLLL..
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
LLLLLLLLLLLLLLLL
LL0LLLLLL0LLLLLL
L0LLLL0LLLL0L00L
LL0L0L00L0L0L00L
LLLLLLLLLLLLLL0L
LLLLLLLLLLLLL0LL
LLLL0LLLLLLLLLLL
LLL0LLLLLLLLLLLL
.LLL0LLLLL0LLLL.
.LL0LL0L0L0LLLL.
..LLLLLLLLLLLL..
....LLLLLLLL....`],
  [title1,bitmap`
................
................
................
................
...000..........
..00............
..0.............
..00........000.
...00......00.0.
....00.....0..00
....00.....00000
....0......0....
..000......0....
..00.......0000.
................
................`],
  [title2,bitmap`
................
................
................
.00.............
..0.............
..0.............
..0.............
..0......0000...
..0.....00..00..
..0.....000000..
..0.....0.......
..0.....00......
..00.....000....
...00......00...
................
................`],
  [title3,bitmap`
................
................
...........0....
...........0....
...........0....
...........0....
....0......0....
...00....00000..
..00.......0....
..0........0....
..0........0....
..0........0....
...000.....00...
............0...
................
................`],
  [title4,bitmap`
................
................
................
.00.............
..0.............
..0.............
..0.............
..0......0000...
..0.....00..00..
..0.....000000..
..0.....0.......
..0.....00......
..00.....000....
...00......00...
................
................`],
  [title5,bitmap`
................
................
................
................
................
..0..........000
..0.....0...00..
..0.....0...0...
...0...00...0000
...00..0....0...
....0..0....0...
....000......0..
.....00.......00
................
................
................`],
  [title6,bitmap`
................
................
................
................
........0.......
........0.......
0.......0.......
0.......0.......
00......0.......
........0.......
........0.......
.0......0.......
00......00......
.........00.....
................
................`],
  [title7,bitmap`
................
................
111111111111111.
..............11
.........LL....1
00......LLLL...1
00......LLLL...1
00....LL.LL.LL.1
00...LLLL..L66L1
00...LLLL..L66L1
00....LL.LL.LL.1
00......LLLL...1
00......LLLL...1
.........LL....1
..............11
111111111111111.`],
  [lane, bitmap`
0000000000000000
0000000000000000
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
0000000000000000
0000000000000000`],
  [blockTop, bitmap`
................
................
................
................
......3333......
.....3CCCC3.....
....3C3333C3....
....3C3333C3....
....3C3333C3....
....3C3333C3....
.....3CCCC3.....
......3333......
................
................
................
................`],
  [blockMid, bitmap`
................
................
................
................
......7777......
.....755557.....
....75777757....
....75777757....
....75777757....
....75777757....
.....755557.....
......7777......
................
................
................
................`],
  [blockBottom, bitmap`
................
................
................
................
......4444......
.....4DDDD4.....
....4D4444D4....
....4D4444D4....
....4D4444D4....
....4D4444D4....
.....4DDDD4.....
......4444......
................
................
................
................`],
)
//set start state
let gameState = "levelSelect"

let level = 0
const levels = [
  //start menu
  map`
.123.456.
....7....
.b.b.b.b.
.........
.b.bcb.b.
.........
.s.s.s.s.
.........`,
  //
  //placeholder
  map`
.123.456.
....7....
.b.b.b.b.
...c.....
.b.b.b.b.
.........
.s.s.s.s.
.........`,
  //
  //placeholder
  map`
.123.456.
....7....
.b.b.b.b.
...c.....
.b.b.b.b.
.........
.s.s.s.s.
.........`,
  //
  //level 2
  map`
llll
llll
llll`,
  //
  //level 6
  map`
llll
llll
llll`,
  //
  //level 3
  map`
llll
llll
llll`,
  //
  //level 7
  map`
llll
llll
llll`,
  //
  //level 4
  map`
llll
llll
llll`,
  //
  //level 8
  map`
llll
llll
llll`,
  //
  //level 5
  map`
llll
llll
llll`,
  //
  //level 1
  map`
llll
llll
llll`,
]

// Set the map for the specified level
setMap(levels[0])

// Set the pushables
setPushables({
  [cursor]: []
})

// Function to move the cursor in different directions
function moveCursor(key, direction, plusMinus) {
  if(gameState === "levelSelect"){   
    onInput(key, () => {
      if (plusMinus === "+") {
        if (direction === "x") {
          getFirst(cursor).x += 1;
        } else if (direction === "y") {
          getFirst(cursor).y += 1;
        }
      } else if (plusMinus === "-") {
            if (direction === "x") {
              getFirst(cursor).x -= 1;
            } else if (direction === "y") {
              getFirst(cursor).y -= 1;
            }
        }
      })
  }
}

// Call the moveCursor function for different key inputs
moveCursor("w", "y", "-")
moveCursor("s", "y", "+")
moveCursor("a", "x", "-")
moveCursor("d", "x", "+")

//function to get the Coordinates of my cursor
let cursorSprite = 0
let cursorX = 0
let cursorY = 0

function getCursorCoords(key){
  onInput(key, ()=> {
    if(gameState === "selectLevel"){
      cursorSprite = getFirst(cursor);
      cursorX = cursorSprite.x
      cursorY = cursorSprite.y
      console.log("X: "+ cursorX +" Y: "+ cursorY)
    }
  })
}

//function to set map accourding to game state
function mapSet(){
  if(gameState === "levelSelect"){
    setMap(levels[level])
  } else
    setMap(levels[0])
}

//check if level is selected on "l" input 
//then set level number to a unique number for each level
onInput("l", () => {
  if(gameState === "levelSelect") {
    getCursorCoords("l")
    if(cursorX === 1||cursorX === 3||cursorX === 5||cursorX === 7){
      if(cursorY === 2|| cursorY === 4){
        console.log("level selected")
        level = cursorX+cursorY
        if(cursorY === 4){
          level -= 1
          mapSet()
          gameState = "inLevel"
        } else {
        mapSet()
        gameState = "inLevel"
        }
      }
    }
  } else {
    gameState = "levelSelect"
    mapSet()
  }
  console.log("level"+level)
})
//lll
