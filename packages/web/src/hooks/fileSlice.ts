import { useState } from "react";
import HashWorker from "../workers/hash?worker";
import { getChunkArrayBuffers, sliceFile } from "common";

interface FileSlice {
  md5: string;
  data: ArrayBuffer;
  name: string;
}

export function useFileSlice(): [
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
        const chunks = sliceFile(file, 4);
        const bufs = await getChunkArrayBuffers(chunks);
        for await (const buf of bufs) {
          const hashWorker = new HashWorker();
          hashWorker.postMessage(buf);
          hashWorker.onmessage = (ev) => {
            tmpSlices.push({
              data: buf,
              md5: ev.data,
              name: file.name,
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
