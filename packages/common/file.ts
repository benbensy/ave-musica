export function sliceFile(file: File, baseSize: number) {
  const chunkSize = baseSize * 1024 * 1024;
  const chunkInfos: { chunk: Blob; start: number; end: number }[] = [];
  let startPos = 0;
  while (startPos < file.size) {
    const chunk = file.slice(startPos, startPos + chunkSize);
    chunkInfos.push({
      chunk,
      start: startPos,
      end: startPos + chunk.size,
    });
    startPos += chunkSize;
  }
  return chunkInfos;
}

export function getChunkArrayBufferInfos(
  chunkInfos: { chunk: Blob; start: number; end: number }[],
) {
  return Promise.all(
    chunkInfos.map(async (info) => ({
      ...info,
      chunk: await info.chunk.arrayBuffer(),
    })),
  );
}

export function uploadFileSlices() {}
