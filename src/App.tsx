import { useEffect, useState } from "react";
import "./App.css";

const HEIGHT = 100;
const WIDTH = 100;

export const App = () => {
  const [grid, setGrid] = useState<number[][]>([]);
  const [generation, setGeneration] = useState(1);

  useEffect(() => {
    const rows = Array.from({ length: HEIGHT });

    const _grid = rows.map(() =>
      Array.from({ length: WIDTH }, () => Math.floor(Math.random() * 2))
    );

    setGrid(_grid);
  }, []);

  const handleClick = () => {
    const newGrid: number[][] = calculateNextGeneration(grid);

    setGrid(newGrid);
    setGeneration((prev) => prev + 1);
  };

  return (
    <>
      <div>Generation: {generation}</div>

      <div>
        <table>
          <tbody>
            {grid.map((row, i) => (
              <tr key={i}>
                {row.map((el, i) => {
                  const backgroundColor = el === 1 ? "red" : "white";

                  return (
                    <td key={i}>
                      <div className="box" style={{ backgroundColor }}>
                        {el}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "2em" }}>
        <button
          style={{
            padding: ".5em 1em",
            borderRadius: "5px",
            backgroundColor: "white",
          }}
          onClick={handleClick}
        >
          Next Generation
        </button>
      </div>
    </>
  );
};

function calculateNextGeneration(grid: number[][]): number[][] {
  let newGeneration: number[][] = [];

  // X values
  for (let row = 0; row < grid.length; row++) {
    let newRow: number[] = [];

    // Y values
    for (let column = 0; column < grid[row].length; column++) {
      const offsets = [-1, 0, 1];
      let perimeterArray = [];

      for (let offsetX = 0; offsetX < offsets.length; offsetX++) {
        const perimeterPositionX = row + offsets[offsetX];

        for (let offsetY = 0; offsetY < offsets.length; offsetY++) {
          const perimeterPositionY = column + offsets[offsetY];

          if (
            perimeterPositionX < 0 ||
            perimeterPositionY < 0 ||
            perimeterPositionX > grid.length - 1 ||
            perimeterPositionY > grid[row].length - 1
          ) {
            perimeterArray.push(0);
          } else if (
            perimeterPositionX === row &&
            perimeterPositionY === column
          ) {
            perimeterArray.push(0);
          } else {
            perimeterArray.push(grid[perimeterPositionX][perimeterPositionY]);
          }
        }
      }

      const perimeterSum = perimeterArray.reduce((a, b) => a + b);

      if (perimeterSum >= 3) {
        newRow.push(1);
      } else {
        newRow.push(0);
      }
    }

    newGeneration.push(newRow);
  }

  return newGeneration;
}
