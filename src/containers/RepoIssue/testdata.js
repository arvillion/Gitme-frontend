export const mdRaw = `
\`\`\`js
 function handleNextClick() {
    setIndex(index + 1000);
  }
\`\`\`
should be
\`\`\`js
  function handleNextClick() {
    setIndex(index + 1);
  }
\`\`\`
![](https://user-images.githubusercontent.com/6629474/198649345-6090ee63-ee85-42e1-9fd7-8f67d3d18c9b.jpg)
`