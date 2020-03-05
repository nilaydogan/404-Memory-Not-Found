var canvas;
var gl;

var imageS; 
var textureBr;
var texCoord = [
    vec2(0.01,0.68),
    vec2(0.01,0.99),
    vec2(0.2,0.99),
    
    vec2(0.41,0.68),
    vec2(0.41,0.99),
    vec2(0.67,0.99),
    
    vec2(0.667,0.68),
    vec2(0.667,0.99),
    vec2(0.999,0.99),
    
    vec2(0.01,0.41),
    vec2(0.01,0.667),
    vec2(0.2,0.667),
    
    vec2(0.41,0.41),
    vec2(0.41,0.667),
    vec2(0.67,0.667),
    
    vec2(0.667,0.41),
    vec2(0.667,0.667),
    vec2(0.999,0.67),
    
    vec2(0.01,0.1),
    vec2(0.01,0.33),
    vec2(0.2,0.33),
    
    vec2(0.41,0.1),
    vec2(0.41,0.33),
    vec2(0.67,0.33),
    
    vec2(0.667,0.1),
    vec2(0.667,0.33),
    vec2(0.999,0.33)
    
    
    
];
var texCoordsArray = [];
function configureTexture( image , programt) {
    textureBr = gl.createTexture();
    gl.bindTexture( gl.TEXTURE_2D, textureBr );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, 
         gl.RGB, gl.UNSIGNED_BYTE, image );
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, 
                      gl.NEAREST_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
    
    gl.uniform1i(gl.getUniformLocation(programt, "textureBr"), 0);
}


var pointsArray = [];
var colorsArray = [];
var normalsArray = [];

var clicked = false;
var pickedlamb = false;
var holditem = false;

var collectable1 = true;
var collectable2 = true;
var collectable3 = true;
var easteregg = true;

var collectableangle = 0;

var run = false;
var speed = 0.2;

var lightmiktar = 0;
var lightangle = 0;     
var finished = 2.0;

var ileri = vec4(1,0,0);
var sag = vec4(0,0,1);


var Walls = [];
var Ground = [];
var Top = [];
var DecDolap = [];
var DecWoods = [];
var Obs1= [];
var Obs2 = [];
var Obs3 = [];
var Lamb = [];
var CD = [];
var SD = [];
var Laptop = [];
var Chair = [];
var Automat = [];
var Table = [];
var Dolap = [];
var Easter = [];
var Outside = [];

var vertexColors = [
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black 0
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red 1
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow 2
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green 3
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue 4
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta 5
    vec4( 0.0, 1.0, 1.0, 1.0 ),  // cyan 6
    vec4( 1.0, 1.0, 1.0, 1.0 ),  // white 7
    vec4( 0.4, 0.4, 0.4, 1.0 ),  // az açık gri 8
    vec4( 0.6, 0.4, 0.05, 1.0 ), // kahve 9
    vec4( 0.6, 0.6, 0.6, 1.0 ),  // açık gri 10
    vec4( 0.2, 0.2, 0.2, 1.0 ),  // koyu gri 11
    vec4( 1, 0.9, 0.0, 1.0 )  // gold 12
];

