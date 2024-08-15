import { useState } from "react";
import HashWorker from "../workers/hash?worker";
import { getChunkArrayBufferInfos, sliceFile } from "common";

interface FileSlice {
  md5: string;
  data: ArrayBuffer;
  name: string;
  start: number;
  end: number;
}

export function useFileSlice(chunkSize = 4): [
  FileSlice[],
  (file: File | null) => Promise<void>,
] {
  const [slices, setSlices] = useState<FileSlice[]>([]);
  const tmpSlices: FileSlice[] = [];

  return [
    slices,
    async (file: File | null) => {
      if (!file) setSlices([]);
      else {
        tmpSlices.length = 0;
        const chunks = sliceFile(file, chunkSize);
        const bufInfos = await getChunkArrayBufferInfos(chunks);
        for await (const bufInfo of bufInfos) {
          const hashWorker = new HashWorker();
          hashWorker.postMessage(bufInfo.chunk);
          hashWorker.onmessage = (ev) => {
            tmpSlices.push({
              data: bufInfo.chunk,
              md5: ev.data,
              name: file.name,
              start: bufInfo.start,
              end: bufInfo.end,
            });

            if (tmpSlices.length === chunks.length) {
              setSlices([...tmpSlices]);
            }
          };
        }
      }
    },
  ];
}
