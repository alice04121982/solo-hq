"use client";

import { useState, useCallback } from "react";
import { Search, LocateFixed, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface LocationSearchProps {
  initialLocation?: string;
  initialRadius?: number;
  onSearch: (location: string, radius: number) => void;
  isLoading?: boolean;
}

const RADIUS_OPTIONS = [10, 25, 50, 100];

// Loose UK postcode/city validator
function isValidUKLocation(value: string): boolean {
  return value.trim().length >= 2;
}

export function LocationSearch({
  initialLocation = "",
  initialRadius = 25,
  onSearch,
  isLoading = false,
}: LocationSearchProps) {
  const [location, setLocation] = useState(initialLocation);
  const [radius, setRadius] = useState(initialRadius);
  const [error, setError] = useState<string | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!isValidUKLocation(location)) {
        setError("Please enter a UK postcode or town name.");
        return;
      }
      setError(null);
      onSearch(location.trim(), radius);
    },
    [location, radius, onSearch]
  );

  const handleGeolocate = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://api.postcodes.io/postcodes?lon=${pos.coords.longitude}&lat=${pos.coords.latitude}&limit=1`
          );
          const data = await res.json();
          if (data.result?.[0]?.postcode) {
            const pc = data.result[0].postcode as string;
            setLocation(pc);
            setError(null);
            onSearch(pc, radius);
          } else {
            setError("Could not determine your postcode. Please type it manually.");
          }
        } catch {
          setError("Could not determine your location. Please type it manually.");
        } finally {
          setGeoLoading(false);
        }
      },
      () => {
        setError("Location access denied. Please type your postcode or town.");
        setGeoLoading(false);
      }
    );
  }, [radius, onSearch]);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Location input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
          <input
            type="text"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setError(null);
            }}
            placeholder="Enter postcode or town (e.g. Cambridge, CB1)"
            className="w-full h-12 pl-10 pr-4 rounded-full border border-card-border bg-card-bg text-navy text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-lavender-dark focus:border-transparent"
          />
        </div>

        {/* Radius selector */}
        <div className="relative">
          <select
            value={radius}
            onChange={(e) => setRadius(parseInt(e.target.value, 10))}
            className="h-12 pl-4 pr-8 rounded-full border border-card-border bg-card-bg text-navy text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-lavender-dark cursor-pointer"
          >
            {RADIUS_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r} miles
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
        </div>

        {/* Geolocation */}
        <button
          type="button"
          onClick={handleGeolocate}
          disabled={geoLoading}
          title="Use my location"
          className="h-12 w-12 shrink-0 rounded-full border border-card-border bg-card-bg flex items-center justify-center text-lavender-dark hover:bg-lavender-light transition-colors disabled:opacity-50"
        >
          <LocateFixed className={`h-4 w-4 ${geoLoading ? "animate-spin" : ""}`} />
        </button>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="h-12 px-6 rounded-full bg-lime text-charcoal text-sm font-bold hover:bg-lime-dark transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {isLoading ? "Searching…" : "Find Clinics"}
        </button>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs text-red-500 pl-4"
        >
          {error}
        </motion.p>
      )}
    </form>
  );
}
