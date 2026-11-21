"use client";

import { useState } from "react";
import { GameId } from "@/lib/data";
import Games from "./Games";
import Booking from "./Booking";

export default function BookingExperience() {
  const [selectedGameId, setSelectedGameId] = useState<GameId>("cricket");

  return (
    <>
      <Games selectedGameId={selectedGameId} onSelect={setSelectedGameId} />
      <Booking selectedGameId={selectedGameId} onGameChange={setSelectedGameId} />
    </>
  );
}
