
import { useState, useEffect } from 'react';

export interface Airport {
    skyId: string;
    entityId: string;
    presentation: {
        title: string;
    };
}

export interface AirportData {
    skyId: string;
    entityId: string;
    title: string;
}

const useAirports = (data: { data: Airport[] } | undefined): AirportData[] => {
    const [airports, setAirports] = useState<AirportData[]>([]);

    useEffect(() => {
        if (data?.data) {
            const newAirports = data.data.map(({ skyId, entityId, presentation }) => ({
                skyId,
                entityId,
                title: presentation.title
            }));
            setAirports(newAirports);
        }
    }, [data]);

    return airports;
};

export default useAirports;