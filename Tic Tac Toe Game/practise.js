const a = [1, 2, 3, 4];
const b = [1, 4, 2, 3];
const c = [1, 2, 3, 4, 4, 2];

const arr = [
  ["1", "2", "3"],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  ["2", "5", "8"],
  [3, 6, 9],
  ["1", "5", "9"],
  [3, 5, 7],
];

// arraysEqual(a,b)
arraysEqual2(arr, a);

function arraysEqual(arr1, arr2) {
  const set1 = new Set(Array.from(arr1, (number) => Number(number)));
  const set2 = new Set(
    Array,
    from(arr2, (number) => number(number))
  );

  if (set1.size !== set2.size) console.log(false);

  console.log([...set1].every((value) => set2.has(value)));
}

function arraysEqual2(bigarr, smallarr) {
  const set2 = new Set(smallarr);

  bigarr.forEach((element) => {
    const set1 = new Set(element);

    if ([...set1].every((value) => set2.has(value))) {
      console.log(true);
    } else {
      return;
    }
  });
}
