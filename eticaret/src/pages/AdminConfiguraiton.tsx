import { useState } from "react";
import ColumnCounter from "../components/ColumnCounter";
import { DEFAULT_COLS } from "../components/ColumnCounter"; // ortak sabiti içe aktarır

//product sütun sayısı değişimi kontorlü sayfası
const COLS_KEY = "global_cols";

const AdminConfig = () => {
  const [cols, setCols] = useState<number>(() => {
    const saved = localStorage.getItem(COLS_KEY);
    return saved ? Number(saved) : DEFAULT_COLS;
  });

  const handleSave = (v: number) => {
    localStorage.setItem(COLS_KEY, String(v));
    setCols(v);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Grid Sütun Sayısı</h2>
      <ColumnCounter value={cols} onChange={setCols} onSave={handleSave} />
    </div>
  );
};

export default AdminConfig;
