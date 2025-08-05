import React from "react";
import clsx from "clsx";

export const DEFAULT_COLS = 4; //Sıfırlanma değeri değiştiğinde değer değişse bile önceki kaydedilen değerde sütun görünür

type ColumnCounterProps = {
  value: number;
  onChange: (v: number) => void;
  onSave?: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  resetValue?: number;
  className?: string;
};

export const ColumnCounter: React.FC<ColumnCounterProps> = ({
  value,
  onChange,
  onSave,
  min = 1,
  max = 12,
  step = 1,
  resetValue = DEFAULT_COLS,
  className,
}) => {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const dec = () => onChange(clamp(value - step));
  const inc = () => onChange(clamp(value + step));
  const reset = () => { onChange(resetValue); onSave?.(resetValue); };
  const save = () => onSave?.(clamp(value));

  return (
    <div
      className={clsx(
        "w-full max-w-sm bg-white border rounded-xl p-5 space-y-5",
        className
      )}
    >
      <div className="font-semibold text-lg mb-2">Grid Kolon Sayısı</div>

      <div className="flex items-center border rounded-lg bg-gray-50 px-2 py-1">
        <button
          type="button"
          onClick={dec}
          disabled={value <= min}
          className={clsx(
            "px-3 py-1 rounded-md border text-base font-medium",
            "bg-white hover:bg-gray-100",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          aria-label="Decrease columns"
        >
          −
        </button>
        <div
          className="flex-1 text-center select-none py-2 text-base font-semibold"
        >
          {value}
        </div>
        <button
          type="button"
          onClick={inc}
          disabled={value >= max}
          className={clsx(
            "px-3 py-1 rounded-md border text-base font-medium",
            "bg-white hover:bg-gray-100",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          aria-label="Increase columns"
        >
          +
        </button>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={reset}
          className="flex-1 bg-gray-800 hover:bg-gray-700 text-white text-sm py-2 rounded-lg transition"
        >
          Sıfırla ({resetValue})
        </button>
        <button
          type="button"
          onClick={save}
          className="flex-1 bg-gray-800 hover:bg-gray-700 text-white text-sm py-2 rounded-lg transition"
        >
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default ColumnCounter;
