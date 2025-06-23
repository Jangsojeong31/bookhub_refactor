// ------------------------------------------------------------
// 📁 src/components/location/UpdateLocation.tsx
// ------------------------------------------------------------
import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { getLocationDetail, updateLocation } from "@/apis/location/location";
import { DisplayType } from "@/apis/enums/DisplayType";
import { LocationUpdateRequestDto } from "@/dtos/location/location.dto";

interface Props {
  locationId: number | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

export function UpdateLocation({ locationId, open, onClose, onSuccess }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [cookies] = useCookies(["accessToken"]);
  const [form, setForm] = useState<LocationUpdateRequestDto>({});

  useEffect(() => {
    if (open && locationId) {
      (async () => {
        const detail = await getLocationDetail(locationId, cookies.accessToken);
        setForm({
          floor: detail.floor,
          hall: detail.hall,
          section: detail.section,
          displayType: detail.type,
          note: detail.note ?? "",
        });
      })();
    }
  }, [open, locationId]);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationId) return;
    await updateLocation(locationId, form, cookies.accessToken);
    await onSuccess();
    onClose();
  };

  return (
    <dialog ref={dialogRef} onClose={onClose}>
      <h3>책 위치 수정</h3>
      <form onSubmit={submit}>
        <div>
          <label>
            층:
            <input name="floor" value={form.floor ?? ""} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            홀:
            <input name="hall" value={form.hall ?? ""} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            섹션:
            <input name="section" value={form.section ?? ""} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            진열 타입:
            <select name="displayType" value={form.displayType ?? ""} onChange={handleChange}>
              {Object.entries(DisplayType).map(([key, val]) => (
                <option key={key} value={val}>{val}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            비고:
            <input name="note" value={form.note ?? ""} onChange={handleChange} />
          </label>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <button type="button" onClick={onClose}>취소</button>
          <button type="submit">수정</button>
        </div>
      </form>
    </dialog>
  );
}