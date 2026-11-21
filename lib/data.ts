export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#facilities", label: "Facilities" },
  { href: "#games", label: "Games" },
  { href: "#booking", label: "Book" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
] as const;

export const FACILITIES = [
  {
    title: "Cricket Nets",
    description:
      "Floodlit practice nets with quality surfaces for batting and bowling sessions.",
    icon: "nets",
  },
  {
    title: "Practice Sessions",
    description:
      "Flexible hourly bookings for individuals, coaches, and academy groups.",
    icon: "practice",
  },
  {
    title: "Match Ground",
    description:
      "Well-maintained turf with clear boundaries, ideal for weekend fixtures.",
    icon: "ground",
  },
  {
    title: "Coaching Support",
    description:
      "Optional coaching slots and structured drills for all skill levels.",
    icon: "coaching",
  },
  {
    title: "Changing Rooms",
    description:
      "Clean changing areas and seating so teams can prepare comfortably.",
    icon: "rooms",
  },
  {
    title: "Equipment Hire",
    description:
      "Bats, balls, pads, and helmets available on request for practice days.",
    icon: "equipment",
  },
] as const;

export const GAMES = [
  {
    id: "cricket",
    name: "Cricket",
    pricePerHour: 2000,
    description: "Full ground hire for matches and team practice.",
  },
  {
    id: "net",
    name: "Net Practice",
    pricePerHour: 2500,
    description: "Dedicated cricket nets for batting and bowling drills.",
  },
  {
    id: "padel",
    name: "Padel",
    pricePerHour: 3000,
    description: "Book a padel court for singles or doubles sessions.",
  },
] as const;

export type GameId = (typeof GAMES)[number]["id"];

export const SESSION_LENGTHS = [1, 2, 3, 4] as const;

/** Open hours shown on the availability timeline (inclusive start) */
export const OPEN_HOUR = 7;
export const CLOSING_HOUR = 21;

/** Possible start hours (last start depends on duration) */
export const START_HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] as const;

export function formatHourAmPm(hour24: number) {
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;
  return `${hour12}:00 ${period}`;
}

export function formatTimeRange(startHour: number, durationHours: number) {
  const endHour = startHour + durationHours;
  return `${formatHourAmPm(startHour)} – ${formatHourAmPm(endHour)}`;
}

export function formatPrice(amount: number) {
  return `Rs ${amount.toLocaleString("en-PK")}`;
}

export function getGameById(id: string) {
  return GAMES.find((game) => game.id === id) ?? GAMES[0];
}

export function getDayHours() {
  return Array.from({ length: CLOSING_HOUR - OPEN_HOUR }, (_, i) => OPEN_HOUR + i);
}

export const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80",
    alt: "Cricket bat and ball on the field",
    span: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=900&q=80",
    alt: "Cricket player batting during a match",
    span: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1594470117722-de4b9a02ebed?auto=format&fit=crop&w=900&q=80",
    alt: "Cricket ground under open sky",
    span: "normal",
  },
  {
    src: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
    alt: "Stadium cricket pitch ready for play",
    span: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&w=900&q=80",
    alt: "Close-up of a cricket ball on grass",
    span: "normal",
  },
  {
    src: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&w=900&q=80",
    alt: "Cricket gloves and practice gear",
    span: "normal",
  },
] as const;

/** Deterministic demo booked hours based on date string */
export function getBookedHours(date: string): number[] {
  if (!date) return [];
  const day = Number(date.split("-")[2] || 0);
  const booked: number[] = [];
  if (day % 2 === 0) booked.push(9, 10, 17);
  if (day % 3 === 0) booked.push(11, 12, 19);
  if (day % 5 === 0) booked.push(15, 16);
  return [...new Set(booked)].sort((a, b) => a - b);
}

/** True if every hour in [start, start+duration) is free and within opening hours */
export function canBookRange(
  date: string,
  startHour: number,
  durationHours: number
) {
  if (startHour + durationHours > CLOSING_HOUR) return false;
  if (startHour < OPEN_HOUR) return false;
  const booked = new Set(getBookedHours(date));
  for (let hour = startHour; hour < startHour + durationHours; hour += 1) {
    if (booked.has(hour)) return false;
  }
  return true;
}

export function isStartUnavailable(
  date: string,
  startHour: number,
  durationHours: number
) {
  return !canBookRange(date, startHour, durationHours);
}

/** Full session windows that fit the selected duration with no booked overlap */
export function getAvailableSessions(date: string, durationHours: number) {
  return START_HOURS.filter((hour) => canBookRange(date, hour, durationHours)).map(
    (startHour) => ({
      startHour,
      endHour: startHour + durationHours,
      label: formatTimeRange(startHour, durationHours),
    })
  );
}

export const CONTACT = {
  phone: "+44 7700 900123",
  whatsapp: "447700900123",
  email: "hello@crickethub.demo",
  address: "12 Greenfield Lane, Riverside Sports Park",
  city: "Demo City, DC 10001",
  hours: [
    { day: "Mon – Fri", time: "7:00 AM – 9:00 PM" },
    { day: "Saturday", time: "8:00 AM – 8:00 PM" },
    { day: "Sunday", time: "8:00 AM – 6:00 PM" },
  ],
} as const;
