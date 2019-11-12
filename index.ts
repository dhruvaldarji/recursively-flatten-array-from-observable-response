import { of } from 'rxjs'; 
import { map, tap } from 'rxjs/operators';

const nestedList = [
  {
    id: 1, 
    children: [
      {
        id: 2, 
        children: [
          {
            id: 5, 
            children: [
              
            ]
          },
          {
            id: 6, 
            children: [
              
            ]
          }
        ]
      },
      {
        id: 3, 
        children: [
          
        ]
      },
      {
        id: 4, 
        children: [
          
        ]
      }
    ]
  }
];

const source = of(nestedList).pipe(
  map(x => recursiveFlatten(x)),
);

source.subscribe(x => console.log(x));

function recursiveFlatten(arr) {
  if (!arr.length) return arr;
  const list = [];
  arr.forEach((i) => {
    list.push(i);
    if (i.children) {
      list.push(...recursiveFlatten(i.children));
      delete i.children;
    }
  });
  return list || [];
}