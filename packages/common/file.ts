export function sliceFile(file: File, baseSize: number) {
  const chunkSize = baseSize * 1024 * 1024;
  const chunks: Blob[] = [];
  let startPos = 0;
  while (startPos < file.size) {
    chunks.push(file.slice(startPos, startPos + chunkSize));
    startPos += chunkSize;
  }
  return chunks;
}

export function getChunkArrayBuffers(chunks: Blob[]) {
  return Promise.all(chunks.map((chunk) => chunk.arrayBuffer()));
}

export function uploadFileSlices() {

}
