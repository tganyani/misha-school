export function stringToColor(string: string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  


  export function groupIntoChunks(array: any, chunkSize: any) {
    const output: any = [];
    let currentChunk: any = [];
  
    array.forEach((item: any, index: any) => {
      currentChunk.push(item);
  
      if ((index + 1) % chunkSize === 0 || index === array.length - 1) {
        output.push(currentChunk);
        currentChunk = [];
      }
    });
  
    return output;
  }



