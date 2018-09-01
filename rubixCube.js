let temp = 0, scale = 20;
const sides = [];
let selected = 0;

const fillCube = function() {
  //fill sides[] with side objects
  let temp;
  for(let i = 0; i <  6;i++) {
    temp = side(i);
    sides.push(temp);
    console.log(temp.sideNum);
    console.log(temp.cubes[i]);
    console.log(temp.cubes);
    //console.log(temp.x);
  }
  //fill each side with one color
   sides.forEach(side => {
    for(let i = 0;i < 9;i++){
     side.cubes[i] = side.sideNum;
    }
   });
 }
//side constructor
const mixCube = function() {
  const funcs = [
    function() {FCC(0);},
    function() {FC(0)},
    function() {TR(0);},
    function() {TL(0);},
    function() {BR(0);},
    function() {BL(0);},
    function() {LD(0);},
    function() {LU(0);},
    function() {RU(0);},
    function() {RD(0);}
  ]
  for(let i = 0;i< 4;i++){
    funcs[Math.floor(Math.random() * 10)]();
  }
}

const side = sidenum => {
  const sideNum = sidenum;
  const cubes = Array(9);
  let x = 0;
  let y = 0;
  return {
    get sideNum() {
      return sideNum;
    },
    get cubes() {
      return cubes;
    },
    get x() {
      return x;
    },
    set x(temp) {
      x = temp;
    },
    set y(temp) {
      y = temp;
    },
    get y() {
      return y;
    },
  };
}

 const show = () => {
   //soff for side offset to position top and bottom faces
   let scaleBig = scale * 4, yoff = 0, xoff = 0, soff = 1.5;
   sides.forEach( side => {
       if(side.sideNum === selected) {
         noFill();
         strokeWeight(6);
         stroke(0,0,255);
         rect(side.x - 1.5,side.y - 1.5,(scale * 3) + 3, (scale * 3) + 3);
         strokeWeight(3);
       }else {
         stroke(0);
         strokeWeight(3);
         //rect(side.x - 1.5,side.y - 1.5,(scale * 3) + 3, (scale * 3) + 3);
       }

     //check block value
     let rowCount = 0, blockCount=1;
     for(let i = 0;i < side.cubes.length;i++){
       blockCount++;
       if (i % 3 ===0) {
         rowCount++;
         blockCount = 1;
       }
       //set color according to cube nunmber
      if(side.cubes[i]  === 0){
        fill(30, 255, 50);
      }else if(side.cubes[i]  === 1) {
        fill(250, 20,50);
      }else if(side.cubes[i]  === 2) {
        fill(79, 165, 244);
      }else if(side.cubes[i]  === 3) {
        fill(247, 255, 22);
      }else if(side.cubes[i]  === 4) {
        fill(22, 0, 200);
      }else if(side.cubes[i]  === 5) {
        fill(50,50,50);
      }else if(side.cubes[i]  === 6) {
        fill(119, 8, 8);
      }else if(side.cubes[i]  === 7) {
        fill(63, 53, 255);
      }else if(side.cubes[i] === 8) {
        fill(224, 52, 50);
      }
      //set x and y offsets
      if( side.sideNum === 0) {
        yoff = -scaleBig;
        xoff = scaleBig * 2;
      }else if (side.sideNum === 5) {
        yoff = scaleBig;
        xoff = -scaleBig * 3;
      }else {
        yoff = 0;
        xoff = 0;
      }
      //set x and y of each side
      if(i === 0 && side.x === 0){
        side.x = (side.sideNum * scaleBig) + (blockCount * scale) + xoff;
        side.y = (rowCount * 20) + width / 2 + yoff;
      }
      //draw cube
      stroke(0);
     rect((side.sideNum * scaleBig) + (blockCount * scale) + xoff,(rowCount * 20) + width / 2 + yoff, 20, 20);
    }
  });
}

function setup() {
   fillCube();
   let canvas = createCanvas(500,500);
   canvas.parent('sketch-holder');
 }

//CUBE ACTIONS

 //face counter-clockwise
