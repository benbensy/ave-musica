import { Button, Paper, Input } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { ChangeEvent, useMemo } from "react";
import { useFileSlice } from "../hooks/fileSlice";

export default function Manage() {
  const [slices, hashSlices] = useFileSlice();

  const canUpload = useMemo(() => !!slices.length, [slices]);

  function selectFile(ev: ChangeEvent<HTMLInputElement>) {
    const file = (ev.target as HTMLInputElement).files?.[0];
    if (file) {
      if (file.size < 1024 * 1024 * 100) {
        hashSlices(file);
      }
    } else {
      hashSlices(null);
    }
  }

  async function upload() {
    Promise.all(
      slices.map(async (slice) => {
        const formData = new FormData();
        formData.append("file", new File([slice.data], slice.name));
        formData.append("md5", slice.md5);

        await fetch("http://localhost:3000/music/upload", {
          method: "POST",
          body: formData,
          headers: {
            Range: `bytes=${slice.start}-${slice.end}`,
          },
        });
      }),
    );
  }

  return (
    <Paper>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUpload />}
        sx={{ textTransform: "unset" }}
      >
        {slices.length ? slices[0].name : "选择文件"}
        <Input sx={{ display: "none" }} type="file" onChange={selectFile} />
      </Button>
      <Button disabled={!canUpload} onClick={upload}>
        上传
      </Button>
    </Paper>
  );
}
