import p5, { Color, Element, MediaElement, Renderer } from "p5";
let cnv: Renderer;
const parent: HTMLDivElement = document.querySelector("div#parent")!;

const sketch = (p5: p5) => {
  let mainVid: any;
  let pixels: Array<number>;
  let gridSize = 40;
  let slider: any;
  let xaxis: number = 0.1;
  let yaxis: number = 0.5;
  let chaos: Boolean = false;
  let chaosBtn: any;
  let auraBtn: any;
  let aura: Boolean = false;
  type FixedNumberArray<Type, Length extends number> = [Type, ...Type[]] & {
    length: Length;
  };

  class Node {
    color: p5.Color;
    x: number;
    y: number;
    width: number;
    height: number;
    noise: number[];
    chaos: Boolean;
    coordinates: {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      x3: number;
      y3: number;
      x4: number;
      y4: number;
    };
    constructor(
      x: number,
      y: number,
      width: number,
      height: number,
      color: Color,
      noise: number[],
      chaos: Boolean
    ) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.noise = noise;
      this.chaos = chaos;
    }

    setCoordinates(vale: FixedNumberArray<number, 8>) {
      let counter = 0;
      let randVal: number;
      let vals = vale.map((el) => {
        if (counter % 17 === 0) randVal = p5.random(10);
        counter++;
        return (el += randVal);
      });
      this.coordinates = {
        x1: vals[0],
        y1: vals[1],
        x2: vals[2],
        y2: vals[3],
        x3: vals[4],
        y3: vals[5],
        x4: vals[6],
        y4: vals[7],
      };
    }

    show() {
      p5.fill(this.color);
      if (this.chaos) {
        switch (p5.int(p5.random(4)) + 1) {
          case 1:
            {
              this.setCoordinates([
                this.x,
                this.y + this.height,
                this.noise[0],
                this.noise[1],
                this.x + this.width,
                this.y + this.height,
                this.x + this.width,
                this.y,
              ]);
            }
            break;
          case 2:
            {
              this.setCoordinates([
                this.y + this.height,
                this.x + this.width,
                this.y + this.height,
                this.x + this.width,
                this.noise[0],
                this.noise[1],
                this.x,
                this.y,
              ]);
            }
            break;
          case 3:
            {
              this.setCoordinates([
                this.y + this.height,
                this.x + this.width,
                this.y + this.height,
                this.x + this.width,
                this.y,
                this.x,
                this.noise[0],
                this.noise[1],
              ]);
            }
            break;
          case 4:
            this.setCoordinates([
              this.noise[0],
              this.noise[1],
              this.x,
              this.y + this.height,
              this.x + this.width,
              this.y + this.height,
              this.x + this.width,
              this.y,
            ]);
            break;
        }
      } else {
        this.setCoordinates([
          this.noise[0],
          this.noise[1],
          this.x,
          this.y + this.height,
          this.x + this.width,
          this.y + this.height,
          this.x + this.width,
          this.y,
        ]);
      }
      p5.quad(
        this.coordinates.x1,
        this.coordinates.y1,
        this.coordinates.x2,
        this.coordinates.y2,
        this.coordinates.x3,
        this.coordinates.y3,
        this.coordinates.x4,
        this.coordinates.y4
      );
    }
  }
  p5.preload = () => {};
  p5.setup = () => {
    cnv = p5.createCanvas(window.innerWidth, window.innerHeight - 50);
    mainVid = p5.createVideo("sample-5s.mp4");
    mainVid.hide();
    mainVid.volume(0);
    mainVid.loop();
    slider = p5.createSlider(10, 140, 40, 1);
    chaosBtn = p5.createButton("chaos").mouseClicked(() => {
      chaos = !chaos;
    });
    auraBtn = p5.createButton("Aura").mouseClicked(() => {
      aura = !aura;
    });
  };
  p5.draw = () => {
    if (aura) {
      p5.background(0);
      p5.blendMode(p5.ADD);
    } else {
      p5.background(0, 0, 0, 20);
      p5.blendMode(p5.NORMAL);
    }
    if (mainVid) {
      mainVid.loadPixels();
      gridSize = slider.value();
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          xaxis += 0.00001;
          yaxis += 0.00001;
          let x1 = p5.noise(xaxis) * p5.width;
          let y1 = p5.noise(yaxis) * p5.height;
          p5.noStroke();
          let x = p5.int((i * p5.width) / gridSize);
          let y = p5.int((j * p5.height) / gridSize);
          let index = (y * mainVid.width + x) * 4;
          new Node(
            x,
            y,
            mainVid.width / gridSize,
            mainVid.height / gridSize,
            p5.color(
              mainVid.pixels[index],
              mainVid.pixels[index + 1],
              mainVid.pixels[index + 2],
              aura ? 1 : 200
            ),
            [x1, y1],
            chaos
          ).show();
        }
      }
    }
  };
  p5.windowResized = () => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight - 50);
  };
};

new p5(sketch, parent);