const FCC = sideNum => {
  let temp = sides[sideNum].cubes.slice(0);
  sides[sideNum].cubes[0] = temp[2];
  sides[sideNum].cubes[1] = temp[5];
  sides[sideNum].cubes[2] = temp[8];
  sides[sideNum].cubes[3] = temp[1];
  sides[sideNum].cubes[4] = temp[4];
  sides[sideNum].cubes[5] = temp[7];
  sides[sideNum].cubes[6] = temp[0];
  sides[sideNum].cubes[7] = temp[3];
  sides[sideNum].cubes[8] = temp[6];
}
//face clockwise
const FC = sideNum => {
  let temp = sides[sideNum].cubes.slice(0);
  sides[sideNum].cubes[0] = temp[6];
  sides[sideNum].cubes[1] = temp[3];
  sides[sideNum].cubes[2] = temp[0];
  sides[sideNum].cubes[3] = temp[7];
  sides[sideNum].cubes[4] = temp[4];
  sides[sideNum].cubes[5] = temp[1];
  sides[sideNum].cubes[6] = temp[8];
  sides[sideNum].cubes[7] = temp[5];
  sides[sideNum].cubes[8] = temp[2];
}
//top row right
const TR = sideNum => {
  if(sideNum > 0 && sideNum < 5){
    let tempA = sides[1].cubes.slice(0);
    let tempB = sides[2].cubes.slice(0);
    let tempC = sides[3].cubes.slice(0);
    let tempD = sides[4].cubes.slice(0);
    //side 1
      sides[1].cubes[0] = tempD[2];
      sides[1].cubes[1] = tempD[1];
      sides[1].cubes[2] = tempD[0];
    //side 2
    for(let i = 0; i <= 2;i++){
      sides[2].cubes[i] = tempA[i];
    }
    //side 3
    for(let i = 0; i <= 2;i++){
      sides[3].cubes[i] = tempB[i];
    }
    //side 4
    sides[4].cubes[0] = tempC[2];
    sides[4].cubes[1] = tempC[1]
    sides[4].cubes[2] = tempC[0];
  }else if(sideNum === 0) {
    let tempA = sides[0].cubes.slice(0);
    let tempB = sides[1].cubes.slice(0);
    let tempC = sides[3].cubes.slice(0);
    let tempD = sides[5].cubes.slice(0);
    //side 0
    sides[0].cubes[0] = tempB[6];
    sides[0].cubes[1] = tempB[3];
    sides[0].cubes[2] = tempB[0];
    //side 1
    sides[1].cubes[0] = tempD[6];
    sides[1].cubes[3] = tempD[7];
    sides[1].cubes[6] = tempD[8];
    //side 3
    sides[3].cubes[2] = tempA[0];
    sides[3].cubes[5] = tempA[1];
    sides[3].cubes[8] = tempA[2];
    //side 5
    sides[5].cubes[6] = tempC[8];
    sides[5].cubes[7] = tempC[5];
    sides[5].cubes[8] = tempC[2];
  }
}
//top row left
const TL = sideNum => {
  if(sideNum > 0 && sideNum < 5){
    let tempA = sides[1].cubes.slice(0);
    let tempB = sides[2].cubes.slice(0);
    let tempC = sides[3].cubes.slice(0);
    let tempD = sides[4].cubes.slice(0);
    //side 1
    for(let i = 0; i <= 2;i++){
      sides[1].cubes[i] = tempB[i];
    }
    //side 2
    for(let i = 0; i <= 2;i++){
      sides[2].cubes[i] = tempC[i];
    }
    //side 3
    sides[3].cubes[0] = tempD[2];
    sides[3].cubes[1] = tempD[1];
    sides[3].cubes[2] = tempD[0];
    //side 4
    sides[4].cubes[0] = tempA[2];
    sides[4].cubes[1] = tempA[1];
    sides[4].cubes[2] = tempA[0];
  }else if(sideNum === 0) {
    let tempA = sides[0].cubes.slice(0);
    let tempB = sides[1].cubes.slice(0);
    let tempC = sides[3].cubes.slice(0);
    let tempD = sides[5].cubes.slice(0);
    //side 0
    sides[0].cubes[0] = tempC[2];
    sides[0].cubes[1] = tempC[5];
    sides[0].cubes[2] = tempC[8];
    //side 1
    sides[1].cubes[0] = tempA[2];
    sides[1].cubes[3] = tempA[1];
    sides[1].cubes[6] = tempA[0];
    //side 3
    sides[3].cubes[2] = tempD[8];
    sides[3].cubes[5] = tempD[7];
    sides[3].cubes[8] = tempD[6];
    //side 5
    sides[5].cubes[6] = tempB[0];
    sides[5].cubes[7] = tempB[3];
    sides[5].cubes[8] = tempB[6];
  }
}
//bottom row left
const BL = sideNum => {
  //rotate top row left
  //middle rows
  if(sideNum > 0 && sideNum < 5){
    let tempA = sides[1].cubes.slice(0);
    let tempB = sides[2].cubes.slice(0);
    let tempC = sides[3].cubes.slice(0);
    let tempD = sides[4].cubes.slice(0);
    //side 1
    for(let i = 6; i <= 8;i++){
      sides[1].cubes[i] = tempB[i];
    }
    //side 2
    for(let i = 6; i <= 8;i++){
      sides[2].cubes[i] = tempC[i];
    }
    //side 3
    for(let i = 6; i <= 8;i++){
      sides[3].cubes[i] = tempD[i];
    }
    //side 4
    for(let i = 6; i <= 8;i++){
      sides[4].cubes[i] = tempA[i];
    }
  }else if(sideNum === 0) {
      let tempA = sides[0].cubes.slice(0);
      let tempB = sides[1].cubes.slice(0);
      let tempC = sides[3].cubes.slice(0);
      let tempD = sides[5].cubes.slice(0);
      //side 0
      sides[0].cubes[6] = tempC[0];
      sides[0].cubes[7] = tempC[3];
      sides[0].cubes[8] = tempC[6];
      //side 1
      sides[1].cubes[2] = tempA[8];
      sides[1].cubes[5] = tempA[7];
      sides[1].cubes[8] = tempA[6];
      //side 3
      sides[3].cubes[0] = tempD[2];
      sides[3].cubes[3] = tempD[1];
      sides[3].cubes[6] = tempD[0];
      //side 5
      sides[5].cubes[0] = tempB[2];
      sides[5].cubes[1] = tempB[5];
      sides[5].cubes[2] = tempB[8];
    }
}
//bottom row right
const BR = sideNum => {
  if(sideNum > 0 && sideNum < 5) {
    let tempA = sides[1].cubes.slice(0);
    let tempB = sides[2].cubes.slice(0);
    let tempC = sides[3].cubes.slice(0);
    let tempD = sides[4].cubes.slice(0);
    //side 1
      sides[1].cubes[6] = tempD[8];
      sides[1].cubes[7] = tempD[7];
      sides[1].cubes[8] = tempD[6];
    //side 2
    for(let i = 6; i <= 8;i++){
      sides[2].cubes[i] = tempA[i];
    }
    //side 3
    for(let i = 6; i <= 8;i++){
      sides[3].cubes[i] = tempB[i];
    }
    //side 4
      sides[4].cubes[6] = tempC[8];
      sides[4].cubes[7] = tempC[7];
      sides[4].cubes[8] = tempC[6];
  }else if(sideNum === 0) {
      let tempA = sides[0].cubes.slice(0);
      let tempB = sides[1].cubes.slice(0);
      let tempC = sides[3].cubes.slice(0);
      let tempD = sides[5].cubes.slice(0);
      //side 0
      sides[0].cubes[6] = tempB[8];
      sides[0].cubes[7] = tempB[5];
      sides[0].cubes[8] = tempB[2];
      //side 1
      sides[1].cubes[2] = tempD[0];
      sides[1].cubes[5] = tempD[1];
      sides[1].cubes[8] = tempD[2];
      //side 3
      sides[3].cubes[0] = tempA[6];
      sides[3].cubes[3] = tempA[7];
      sides[3].cubes[6] = tempA[8];
      //side 5
      sides[5].cubes[0] = tempC[6];
      sides[5].cubes[1] = tempC[3];
      sides[5].cubes[2] = tempC[0];
    }
}
//left column up
const LU = sideNum => {
  if(sideNum === 0 || sideNum === 5 || sideNum === 2) {
    let tempA = sides[0].cubes.slice(0);
    let tempB = sides[2].cubes.slice(0);
    let tempC = sides[4].cubes.slice(0);
    let tempD = sides[5].cubes.slice(0);

    for(let i = 0; i <= 6;i+= 3){
      sides[0].cubes[i] = tempB[i];
    }

    for(let i = 0; i <= 6;i+= 3){
      sides[2].cubes[i] = tempD[i];
    }

    sides[4].cubes[2] = tempA[6];
    sides[4].cubes[5] = tempA[3];
    sides[4].cubes[8] = tempA[0];

    sides[5].cubes[0] = tempC[8];
    sides[5].cubes[3] = tempC[5];
    sides[5].cubes[6] = tempC[2];
  }
}
//left column down
const LD = sideNum => {
  if(sideNum === 0 || sideNum === 5 || sideNum === 2) {
    let tempA = sides[0].cubes.slice(0);
    let tempB = sides[2].cubes.slice(0);
    let tempC = sides[4].cubes.slice(0);
    let tempD = sides[5].cubes.slice(0);

    sides[0].cubes[0] = tempC[8];
    sides[0].cubes[3] = tempC[5];
    sides[0].cubes[6] = tempC[2];

    for(let i = 0; i <= 6;i+= 3){
      sides[2].cubes[i] = tempA[i];
    }

    sides[4].cubes[2] = tempD[6];
    sides[4].cubes[5] = tempD[3];
    sides[4].cubes[8] = tempD[0];

    for(let i = 0; i <= 6;i+= 3){
      sides[5].cubes[i] = tempB[i];
    }
  }
}
//right column up
const RU = sideNum => {
  if(sideNum === 0 || sideNum === 2 || sideNum === 5){
    let tempA = sides[0].cubes.slice(0);
    let tempB = sides[2].cubes.slice(0);
    let tempC = sides[4].cubes.slice(0);
    let tempD = sides[5].cubes.slice(0);

    for(let i = 2; i <= 8;i+= 3){
      sides[0].cubes[i] = tempB[i];
    }

    for(let i = 2; i <= 8;i+= 3){
      sides[2].cubes[i] = tempD[i];
    }

    sides[5].cubes[2] = tempC[6];
    sides[5].cubes[5] = tempC[3];
    sides[5].cubes[8] = tempC[0];

    sides[4].cubes[0] = tempA[8];
    sides[4].cubes[3] = tempA[5];
    sides[4].cubes[6] = tempA[2];
      //FCC(1);
  }
}
//right column down
const RD = sideNum => {
  if((sideNum === 0 ) || sideNum === 2 || (sideNum === 5)){
    let tempA = sides[0].cubes.slice(0);
    let tempB = sides[2].cubes.slice(0);
    let tempC = sides[4].cubes.slice(0);
    let tempD = sides[5].cubes.slice(0);

    sides[0].cubes[2] = tempC[6];
    sides[0].cubes[5] = tempC[3];
    sides[0].cubes[8] = tempC[0];

    for(let i = 2; i <= 8;i+= 3){
      sides[2].cubes[i] = tempA[i];
    }

    sides[4].cubes[0] = tempD[8];
    sides[4].cubes[3] = tempD[5];
    sides[4].cubes[6] = tempD[2];

    for(let i = 2; i <= 8;i+= 3){
      sides[5].cubes[i] = tempB[i];
    }
  }
}

