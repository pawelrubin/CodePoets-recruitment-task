import { Loading } from "components/Loading";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";
import { BenfordStats } from "types";

import { Error } from "./elements";

type BenfordFormProps = {
  setStats: Dispatch<SetStateAction<BenfordStats | undefined>>;
};

export function BenfordForm({ setStats }: BenfordFormProps) {
  const [file, setFile] = useState<File>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file!);

    setLoading(true);
    fetch("/api/benford/test_file/", {
      method: "POST",
      body: formData,
    })
      .then(async (res) => ({ status: res.status, ...(await res.json()) }))
      .then((data) => {
        if (data.status === 200) {
          setStats(data.stats);
          setError(null);
        } else {
          setError(data.detail);
        }
      })
      .catch(() => setError("Fatal error occurred."))
      .finally(() => setLoading(false));
  };

  return loading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileInput} />
      <button type="submit" disabled={!file}>
        Upload
      </button>
      {error && <Error>{error}</Error>}
    </form>
  );
}
