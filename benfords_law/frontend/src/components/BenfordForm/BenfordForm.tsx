import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState
} from "react";
import { BenfordStats } from "../../types";

type BenfordFormProps = {
  setStats: Dispatch<SetStateAction<BenfordStats | undefined>>;
};

export function BenfordForm({ setStats }: BenfordFormProps) {
  const [file, setFile] = useState<File>();

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file!);

    fetch("/api/benford/test_file/", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then((data: { stats: BenfordStats }) => {
        setStats(data["stats"]);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileInput} />
      <button type="submit" disabled={!file}>
        Upload
      </button>
    </form>
  );
}