function mousePressed() {
  sides.forEach( side => {
    if(mouseX > side.x && mouseX < side.x + (scale * 3)
    && mouseY > side.y && mouseY < side.y + (scale *3)) {
      selected = side.sideNum;
    }
  });
}

//CLICK HANDLERS
$(document).ready(function(){
//face counter-clockwise
  $(document).on('click', '#fcc', function(){
    FCC(selected);
    if(selected === 0) {
      TR(1);
    }else if(selected === 1) {
      LU(2);
    }else if(selected === 2) {
      BL(0);
    }else if(selected === 3) {
      RD(0);
    }else if(selected === 4) {
      TR(0);
    }else if(selected === 5) {
      BL(1);
    }
  });
//face clockwise
  $(document).on('click', '#fc', function(){
    FC(selected);
    if(selected === 0) {
      TL(1);
    }else if(selected === 1) {
      LD(2);
    }else if(selected === 2) {
      BR(0);
    }else if(selected === 3) {
      RU(0);
    }else if(selected === 4) {
      TL(0);
    }else if(selected === 5) {
      BR(1);
    }
  });
//left column up
  $(document).on('click', '#lu', function(){
    LU(selected);
    if(selected === 0) {
      FCC(1);
    }else if(selected === 1) {
      TR(0);
      FCC(4);
    }else if(selected === 2) {
      FCC(1);
    }else if(selected === 3) {
      BL(0);
      FCC(2);
    }else if(selected === 4) {
      RD(0);
      FCC(3);
    }else if(selected === 5) {
      FCC(1);
    }
  });
//left column down
  $(document).on('click', '#ld', function(){
    LD(selected);
    if(selected === 0) {
      FC(1);
    }else if(selected === 1) {
      TL(0);
      FC(4);
    }else if(selected === 2) {
      FC(1);
    }else if(selected === 3) {
      BR(0);
      FC(2);
    }else if(selected === 4) {
      RU(0);
      FC(3);
    }else if(selected === 5) {
      FC(1);
    }
  });
//right column up
  $(document).on('click', '#ru', function(){
    RU(selected);
    if(selected === 0) {
      FC(3);
    }else if(selected === 1) {
      BR(0);
      FC(2);
    }else if(selected === 2) {
      FC(3);
    }else if(selected === 3) {
      TL(0);
      FC(4);
    }else if(selected === 4) {
      LD(0);
      FC(1);
    }else if(selected === 5) {
      FC(3);
    }
  });
//right column down
  $(document).on('click', '#rd', function(){
    RD(selected);
    if(selected === 0) {
      FCC(3);
    }else if(selected === 1) {
      BL(0);
      FCC(2);
    }else if(selected === 2) {
      FCC(3);
    }else if(selected === 3) {
      TR(0);
      FCC(4);
    }else if(selected === 4) {
      LU(0);
      FCC(1);
    }else if(selected === 5) {
      FCC(3);
    }
  });
//top row right
  $(document).on('click', '#tr', function(){
    TR(selected);
    if(selected === 0) {
      FCC(4);
    }else if(selected === 1) {
      FCC(0);
    }else if(selected === 2) {
      FCC(0)
    }else if(selected === 3) {
      FCC(0);
    }else if(selected === 4) {
      FCC(0);
    }else if(selected === 5) {
      BL(0);
    }
  });
//top row left
  $(document).on('click', '#tl', function(){
    TL(selected);
    if(selected === 0) {
      FC(4);
    }else if(selected === 1) {
      FC(0);
    }else if(selected === 2) {
      FC(0)
    }else if(selected === 3) {
      FC(0);
    }else if(selected === 4) {
      FC(0);
    }else if(selected === 5) {
      BR(0);
    }
  });
//bottom row right
  $(document).on('click', '#br', function(){
    BR(selected);
    if(selected === 0) {
      FC(2);
    }else if(selected === 1) {
      FC(5);
    }else if(selected === 2) {
      FC(5);
    }else if(selected === 3) {
      FC(5);
    }else if(selected === 4) {
      FC(5);
    }else if(selected === 5) {
      TL(0);
    }
  });
//bottom row left
  $(document).on('click', '#bl', function(){
    BL(selected);
    if(selected === 0) {
      FCC(2);
    }else if(selected === 1) {
      FCC(5);
    }else if(selected === 2) {
      FCC(5);
    }else if(selected === 3) {
      FCC(5);
    }else if(selected === 4) {
      FCC(5);
    }else if(selected === 5) {
      TR(0);
    }
  });
//Mix cube
  $(document).on('click', '#mix', function(){mixCube();});
});
 function draw() {
    background(167,63,45);
    background(255,255,255,20);
    show();
 }
