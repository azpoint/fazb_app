"use client"; 

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SuitesFilter({ types }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedType, setSelectedType] = useState(
        searchParams.get("type") || ""
    );

    useEffect(() => {
        setSelectedType(searchParams.get("type") || "");
    }, [searchParams]);

    const handleFilterChange = (event) => {
        const newType = event.target.value;
		
        setSelectedType(newType);

        const currentParams = new URLSearchParams(
            Array.from(searchParams.entries())
        );
        if (newType) {
            currentParams.set("type", newType);
        } else {
            currentParams.delete("type");
        }
        router.push(`?${currentParams.toString()}`);
    };

    return (
        <div className="mb-8 px-2 w-1/3 mx-auto">
            <label
                htmlFor="type-filter"
                className="block text-lg font-medium text-gray-700 mb-2"
            >
                Filter by Type:
            </label>
            <select
                id="type-filter"
                value={selectedType}
                onChange={handleFilterChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            >
                <option value="">Todas</option>
                {types.map((type) => (
                    <option key={type} value={type}>
                        {type
                            .split("-")
                            .map(
                                (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                    </option>
                ))}
            </select>
        </div>
    );
}
