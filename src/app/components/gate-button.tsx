"use client";
import RoundButton from "./round-button";

export function GateButton({ name, gate_id }: { name: string; gate_id: string; }) {
  const action = async () => {
    const res = await fetch(`/api/gate/${gate_id}`, { method: "POST" });
    if (!res.ok) {
      throw res;
    }
  };

  return RoundButton({ title: name, action });
}
