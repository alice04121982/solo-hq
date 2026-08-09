"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, LocateFixed } from "lucide-react";

interface HomeLocationSearchProps {
  onDark?: boolean;
}

export function HomeLocationSearch({ onDark = false }: HomeLocationSearchProps) {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);

  const submit = useCallback(
    (loc: string) => {
      if (!loc.trim() || loc.trim().length < 2) {
        setError("Please enter a UK postcode or town name.");
        return;
      }
      setError(null);
      router.push(`/ivf-finder?location=${encodeURIComponent(loc.trim())}`);
    },
    [router]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(location);
  };

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
          const pc = data.result?.[0]?.postcode as string | undefined;
          if (pc) {
            setLocation(pc);
            setError(null);
            submit(pc);
          } else {
            setError("Could not determine your postcode. Please type it manually.");
          }
        } catch {
          setError("Could not determine your location. Please type your postcode.");
        } finally {
          setGeoLoading(false);
        }
      },
      () => {
        setError("Location access denied. Please type your postcode or town.");
        setGeoLoading(false);
      }
    );
  }, [submit]);

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div
          className="flex items-stretch gap-0 rounded-full overflow-hidden shadow-sm transition-colors"
          style={{
            border: onDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(26,8,16,0.25)",
            background: "#FFFFFF",
          }}
        >
          {/* Location input */}
          <div className="relative flex-1 flex items-center">
            <Search className="absolute left-5 h-4 w-4 text-muted pointer-events-none" />
            <input
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setError(null);
              }}
              placeholder="Postcode or town, e.g. London, CB1, M1"
              className="w-full h-14 pl-12 pr-4 bg-transparent text-foreground text-sm placeholder:text-muted focus:outline-none font-sans"
            />
          </div>

          {/* Geolocation */}
          <button
            type="button"
            onClick={handleGeolocate}
            disabled={geoLoading}
            title="Use my location"
            className="h-14 w-14 flex items-center justify-center text-muted hover:text-foreground transition-colors border-l border-foreground/10 shrink-0 disabled:opacity-40"
          >
            <LocateFixed className={`h-4 w-4 ${geoLoading ? "animate-spin" : ""}`} />
          </button>

          {/* Submit */}
          <button
            type="submit"
            className="h-14 px-7 bg-accent text-[#1A3A25] text-sm font-sans font-medium hover:bg-accent-dark transition-colors shrink-0"
          >
            Find Clinics
          </button>
        </div>
      </form>

      {error && (
        <p className="mt-3 text-xs font-sans text-muted pl-5">{error}</p>
      )}
    </div>
  );
}
