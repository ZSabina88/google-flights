import { useGetAllAirportsQuery } from "../../features/FlightSearchSlice";
import { ChangeEvent, useMemo, Ref } from "react";
import Airports from "../../shared/AirportList";
import useAirports from "../../hooks/useAirport";
import CityInput from "../../shared/CityInput";

const CityInputs: React.FC<{
    inputFromRef?: any,
    inputToRef?: any,
    query: { from: string, to: string },
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
    showFromDropdown: false | true,
    setShowFromDropdown: React.Dispatch<React.SetStateAction<boolean>>,
    showToDropdown: false | true,
    setShowToDropdown: React.Dispatch<React.SetStateAction<boolean>>,
    handleSetValue: (field: string, value: string) => void,
}> =
    ({ inputFromRef,
        inputToRef,
        query,
        handleChange,
        showFromDropdown,
        setShowFromDropdown,
        showToDropdown,
        setShowToDropdown,
        handleSetValue,
    }) => {
        const { data, isLoading } = useGetAllAirportsQuery();
        const airportsData = useAirports(data);

        // console.log("airports", airportsData);
        

        const filteredCitiesFrom = useMemo(() => {
            return airportsData.filter((item) => {
                return item.title.toLowerCase().includes(query.from.toLowerCase())
            })

        }, [airportsData, query.from]);

        const filteredCitiesTo = useMemo(() => {
            return airportsData.filter((item) => {
                return item.title.toLowerCase().includes(query.to.toLowerCase())
            })

        }, [airportsData, query.to]);

        return (
            <>
                <CityInput
                    inputRef={inputFromRef}
                    value={query.from}
                    label="From"
                    name="from"
                    handleChange={handleChange}
                    airports={showFromDropdown &&
                        <Airports
                            data={filteredCitiesFrom}
                            setValue={handleSetValue}
                            field="from"
                            closeDropdown={() => setShowFromDropdown(false)}
                            isLoading={isLoading}
                        />}
                />

                <CityInput
                    inputRef={inputToRef}
                    value={query.to}
                    label="To"
                    name="to"
                    handleChange={handleChange}
                    airports={showToDropdown &&
                        <Airports
                            data={filteredCitiesTo}
                            field="to"
                            setValue={handleSetValue}
                            closeDropdown={() => setShowToDropdown(false)}
                            isLoading={isLoading}
                        />}
                />
            </>
        )
    }

export default CityInputs;
