"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LeadFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");

  const updateFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (search) params.set("search", search);
    else params.delete("search");
    
    if (status) params.set("status", status);
    else params.delete("status");
    
    // Reset to page 1 on filter change
    params.delete("page");
    
    router.push(`?${params.toString()}`);
  }, [search, status, router, searchParams]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") updateFilters();
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Input 
          type="text" 
          placeholder="Search by name or email..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="w-full sm:w-48">
        <select 
          className="w-full h-10 px-3 py-2 border border-[var(--line)] bg-white text-sm"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            // We want to update immediately on select change, so let's call router.push directly here
            const params = new URLSearchParams(searchParams.toString());
            if (e.target.value) params.set("status", e.target.value);
            else params.delete("status");
            params.delete("page");
            router.push(`?${params.toString()}`);
          }}
        >
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="reviewing">Reviewing</option>
          <option value="assigned">Assigned</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <Button onClick={updateFilters} className="bg-sentinel-navy hover:bg-sentinel-navy/90 text-white">
        Filter
      </Button>
    </div>
  );
}