var lightPosition = vec4(12, 20, 12, 1.0 );
var lightAmbient = vec4(0.5, 0.5, 0.5, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

var materialAmbient = vec4( 1.0, 1.0, 1.0, 1.0 );
var materialDiffuse = vec4( 1.0, 1.0, 1.0, 1.0);
var materialSpecular = vec4( 1, 1, 1, 1.0 );
var materialShininess = 100.0;

var ctm;
var ambientColor, diffuseColor, specularColor;
var viewerPos;

var near = 0.3;
var far = 300.0;
var radius = 5.0;
var theta  = 0.0;
var phi    = 0.0;
var dr = 5.0 * Math.PI/180.0;

var fovy = 45.0;  // Field-of-view in Y direction angle (in degrees)
var aspect = 1.0;       // Viewport aspect ratio

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var eye = vec3(0.0, 0.0, 0.0);
var at = vec3(0.0, 0.0, 0.0);
var up = vec3(0.0, -1.0, 0.0);

var program;

var expectedPositionLamb = vec4(0, 3.5, -8, 1.0 );
var expectedCol1 = vec4(47, 2.5, 3, 1.0 );
var expectedCol2 = vec4(-21, 1.5, 25, 1.0 );
var expectedCol3 = vec4(63, 2.5, 4.2, 1.0 );
var easterpos = vec4(11, 2, -1.5, 1.0 );

var sandalye = vec4(-19.5, 2.63, 20.35, 1.0 );
var sandalyeangle = 0;

var expOtomat = vec4(12, 2.5, -2, 1.0);
var otomatangle = 0;

var tablePos = vec4(41, 2.5, -7, 1.0);
var tableangle = 0;

var tablePos2 = vec4(-18, 2.5, -7, 1.0);
var tableangle2 = 0;

var dolapPos = vec4(66, 2, -2, 1.0);
var dolapangle = 0;


function triangle(a, b, c ,d, e) {
    //Walls
    if (e === 0) {      
        var normal = vec3(cross(subtract(Walls[b], Walls[a]), subtract(Walls[c], Walls[a])));
     pointsArray.push(Walls[a]); 
     colorsArray.push(vertexColors[7]); 
      normalsArray.push(normal); 
     pointsArray.push(Walls[b]); 
     colorsArray.push(vertexColors[7]); 
      normalsArray.push(normal); 
     pointsArray.push(Walls[c]); 
     colorsArray.push(vertexColors[7]);
      normalsArray.push(normal);  
      
    texCoordsArray.push(texCoord[0]);
    texCoordsArray.push(texCoord[1]); 
    texCoordsArray.push(texCoord[2]);
    }
    //Lamb
    else if (e === 1) {
        var normal = vec3(cross(subtract(Lamb[b], Lamb[a]), subtract(Lamb[c], Lamb[a])));
     pointsArray.push(Lamb[a]); 
     colorsArray.push(vertexColors[d]); 
      normalsArray.push(normal); 
     pointsArray.push(Lamb[b]); 
     colorsArray.push(vertexColors[d]); 
      normalsArray.push(normal); 
     pointsArray.push(Lamb[c]); 
     colorsArray.push(vertexColors[d]);
      normalsArray.push(normal);  
      
    texCoordsArray.push(texCoord[3]);
    texCoordsArray.push(texCoord[4]); 
    texCoordsArray.push(texCoord[5]);
    }
    //Obs1
    else if (e === 2) {
        var normal = vec3(cross(subtract(Obs1[b], Obs1[a]), subtract(Obs1[c], Obs1[a])));
     pointsArray.push(Obs1[a]); 
     colorsArray.push(vertexColors[d]); 
      normalsArray.push(normal); 
     pointsArray.push(Obs1[b]); 
     colorsArray.push(vertexColors[d]); 
      normalsArray.push(normal); 
     pointsArray.push(Obs1[c]); 
     colorsArray.push(vertexColors[d]);
      normalsArray.push(normal);  
      
    texCoordsArray.push(texCoord[24]);
    texCoordsArray.push(texCoord[25]); 
    texCoordsArray.push(texCoord[26]);
    }
    //Obs2
    else if (e === 3) {
        var normal = vec3(cross(subtract(Obs2[b], Obs2[a]), subtract(Obs2[c], Obs2[a])));
     pointsArray.push(Obs2[a]); 
     colorsArray.push(vertexColors[d]); 
      normalsArray.push(normal); 
     pointsArray.push(Obs2[b]); 
     colorsArray.push(vertexColors[d]); 
      normalsArray.push(normal); 
     pointsArray.push(Obs2[c]); 
     colorsArray.push(vertexColors[d]);
      normalsArray.push(normal);  
      
    texCoordsArray.push(texCoord[24]);
    texCoordsArray.push(texCoord[25]); 
    texCoordsArray.push(texCoord[26]);
    }
    //Obs3
    else if (e === 4) {
        var normal = vec3(cross(subtract(Obs3[b], Obs3[a]), subtract(Obs3[c], Obs3[a])));
     pointsArray.push(Obs3[a]); 
     colorsArray.push(vertexColors[d]); 
      normalsArray.push(normal); 
     pointsArray.push(Obs3[b]); 
     colorsArray.push(vertexColors[d]); 
      normalsArray.push(normal); 
     pointsArray.push(Obs3[c]); 
     colorsArray.push(vertexColors[d]);
      normalsArray.push(normal);  

    texCoordsArray.push(texCoord[24]);
    texCoordsArray.push(texCoord[25]); 
    texCoordsArray.push(texCoord[26]);
    }
    //CD
    else if (e === 5) {
        var normal = vec3(cross(subtract(CD[b], CD[a]), subtract(CD[c], CD[a])));
     pointsArray.push(CD[a]); 
     colorsArray.push(vertexColors[7]); 
      normalsArray.push(normal); 
     pointsArray.push(CD[b]); 
     colorsArray.push(vertexColors[7]); 
      normalsArray.push(normal); 
     pointsArray.push(CD[c]); 
     colorsArray.push(vertexColors[7]);
      normalsArray.push(normal);  
      
    texCoordsArray.push(texCoord[18]);
    texCoordsArray.push(texCoord[19]); 
    texCoordsArray.push(texCoord[20]);
    }
    //SD
    else if (e === 6) {
        var normal = vec3(cross(subtract(SD[b], SD[a]), subtract(SD[c], SD[a])));
     pointsArray.push(SD[a]); 
     colorsArray.push(vertexColors[d]); 
      normalsArray.push(normal); 
     pointsArray.push(SD[b]); 
     colorsArray.push(vertexColors[d]); 
      normalsArray.push(normal); 
     pointsArray.push(SD[c]); 
     colorsArray.push(vertexColors[d]);
      normalsArray.push(normal);  
      
    texCoordsArray.push(texCoord[4]);
    texCoordsArray.push(texCoord[1]); 
    texCoordsArray.push(texCoord[2]);
    }
    //Laptop
    else if (e === 7) {
        var normal = vec3(cross(subtract(Laptop[b], Laptop[a]), subtract(Laptop[c], Laptop[a])));
     pointsArray.push(Laptop[a]); 
     colorsArray.push(vertexColors[11]); 
      normalsArray.push(normal); 
     pointsArray.push(Laptop[b]); 
     colorsArray.push(vertexColors[11]); 
      normalsArray.push(normal); 
     pointsArray.push(Laptop[c]); 
     colorsArray.push(vertexColors[11]);
      normalsArray.push(normal);  
      
    texCoordsArray.push(texCoord[9]);
    texCoordsArray.push(texCoord[10]); 
    texCoordsArray.push(texCoord[11]);
    }
    //Chair
    else if (e === 8) {
        var normal = vec3(cross(subtract(Chair[b], Chair[a]), subtract(Chair[c], Chair[a])));
     pointsArray.push(Chair[a]); 
     colorsArray.push(vertexColors[d]); 
      normalsArray.push(normal); 
     pointsArray.push(Chair[b]); 
     colorsArray.push(vertexColors[d]); 
      normalsArray.push(normal); 
     pointsArray.push(Chair[c]); 
     colorsArray.push(vertexColors[d]);
      normalsArray.push(normal);  
      
    texCoordsArray.push(texCoord[21]);
    texCoordsArray.push(texCoord[22]); 
    texCoordsArray.push(texCoord[23]);
    }
    //Automat
    else if (e === 9) {
        var normal = vec3(cross(subtract(Automat[b], Automat[a]), subtract(Automat[c], Automat[a])));
     pointsArray.push(Automat[a]); 
     colorsArray.push(vertexColors[d]); 
      normalsArray.push(normal); 
     pointsArray.push(Automat[b]); 
     colorsArray.push(vertexColors[d]); 
      normalsArray.push(normal); 
     pointsArray.push(Automat[c]); 
     colorsArray.push(vertexColors[d]);
      normalsArray.push(normal);  
      
    texCoordsArray.push(texCoord[9]);
    texCoordsArray.push(texCoord[10]); 
    texCoordsArray.push(texCoord[11]);
    }
    //Table
    else if (e === 10) {
        var normal = vec3(cross(subtract(Table[b], Table[a]), subtract(Table[c], Table[a])));
     pointsArray.push(Table[a]); 
     colorsArray.push(vertexColors[7]); 
      normalsArray.push(normal); 
     pointsArray.push(Table[b]); 
     colorsArray.push(vertexColors[7]); 
      normalsArray.push(normal); 
     pointsArray.push(Table[c]); 
     colorsArray.push(vertexColors[7]);
      normalsArray.push(normal);  
      
    texCoordsArray.push(texCoord[21]);
    texCoordsArray.push(texCoord[22]); 
    texCoordsArray.push(texCoord[23]);
    }
    //Dolap
    else if (e === 11) {
        var normal = vec3(cross(subtract(Dolap[b], Dolap[a]), subtract(Dolap[c], Dolap[a])));
     pointsArray.push(Dolap[a]); 
     colorsArray.push(vertexColors[7]); 
      normalsArray.push(normal); 
     pointsArray.push(Dolap[b]); 
     colorsArray.push(vertexColors[7]); 
      normalsArray.push(normal); 
     pointsArray.push(Dolap[c]); 
     colorsArray.push(vertexColors[7]);
      normalsArray.push(normal);  
      
    texCoordsArray.push(texCoord[15]);
    texCoordsArray.push(texCoord[16]); 
    texCoordsArray.push(texCoord[17]);
    }
    //Easter
    else if (e === 12) {
        var normal = vec3(cross(subtract(Easter[b], Easter[a]), subtract(Easter[c], Easter[a])));
     pointsArray.push(Easter[a]); 
     colorsArray.push(vertexColors[d]); 
      normalsArray.push(normal); 
     pointsArray.push(Easter[b]); 
     colorsArray.push(vertexColors[d]); 
      normalsArray.push(normal); 
     pointsArray.push(Easter[c]); 
     colorsArray.push(vertexColors[d]);
      normalsArray.push(normal);  
      
    texCoordsArray.push(texCoord[4]);
    texCoordsArray.push(texCoord[1]); 
    texCoordsArray.push(texCoord[2]);
    }
    //Ground
    else if (e === 13) {
        var normal = vec3(cross(subtract(Ground[b], Ground[a]), subtract(Ground[c], Ground[a])));
     pointsArray.push(Ground[a]); 
     colorsArray.push(vertexColors[7]); 
      normalsArray.push(normal); 
     pointsArray.push(Ground[b]); 
     colorsArray.push(vertexColors[7]); 
      normalsArray.push(normal); 
     pointsArray.push(Ground[c]); 
     colorsArray.push(vertexColors[7]);
      normalsArray.push(normal);  
      
    texCoordsArray.push(texCoord[6]);
    texCoordsArray.push(texCoord[7]); 
    texCoordsArray.push(texCoord[8]);
    }
    //Top
    else if (e === 14) {
        var normal = vec3(cross(subtract(Top[b], Top[a]), subtract(Top[c], Top[a])));
     pointsArray.push(Top[a]); 
     colorsArray.push(vertexColors[7]); 
      normalsArray.push(normal); 
     pointsArray.push(Top[b]); 
     colorsArray.push(vertexColors[7]); 
      normalsArray.push(normal); 
     pointsArray.push(Top[c]); 
     colorsArray.push(vertexColors[7]);
      normalsArray.push(normal);  
      
    texCoordsArray.push(texCoord[3]);
    texCoordsArray.push(texCoord[4]); 
    texCoordsArray.push(texCoord[5]);
    }
    //Wood
    else if (e === 15) {
        var normal = vec3(cross(subtract(DecWoods[b], DecWoods[a]), subtract(DecWoods[c], DecWoods[a])));
     pointsArray.push(DecWoods[a]); 
     colorsArray.push(vertexColors[7]); 
      normalsArray.push(normal); 
     pointsArray.push(DecWoods[b]); 
     colorsArray.push(vertexColors[7]); 
      normalsArray.push(normal); 
     pointsArray.push(DecWoods[c]); 
     colorsArray.push(vertexColors[7]);
      normalsArray.push(normal);  
      
    texCoordsArray.push(texCoord[21]);
    texCoordsArray.push(texCoord[22]); 
    texCoordsArray.push(texCoord[23]);
    }
    //Dolaps
    else if (e === 16) {
        var normal = vec3(cross(subtract(DecDolap[b], DecDolap[a]), subtract(DecDolap[c], DecDolap[a])));
     pointsArray.push(DecDolap[a]); 
     colorsArray.push(vertexColors[7]); 
      normalsArray.push(normal); 
     pointsArray.push(DecDolap[b]); 
     colorsArray.push(vertexColors[7]); 
      normalsArray.push(normal); 
     pointsArray.push(DecDolap[c]); 
     colorsArray.push(vertexColors[7]);
      normalsArray.push(normal);  
      
    texCoordsArray.push(texCoord[15]);
    texCoordsArray.push(texCoord[16]); 
    texCoordsArray.push(texCoord[17]);
    }
    //Outside
    else if (e === 17) {
        var normal = vec3(cross(subtract(Outside[b], Outside[a]), subtract(Outside[c], Outside[a])));
     pointsArray.push(Outside[a]); 
     colorsArray.push(vertexColors[11]); 
      normalsArray.push(normal); 
     pointsArray.push(Outside[b]); 
     colorsArray.push(vertexColors[11]); 
      normalsArray.push(normal); 
     pointsArray.push(Outside[c]); 
     colorsArray.push(vertexColors[11]);
      normalsArray.push(normal);  
      
    texCoordsArray.push(texCoord[12]);
    texCoordsArray.push(texCoord[13]); 
    texCoordsArray.push(texCoord[14]);
    }
}


window.onload = function init() {
    $.get('models/Walls.smf', 
             function(data) {
                var list = data.split("\n");
                for (var i = 0; i <list.length; i++) 
                {
                    var splitedline = list[i].split("\ ");
                    if (splitedline[0] === "v") {
                        Walls[i] = new vec4(splitedline[1],splitedline[2]+50,splitedline[3],1.0);
                    }
                    else if (splitedline[0] === "f") {
                        triangle(splitedline[1]-1,splitedline[2]-1,splitedline[3]-1,8,0);
                    }
                }
            }
         ).done(function(){
             console.log("İlk " + pointsArray.length);
             $.get('models/ObsFirst.smf', 
             function(data) {
                var list = data.split("\n");
                for (var i = 0; i <list.length; i++) 
                {
                    var splitedline = list[i].split("\ ");
                    if (splitedline[0] === "v") {
                        Obs1[i] = new vec4(splitedline[1],splitedline[2],splitedline[3],1.0);
                    }
                    else if (splitedline[0] === "f") {
                        triangle(splitedline[1]-1,splitedline[2]-1,splitedline[3]-1,1,2);
                    }
                }
            }
         ).done(function(){
             console.log("Orta " + pointsArray.length);
             $.get('models/ObsSec.smf', 
             function(data) {
                var list = data.split("\n");
                for (var i = 0; i <list.length; i++) 
                {
                    var splitedline = list[i].split("\ ");
                    if (splitedline[0] === "v") {
                        Obs2[i] = new vec4(splitedline[1],splitedline[2],splitedline[3],1.0);
                    }
                    else if (splitedline[0] === "f") {
                        triangle(splitedline[1]-1,splitedline[2]-1,splitedline[3]-1,1,3);
                    }
                }
            }
         ).done(function(){
             console.log("Son " + pointsArray.length);
             $.get('models/ObsThr.smf', 
             function(data) {
                var list = data.split("\n");
                for (var i = 0; i <list.length; i++) 
                {
                    var splitedline = list[i].split("\ ");
                    if (splitedline[0] === "v") {
                        Obs3[i] = new vec4(splitedline[1],splitedline[2],splitedline[3],1.0);
                    }
                    else if (splitedline[0] === "f") {
                        triangle(splitedline[1]-1,splitedline[2]-1,splitedline[3]-1,1,4);
                    }
                }
            }
         ).done(function(){
             console.log("CD " + pointsArray.length);
             $.get('models/cd.smf', 
             function(data) {
                var list = data.split("\n");
                for (var i = 0; i <list.length; i++) 
                {
                    var splitedline = list[i].split("\ ");
                    if (splitedline[0] === "v") {
                        CD[i] = new vec4(splitedline[1],splitedline[2],splitedline[3],1.0);
                    }
                    else if (splitedline[0] === "f") {
                        triangle(splitedline[1]-1,splitedline[2]-1,splitedline[3]-1,10,5);
                    }
                }
            }
         ).done(function(){
             console.log("File " + pointsArray.length);
             $.get('models/sd.smf', 
             function(data) {
                var list = data.split("\n");
                for (var i = 0; i <list.length; i++) 
                {
                    var splitedline = list[i].split("\ ");
                    if (splitedline[0] === "v") {
                        SD[i] = new vec4(splitedline[1],splitedline[2],splitedline[3],1.0);
                    }
                    else if (splitedline[0] === "f") {
                        triangle(splitedline[1]-1,splitedline[2]-1,splitedline[3]-1,4,6);
                    }
                }
            }
         ).done(function(){
             console.log("Laptop " + pointsArray.length);
             $.get('models/laptopblend.smf', 
             function(data) {
                var list = data.split("\n");
                for (var i = 0; i <list.length; i++) 
                {
                    var splitedline = list[i].split("\ ");
                    if (splitedline[0] === "v") {
                        Laptop[i] = new vec4(splitedline[1],splitedline[2],splitedline[3],1.0);
                    }
                    else if (splitedline[0] === "f") {
                        triangle(splitedline[1]-1,splitedline[2]-1,splitedline[3]-1,5,7);
                    }
                }
            }
         ).done(function(){
             console.log("easter " + pointsArray.length);
             $.get('models/easter.smf', 
             function(data) {
                var list = data.split("\n");
                for (var i = 0; i <list.length; i++) 
                {
                    var splitedline = list[i].split("\ ");
                    if (splitedline[0] === "v") {
                        Easter[i] = new vec4(splitedline[1],splitedline[2],splitedline[3],1.0);
                    }
                    else if (splitedline[0] === "f") {
                        triangle(splitedline[1]-1,splitedline[2]-1,splitedline[3]-1,12,12);
                    }
                }
            }
         ).done(function(){
             console.log("Sandalye " + pointsArray.length);
             $.get('models/sandalye.smf', 
             function(data) {
                var list = data.split("\n");
                for (var i = 0; i <list.length; i++) 
                {
                    var splitedline = list[i].split("\ ");
                    if (splitedline[0] === "v") {
                        Chair[i] = new vec4(splitedline[1],splitedline[2],splitedline[3],1.0);
                    }
                    else if (splitedline[0] === "f") {
                        triangle(splitedline[1]-1,splitedline[2]-1,splitedline[3]-1,9,8);
                    }
                }
            }
         ).done(function(){
             console.log("Otomat " + pointsArray.length);
             $.get('models/otomat.smf', 
             function(data) {
                var list = data.split("\n");
                for (var i = 0; i <list.length; i++) 
                {
                    var splitedline = list[i].split("\ ");
                    if (splitedline[0] === "v") {
                        Automat[i] = new vec4(splitedline[1],splitedline[2],splitedline[3],1.0);
                    }
                    else if (splitedline[0] === "f") {
                        triangle(splitedline[1]-1,splitedline[2]-1,splitedline[3]-1,11,9);
                    }
                }
            }
         ).done(function(){
             console.log("Table " + pointsArray.length);
             $.get('models/table.smf', 
             function(data) {
                var list = data.split("\n");
                for (var i = 0; i <list.length; i++) 
                {
                    var splitedline = list[i].split("\ ");
                    if (splitedline[0] === "v") {
                        Table[i] = new vec4(splitedline[1],splitedline[2],splitedline[3],1.0);
                    }
                    else if (splitedline[0] === "f") {
                        triangle(splitedline[1]-1,splitedline[2]-1,splitedline[3]-1,9,10);
                    }
                }
            }
         ).done(function(){
             console.log("Dolap " + pointsArray.length);
             $.get('models/dolap2.smf', 
             function(data) {
                var list = data.split("\n");
                for (var i = 0; i <list.length; i++) 
                {
                    var splitedline = list[i].split("\ ");
                    if (splitedline[0] === "v") {
                        Dolap[i] = new vec4(splitedline[1],splitedline[2],splitedline[3],1.0);
                    }
                    else if (splitedline[0] === "f") {
                        triangle(splitedline[1]-1,splitedline[2]-1,splitedline[3]-1,11,11);
                    }
                }
            }
         ).done(function(){
             console.log("Top " + pointsArray.length);
             $.get('models/Top.smf', 
             function(data) {
                var list = data.split("\n");
                for (var i = 0; i <list.length; i++) 
                {
                    var splitedline = list[i].split("\ ");
                    if (splitedline[0] === "v") {
                        Top[i] = new vec4(splitedline[1],splitedline[2],splitedline[3],1.0);
                    }
                    else if (splitedline[0] === "f") {
                        triangle(splitedline[1]-1,splitedline[2]-1,splitedline[3]-1,7,14);
                    }
                }
            }
         ).done(function(){
             console.log("Ground " + pointsArray.length);
             $.get('models/Ground.smf', 
             function(data) {
                var list = data.split("\n");
                for (var i = 0; i <list.length; i++) 
                {
                    var splitedline = list[i].split("\ ");
                    if (splitedline[0] === "v") {
                        Ground[i] = new vec4(splitedline[1],splitedline[2],splitedline[3],1.0);
                    }
                    else if (splitedline[0] === "f") {
                        triangle(splitedline[1]-1,splitedline[2]-1,splitedline[3]-1,11,13);
                    }
                }
            }
         ).done(function(){
             console.log("Wood " + pointsArray.length);
             $.get('models/DecorateWoods.smf', 
             function(data) {
                var list = data.split("\n");
                for (var i = 0; i <list.length; i++) 
                {
                    var splitedline = list[i].split("\ ");
                    if (splitedline[0] === "v") {
                        DecWoods[i] = new vec4(splitedline[1],splitedline[2],splitedline[3],1.0);
                    }
                    else if (splitedline[0] === "f") {
                        triangle(splitedline[1]-1,splitedline[2]-1,splitedline[3]-1,11,15);
                    }
                }
            }
         ).done(function(){
             console.log("Dolaps " + pointsArray.length);
             $.get('models/DecorateDolap.smf', 
             function(data) {
                var list = data.split("\n");
                for (var i = 0; i <list.length; i++) 
                {
                    var splitedline = list[i].split("\ ");
                    if (splitedline[0] === "v") {
                        DecDolap[i] = new vec4(splitedline[1],splitedline[2],splitedline[3],1.0);
                    }
                    else if (splitedline[0] === "f") {
                        triangle(splitedline[1]-1,splitedline[2]-1,splitedline[3]-1,11,16);
                    }
                }
            }
         ).done(function(){
             console.log("Outside " + pointsArray.length);
             $.get('models/dis.smf', 
             function(data) {
                var list = data.split("\n");
                for (var i = 0; i <list.length; i++) 
                {
                    var splitedline = list[i].split("\ ");
                    if (splitedline[0] === "v") {
                        Outside[i] = new vec4(splitedline[1],splitedline[2],splitedline[3],1.0);
                    }
                    else if (splitedline[0] === "f") {
                        triangle(splitedline[1]-1,splitedline[2]-1,splitedline[3]-1,11,17);
                    }
                }
            }
         ).done(function(){
             console.log("Lamba " + pointsArray.length);
             $.get('models/Lamb.smf', 
             function(data) {
                var list = data.split("\n");
                for (var i = 0; i <list.length; i++) 
                {
                    var splitedline = list[i].split("\ ");
                    if (splitedline[0] === "v") {
                        Lamb[i] = new vec4(splitedline[1],splitedline[2],splitedline[3],1.0);
                    }
                    else if (splitedline[0] === "f") {
                        triangle(splitedline[1]-1,splitedline[2]-1,splitedline[3]-1,2,1);
                    }
                }
            }
         ).done(function(){
             
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    
    aspect =  canvas.width/canvas.height;
    
    gl.clearColor( 0.1, 0.1, 0.1, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);
    
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    
    var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW );
    
    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );
    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW );
    
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    
    var tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoordsArray), gl.STATIC_DRAW );
    
    var vTexCoord = gl.getAttribLocation( program, "vTexCoord" );
    gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vTexCoord );
    
    imageS = document.getElementById("texImageS");
    
    
    normalMatrixLoc = gl.getUniformLocation( program, "normalMatrix" );
    
    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

    canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;

    document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
    
    window.onkeydown = function(event){
        console.log(event.keyCode);
        if(event.keyCode === 80){
            clicked = !clicked;
           
            if(clicked) {
              canvas.requestPointerLock();
              document.addEventListener("mousemove", updatePosition, false);
            }else if(!clicked){
                document.exitPointerLock = document.exitPointerLock    ||
                           document.mozExitPointerLock;

                document.exitPointerLock();
                document.removeEventListener("mousemove", updatePosition, false);
            }
            
        }
        else if(event.keyCode === 65){
            //A
            movementX(-speed);
        }
        else if(event.keyCode === 87){
            //W
           movementZ(speed);
        }
        else if(event.keyCode === 68){
            //D
            movementX(speed);
        }
        else if(event.keyCode === 83){
            //S
            movementZ(-speed);
        }
        else if(event.keyCode === 70){
            //F
            pickedlamb = !pickedlamb;
            expectedPositionLamb = vec4(expectedPositionLamb[0],3.5,expectedPositionLamb[2],1.0 ) ;
        }
        else if(event.keyCode === 69){
            //E
            if(Math.pow(sandalye[0] - eye[0],2) < 8 && Math.pow(sandalye[2] - eye[2],2)<8){
                holditem = !holditem;
                sandalye = vec4(sandalye[0],2.63,sandalye[2],1.0 ) ;
            }
            else if(Math.pow(expOtomat[0] - eye[0],2) < 16 && Math.pow(expOtomat[2] - eye[2],2)<16){
                holditem = !holditem;
                expOtomat = vec4(expOtomat[0],2,expOtomat[2],1.0 ) ;
            }
            else if(Math.pow(tablePos[0] - eye[0],2) < 16 && Math.pow(tablePos[2] - eye[2],2)<16){
                holditem = !holditem;
                tablePos = vec4(tablePos[0],2,tablePos[2],1.0 ) ;
            }
            else if(Math.pow(tablePos2[0] - eye[0],2) < 16 && Math.pow(tablePos2[2] - eye[2],2)<16){
                holditem = !holditem;
                tablePos2 = vec4(tablePos2[0],2,tablePos2[2],1.0 ) ;
            }
            else if(Math.pow(dolapPos[0] - eye[0],2) < 16 && Math.pow(dolapPos[2] - eye[2],2)<16){
                holditem = !holditem;
                dolapPos = vec4(dolapPos[0],1.5,dolapPos[2],1.0 ) ;
            }
        }
        else if(event.keyCode === 37){
            //leftarrow
            if(Math.pow(sandalye[0] - eye[0],2) < 8 && Math.pow(sandalye[2] - eye[2],2)<8 && holditem){
                sandalyeangle -= 0.1; 
            }
            else if(Math.pow(expOtomat[0] - eye[0],2) < 16 && Math.pow(expOtomat[2] - eye[2],2)<16 && holditem){
                otomatangle -= 0.1; 
            }
            else if(Math.pow(tablePos[0] - eye[0],2) < 16 && Math.pow(tablePos[2] - eye[2],2)<16 && holditem){
                tableangle -= 0.1; 
            }
            else if(Math.pow(tablePos2[0] - eye[0],2) < 16 && Math.pow(tablePos2[2] - eye[2],2)<16 && holditem){
                tableangle2 -= 0.1; 
            }
            else if(Math.pow(dolapPos[0] - eye[0],2) < 16 && Math.pow(dolapPos[2] - eye[2],2)<16 && holditem){
                dolapangle -= 0.1; 
            }
        }
        else if(event.keyCode === 39){
            //rightarrow
            if(Math.pow(sandalye[0] - eye[0],2) < 8 && Math.pow(sandalye[2] - eye[2],2)<8 && holditem){
                sandalyeangle += 0.1;
            }
            else if(Math.pow(expOtomat[0] - eye[0],2) < 16 && Math.pow(expOtomat[2] - eye[2],2)<16 && holditem){
                otomatangle += 0.1; 
            }
            else if(Math.pow(tablePos[0] - eye[0],2) < 16 && Math.pow(tablePos[2] - eye[2],2)<16 && holditem){
                tableangle += 0.1; 
            }
            else if(Math.pow(tablePos2[0] - eye[0],2) < 16 && Math.pow(tablePos2[2] - eye[2],2)<16 && holditem){
                tableangle2 += 0.1; 
            }
            else if(Math.pow(dolapPos[0] - eye[0],2) < 16 && Math.pow(dolapPos[2] - eye[2],2)<16 && holditem){
                dolapangle += 0.1; 
            }
        }
        else if(event.keyCode === 107){
            //+
            console.log(lightmiktar);
            if (lightmiktar>0) {
                lightmiktar -= 0.01;
            }
        }
        else if(event.keyCode === 109){
            //- 
            console.log(lightmiktar);
            lightmiktar += 0.01;
        }
        else if(event.keyCode === 16){
            //shift
            run = !run;
            if (run) {
                speed = 0.2;
            }
            else{
               speed=1; 
            }
        }
    };
    render();
  }
  );
  }
  );
  }
  );
  }
  );
  }
  );
  }
  );
  }
  );
  }
  );
  }
  );
  }
  );
  }
  );
  }
  );
  }
  );
  }
  );
  }
  );
  }
  );
  }
  );
  }
  );
};

