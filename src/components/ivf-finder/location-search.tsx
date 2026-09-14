"use client";

import { useEffect, useId, useRef, useState } from "react";
import { LocateFixed, MapPin, Search, X } from "lucide-react";
import { locationForPlace, searchPlaces, type FinderLocation, type Place } from "@/lib/geo";

interface LocationSearchProps {
  value: FinderLocation | null;
  onChange: (location: FinderLocation | null) => void;
}

const DEVICE_LABEL = "your location";

/**
 * "Where are you?" for the clinic finder: a place or postcode, or the
 * device's own position. Setting one puts the nearest clinics first and lets
 * the "Within" filter narrow by distance; the rest of the world stays in the
 * list below them, the way a hotel search shows the city you asked for and
 * everything further out after it.
 *
 * Suggestions come from the built-in gazetteer in src/lib/geo.ts and the
 * device position from the browser's own geolocation prompt. Neither leaves
 * the page: nothing typed or located here is sent to this site or anyone
 * else, which is what the privacy policy promises for the finder.
 *
 * A combobox in the ARIA sense: the input owns a listbox of suggestions,
 * arrow keys move through them, Enter picks, Escape closes.
 */
export function LocationSearch({ value, onChange }: LocationSearchProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const errorId = useId();

  const suggestions = open ? searchPlaces(query) : [];
  const showNoMatch = open && query.trim().length >= 2 && suggestions.length === 0;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const choose = (place: Place) => {
    onChange(locationForPlace(place));
    setQuery("");
    setOpen(false);
    setActiveIndex(-1);
    setError(null);
  };

  const clear = () => {
    onChange(null);
    setQuery("");
    setError(null);
    inputRef.current?.focus();
  };

  const useDevice = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setError("Your browser cannot share its location. Type a town or postcode instead.");
      return;
    }
    setLocating(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        onChange({
          label: DEVICE_LABEL,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          source: "device",
        });
        setQuery("");
        setOpen(false);
      },
      (err) => {
        setLocating(false);
        setError(
          err.code === err.PERMISSION_DENIED
            ? "Location is blocked for this site. Type a town or postcode instead."
            : "Your location could not be found. Type a town or postcode instead."
        );
      },
      { maximumAge: 5 * 60 * 1000, timeout: 10_000 }
    );
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      const pick = suggestions[activeIndex] ?? (suggestions.length === 1 ? suggestions[0] : null);
      if (pick) {
        e.preventDefault();
        choose(pick);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  // The set location replaces the input: one control, one state, no
  // "Cambridge" typed above a pill that also says Cambridge.
  if (value) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-teal text-on-teal pl-4 pr-2 py-2 text-sm font-medium">
          <MapPin className="h-4 w-4" aria-hidden />
          {value.source === "device" ? "Near you" : `Near ${value.label}`}
          <button
            type="button"
            onClick={clear}
            aria-label="Clear location"
            className="ml-1 p-1 rounded-full hover:bg-white/15 transition-colors"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </span>
        <span className="text-xs text-muted">
          Nearest first. Clinics further away, including abroad, follow in the same list.
        </span>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted"
            aria-hidden
          />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-label="Where are you? Town, city or UK postcode"
            aria-expanded={open && (suggestions.length > 0 || showNoMatch)}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
            aria-describedby={error ? errorId : undefined}
            autoComplete="off"
            spellCheck={false}
            placeholder="Where are you? Town, city or UK postcode"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setActiveIndex(-1);
              setError(null);
            }}
            onFocus={() => query && setOpen(true)}
            onKeyDown={onKeyDown}
            className="w-full h-11 rounded-full border border-teal/20 bg-background pl-11 pr-4 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-teal"
          />
        </div>
        <button
          type="button"
          onClick={useDevice}
          disabled={locating}
          className="inline-flex items-center justify-center gap-2 h-11 rounded-full border border-teal/20 bg-background px-4 text-sm font-medium text-teal transition-colors hover:bg-surface-hover disabled:opacity-60"
        >
          <LocateFixed className={`h-4 w-4 ${locating ? "animate-pulse" : ""}`} aria-hidden />
          {locating ? "Finding you…" : "Use my location"}
        </button>
      </div>

      {open && (suggestions.length > 0 || showNoMatch) && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Matching places"
          className="absolute left-0 right-0 sm:right-auto sm:w-[26rem] top-full mt-2 z-30 rounded-2xl bg-background border border-border p-2"
        >
          {suggestions.map((place, i) => (
            <li
              key={`${place.name}-${place.country}`}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === activeIndex}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(place)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm cursor-pointer ${
                i === activeIndex ? "bg-surface-hover" : ""
              }`}
            >
              <MapPin className="h-4 w-4 text-muted shrink-0" aria-hidden />
              <span className="text-foreground">{place.name}</span>
              <span className="text-xs text-muted">{place.country}</span>
            </li>
          ))}
          {showNoMatch && (
            <li className="px-3 py-2 text-xs text-muted" role="option" aria-selected={false}>
              No place by that name in our list. Try the nearest large town, a UK postcode, or
              &ldquo;Use my location&rdquo;.
            </li>
          )}
        </ul>
      )}

      {error && (
        <p id={errorId} role="alert" className="mt-2 text-xs text-muted">
          {error}
        </p>
      )}
    </div>
  );
}
