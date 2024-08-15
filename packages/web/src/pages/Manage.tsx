import { Button, Paper, Input, Alert } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { ChangeEvent, useMemo, useState } from "react";
import { useFileSlice } from "../hooks/fileSlice";

export function Manage() {
  const [slices, hashSlices] = useFileSlice();
  const [alertMessages, setAlertMessages] = useState<
    { name: string; md5: string }[]
  >([]);

  const canUpload = useMemo(() => !!slices.length, [slices]);

  function selectFile(ev: ChangeEvent<HTMLInputElement>) {
    hashSlices((ev.target as HTMLInputElement).files?.[0] ?? null);
  }

  async function upload() {
    setAlertMessages(slices.map(({ md5, name }) => ({ md5, name })));
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
      {alertMessages.map((message) => (
        <Alert variant="outlined" severity="success" key={message.md5}>
          模拟上传：{message.name} 分片 md5: {message.md5}
        </Alert>
      ))}
    </Paper>
  );
}