var updatePosition = function(e){
    
    theta += e.movementX/1080;
    phi += e.movementY/1080;
    ileri[0] = Math.cos(-theta);
    ileri[2] = Math.sin(-theta);
    
    
    sag[0] = Math.cos(-theta-1.5708);
    sag[2] = Math.sin(-theta-1.5708);

    
    at[0] = eye[0] + ileri[0];
    at[1] = eye[1] + Math.cos(phi);
    at[2] = eye[2] + ileri[2];
    
    modelViewMatrix = lookAt(eye, at , up);  
    
};

var movementZ = function(z){
    n = normalize(subtract(eye, at));
    u = normalize(cross(up, n));
    
    eye[0] = eye[0] + ileri[0]* z;
    eye[1] = eye[1] + ileri[1]* z;
    eye[2] = eye[2] + ileri[2]* z;
    
    at[0] = at[0] + ileri[0]* z;
    at[1] = at[1] + ileri[1]* z;
    at[2] = at[2] + ileri[2]* z;
    
     modelViewMatrix = lookAt(eye, at , up);
};

var movementX = function(x){
    n = normalize(subtract(eye, at));
    u = normalize(cross(up, n));

   eye[0] = eye[0] + sag[0]* x;
    eye[1] = eye[1] + sag[1]* x;
    eye[2] = eye[2] + sag[2]* x;
    
    at[0] = at[0] + sag[0]* x;
    at[1] = at[1] + sag[1]* x;
    at[2] = at[2] + sag[2]* x;
    
     modelViewMatrix = lookAt(eye, at , up);
};

