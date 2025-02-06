import FlightIcon from '@mui/icons-material/Flight';

const Airports: React.FC<{
    data: any,
    field: string,
    setValue: (field: string, value: string) => void,
    closeDropdown: () => void;
    isLoading: boolean;
}> =
    ({ data, setValue, field, closeDropdown, isLoading }) => {
        if (data.length === 0) return null;
        return (
            <div className='w-100 min-h-60 border-1 border-slate-200 rounded-lg p-4 bg-white absolute z-2'>
                {isLoading ? (
                    <div className="p-2 text-gray-500">Loading...</div>
                ) : (
                    Array.isArray(data) && (
                        data.map((airport: any, index: number) => (
                            <ul >
                                <li key={index} className='flex flex-row gap-2 mb-2 items-center hover:bg-orange-300 cursor-pointer hover:font-bold'
                                    onClick={() => {
                                        setValue(field, airport.title);
                                        closeDropdown();
                                    }}>
                                    <FlightIcon fontSize="medium" sx={{ width: "20px", height: "20px" }} className="transform rotate-90" />
                                    <p>{airport.title}</p>
                                </li>
                            </ul>
                        ))
                    )
                )

                }
            </div>
        )
    }

export default Airports;
