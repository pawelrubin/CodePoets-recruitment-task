import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";
import { DigitsStats } from "../../types";

type BenfordFormProps = {
  setStats: Dispatch<SetStateAction<DigitsStats>>;
};

export function BenfordForm({ setStats }: BenfordFormProps) {
  const [file, setFile] = useState<File>();
  const [column, setColumn] = useState<string>();

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleColumnInput = (e: ChangeEvent<HTMLInputElement>) =>
    setColumn(e.target.value);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file!);
    formData.append("column", column!);

    fetch("/api/benford/test_file/", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStats(data["stats"]);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>File Upload</h1>
      <input type="file" onChange={handleFileInput} />
      <input type="text" onChange={handleColumnInput} />
      <button type="submit" disabled={column === undefined || file === undefined}>
        Upload
      </button>
    </form>
  );
}