var render = function(){

    canvas.width=$(window).width();
    canvas.height=$(window).height();
    aspect = canvas.width/canvas.height;
    gl.viewport(0,0,$(window).width(),$(window).height());
    
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            
    modelViewMatrix = lookAt(eye, at , up);
    projectionMatrix = perspective(fovy, aspect, near, far);
    lightPosition = vec4(eye[0], 30, eye[2], 1.0 );
    materialDiffuse = vec4( 1, 1, 1, 1.0);
           normalMatrix = [
        vec3(modelViewMatrix[0][0], modelViewMatrix[0][1], modelViewMatrix[0][2]),
        vec3(modelViewMatrix[1][0], modelViewMatrix[1][1], modelViewMatrix[1][2]),
        vec3(modelViewMatrix[2][0], modelViewMatrix[2][1], modelViewMatrix[2][2])
    ]; 
    ambientProduct = mult(lightAmbient, materialAmbient);
    diffuseProduct = mult(lightDiffuse, materialDiffuse);
    specularProduct = mult(lightSpecular, materialSpecular);

    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );
    normalMatrixLoc = gl.getUniformLocation( program, "normalMatrix" );
    
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
       flatten(ambientProduct));
       
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
       flatten(diffuseProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"), 
       flatten(specularProduct) );	
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), 
       flatten(lightPosition) );
    
    gl.uniform1f(gl.getUniformLocation(program, 
       "shininess"),materialShininess);
       
    gl.uniform1f(gl.getUniformLocation(program, 
       "lightmiktar"),lightmiktar);
       
    configureTexture( imageS,program );
    
    if (pickedlamb) {
        expectedPositionLamb = vec4(at[0]+sag[0]+ileri[0]/2,at[1],at[2]+sag[2]+ileri[2]/2,1.0 ) ;
        lightangle = -theta-1.5708;
    }
    if (Math.pow(expectedCol1[0] - eye[0],2) < 1 && Math.pow(expectedCol1[2] - eye[2],2)<1) {
        collectable1 = false;
    }
    if (Math.pow(expectedCol2[0] - eye[0],2) < 1 && Math.pow(expectedCol2[2] - eye[2],2)<1) {
        collectable2 = false;
    }
    if (Math.pow(expectedCol3[0] - eye[0],2) < 1 && Math.pow(expectedCol3[2] - eye[2],2)<1) {
        collectable3 = false;
    }
    if (Math.pow(easterpos[0] - eye[0],2) < 1 && Math.pow(easterpos[2] - eye[2],2)<1 && easteregg) {
        easteregg = false;
        alert("Hey, Aferim Sana. Bir Easter Egg Buldun ^-^");
    }
    
    gl.uniform1f(gl.getUniformLocation(program, 
       "lightX"),expectedPositionLamb[0]);
    gl.uniform1f(gl.getUniformLocation(program, 
       "lightY"),expectedPositionLamb[1]);
    gl.uniform1f(gl.getUniformLocation(program, 
       "lightZ"),expectedPositionLamb[2]);
    gl.uniform1f(gl.getUniformLocation(program, 
       "radius"),50);
       
    gl.uniform1f(gl.getUniformLocation(program, 
       "angle"),0);
    
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedX"),0);
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedY"),0);
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedZ"),0);
       
    gl.uniformMatrix3fv(normalMatrixLoc, false, flatten(normalMatrix) );
    
    gl.drawArrays( gl.TRIANGLES, 0, 74256);//wall
    
    gl.drawArrays( gl.TRIANGLES, 92514, 25884);//top
    
    gl.drawArrays( gl.TRIANGLES, 118398, 25884);//ground
    
    gl.drawArrays( gl.TRIANGLES, 144282, 17064);//wood
    gl.drawArrays( gl.TRIANGLES, 161346, 1368);//dolaps
    gl.drawArrays( gl.TRIANGLES, 162714, 384);//dis
    
    
    if (collectable1) {
        gl.drawArrays( gl.TRIANGLES, 74256, 36);
    }
    if (collectable2) {
        gl.drawArrays( gl.TRIANGLES, 74292, 36);
    }
    if (collectable3) {
        gl.drawArrays( gl.TRIANGLES, 74328, 36);  
    }
    if(!collectable1&&!collectable2&&!collectable3){
        gl.clearColor( 0.5, 0.5, 1, 1.0 );
        gl.uniform1f(gl.getUniformLocation(program, 
       "finished"),0);
    }
    else{
        gl.uniform1f(gl.getUniformLocation(program, 
       "finished"),2);
    }
    
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedX"),expectedCol1[0]);
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedY"),expectedCol1[1]);
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedZ"),expectedCol1[2]);
    
    collectableangle +=0.08;
    
    gl.uniform1f(gl.getUniformLocation(program, 
       "angle"),collectableangle);
         
    if (collectable1) {
        
        gl.drawArrays( gl.TRIANGLES, 74364, 768);
    
    }
    
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedX"),expectedCol2[0]);
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedY"),expectedCol2[1]);
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedZ"),expectedCol2[2]);
       
    if (collectable2) {
        
        gl.drawArrays( gl.TRIANGLES, 75132, 54);
    
    }
    
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedX"),expectedCol3[0]);
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedY"),expectedCol3[1]);
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedZ"),expectedCol3[2]);
    
    if (collectable3) {
        
        gl.drawArrays( gl.TRIANGLES, 75186, 13344);
    
    }
    
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedX"),easterpos[0]);
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedY"),easterpos[1]);
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedZ"),easterpos[2]);
    
    if (easteregg) {
        
        gl.drawArrays( gl.TRIANGLES, 88530,2904 );
    
    }
    
    if(Math.pow(sandalye[0] - eye[0],2) < 10 && Math.pow(sandalye[2] - eye[2],2)<10 && holditem){
        
        sandalye = vec4(at[0]+1.5*ileri[0],2.63,at[2]+1.5*ileri[2],1.0 ) ;
    }
    
    
    gl.uniform1f(gl.getUniformLocation(program, 
       "angle"),sandalyeangle);
       
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedX"),sandalye[0]);
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedY"),sandalye[1]);
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedZ"),sandalye[2]);
    
    gl.drawArrays( gl.TRIANGLES, 91434, 288);
    
    if(Math.pow(expOtomat[0] - eye[0],2) < 16 && Math.pow(expOtomat[2] - eye[2],2)<16 && holditem){
        expOtomat = vec4(at[0]+2*ileri[0],2,at[2]+2*ileri[2],1.0 ) ;
    }
    
    gl.uniform1f(gl.getUniformLocation(program, 
       "angle"),otomatangle);
       
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedX"),expOtomat[0]);
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedY"),expOtomat[1]);
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedZ"),expOtomat[2]);
    
    gl.drawArrays( gl.TRIANGLES, 91722, 288);
    
    if(Math.pow(tablePos[0] - eye[0],2) < 16 && Math.pow(tablePos[2] - eye[2],2)<16 && holditem){
        tablePos = vec4(at[0]+2*ileri[0],2,at[2]+2*ileri[2],1.0 ) ;
    }
    
    gl.uniform1f(gl.getUniformLocation(program, 
       "angle"),tableangle);
       
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedX"),tablePos[0]);
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedY"),tablePos[1]);
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedZ"),tablePos[2]);
    
    gl.drawArrays( gl.TRIANGLES, 92010, 180);
    
    if(Math.pow(tablePos2[0] - eye[0],2) < 16 && Math.pow(tablePos2[2] - eye[2],2)<16 && holditem){
        tablePos2 = vec4(at[0]+2*ileri[0],2,at[2]+2*ileri[2],1.0 ) ;
    }
    
    gl.uniform1f(gl.getUniformLocation(program, 
       "angle"),tableangle2);
       
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedX"),tablePos2[0]);
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedY"),tablePos2[1]);
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedZ"),tablePos2[2]);
    
    gl.drawArrays( gl.TRIANGLES, 92010, 180);
    //////////////////////
    
    if(Math.pow(dolapPos[0] - eye[0],2) < 16 && Math.pow(dolapPos[2] - eye[2],2)<16 && holditem){
        dolapPos = vec4(at[0]+2*ileri[0],1.5,at[2]+2*ileri[2],1.0 ) ;
    }
    
    gl.uniform1f(gl.getUniformLocation(program, 
       "angle"),dolapangle);
       
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedX"),dolapPos[0]);
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedY"),dolapPos[1]);
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedZ"),dolapPos[2]);
    
    gl.drawArrays( gl.TRIANGLES, 92190, 324);
    /////////////////////
    
    gl.uniform1f(gl.getUniformLocation(program, 
       "angle"),lightangle);
    
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedX"),expectedPositionLamb[0]);
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedY"),expectedPositionLamb[1]);
    gl.uniform1f(gl.getUniformLocation(program, 
       "expectedZ"),expectedPositionLamb[2]);
   
    gl.drawArrays( gl.TRIANGLES, pointsArray.length-540, 540  );
    
    requestAnimFrame(render);
};

