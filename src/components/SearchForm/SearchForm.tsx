import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Paper, FormControl, MenuItem, Button, Grid2 } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CityInputs from "../CityInputs/CityInputs";
import DatePickerInput from '../../shared/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import TravellerAmount from '../TravellerAmount/TravellerAmount';
import { useLazyGetFlightsQuery, useGetAllAirportsQuery } from '../../features/FlightSearchSlice';
import useAirports from '../../hooks/useAirport';
import SearchResult from '../SearchResult/SearchResult';

export interface FormData {
    from: string;
    to: string;
    travelClass: "economy" | "business" | "premium";
    startDate: Dayjs,
    endDate: Dayjs,
    traveller: number
}

const SearchForm: React.FC = () => {
    const [showFromDropdown, setShowFromDropdown] = React.useState<boolean>(false);
    const [showToDropdown, setShowToDropdown] = React.useState<boolean>(false);
    let date = dayjs();

    const [triggerGetFlights, { data: flightsData, isLoading, isError }] = useLazyGetFlightsQuery();
    const { data: airportData } = useGetAllAirportsQuery();
    const airports = useAirports(airportData);

    const formik = useFormik<FormData>({
        initialValues: {
            from: '',
            to: '',
            travelClass: 'economy',
            startDate: date,
            endDate: date,
            traveller: 1
        },
        validationSchema: Yup.object({
            from: Yup.string().required('Required'),
            to: Yup.string().required('Required'),
            travelClass: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            const formattedDate = values.startDate.format("YYYY-MM-DD");
            const formattedEndDate = values.endDate.format("YYYY-MM-DD");

            const fromAirport = airports.find(airport => airport.title === values.from);
            const toAirport = airports.find(airport => airport.title === values.to);

            if (!fromAirport || !toAirport) {
                console.error("Selected airports not found!");
                return;
            }

            const searchParams = {
                // originSkyId: fromAirport.skyId,
                destinationSkyId: toAirport.skyId,
                // originEntityId: fromAirport.entityId,
                destinationEntityId: toAirport.entityId,
                date: formattedDate,
                returnDate: formattedEndDate,
                cabinClass: values.travelClass,
                adults: values.traveller,
            };

            await triggerGetFlights(searchParams);

        },
    });
    console.log(flightsData);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        formik.setFieldValue(name, value);
        name === "from" && setShowFromDropdown(true);
        name === "to" && setShowToDropdown(true);
    };

    const handleSetValue = (field: string, value: string | Dayjs) => {
        formik.setFieldValue(field, value);
    };

    const handleDateChange = (name: 'startDate' | 'endDate', date: Dayjs | null) => {
        if (date) {
            handleSetValue(name, date);

            if (name === 'startDate' && date.isAfter(formik.values.endDate)) {
                handleSetValue('endDate', date.add(1, 'day'));
            }
        }
    };

    return (
        <>
            <Paper elevation={8} className="min-h-60 pb-6">
                <form className="p-4 flex flex-col justify-center gap-4" onSubmit={formik.handleSubmit}>
                    <FormControl className="w-30">
                        <Select
                            name="travelClass"
                            value={formik.values.travelClass}
                            onChange={handleChange}
                            sx={{
                                boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }, color: "blue",
                                '.MuiSvgIcon-root ': {
                                    fill: "blue",
                                }
                            }}
                        >
                            <MenuItem value={"economy"}>Economy</MenuItem>
                            <MenuItem value={"business"}>Business</MenuItem>
                            <MenuItem value={"premium"}>Premium</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid2 container spacing={2}>
                        <CityInputs
                            query={formik.values}
                            handleChange={handleChange}
                            handleSetValue={handleSetValue}
                            showFromDropdown={showFromDropdown}
                            showToDropdown={showToDropdown}
                            setShowFromDropdown={setShowFromDropdown}
                            setShowToDropdown={setShowToDropdown}
                            inputFromRef={formik.getFieldProps('from')}
                            inputToRef={formik.getFieldProps('to')}
                        />
                        <Grid2 size={{ lg: 2, md: 4, sm: 12, xs: 12 }}>
                            <DatePickerInput
                                name="startDate"
                                value={formik.values.startDate}
                                // onChange={handleDateChange}
                                onChange={(date) => handleDateChange('startDate', date)}
                                label='Start Date'
                            />
                        </Grid2>
                        <Grid2 size={{ lg: 2, md: 4, sm: 12, xs: 12 }}>
                            <DatePickerInput
                                name="endDate"
                                value={formik.values.endDate}
                                // onChange={handleDateChange}
                                onChange={(date) => handleDateChange('endDate', date)}
                                label='End Date'
                            />
                        </Grid2>
                        <Grid2 size={{ lg: 1, md: 4, sm: 12, xs: 12 }}>
                            <TravellerAmount
                                traveller={formik.values.traveller}
                                setTraveller={(value: number) => formik.setFieldValue("traveller", value)}
                            />
                        </Grid2>
                        <Grid2 size={{ lg: 1, md: 12, sm: 12, xs: 12 }}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Button variant="contained" type="submit"
                                sx={{ backgroundColor: "#ffb600", height: "55px", width: { xs: "100%", sm: "100%", md: "40%", lg: "100%" }, }}>
                                <p className="text-black text-md uppercase">
                                    <strong>Search Flights</strong>
                                </p>
                            </Button>
                        </Grid2>
                    </Grid2>
                </form>
            </Paper>
            {isLoading ? (
                <p className='mt-10 text-xl'>Loading...</p>
            ) : isError ? (
                <p className='mt-10'>Error fetching data. Please try again.</p>
            ) : (
                <SearchResult data={flightsData} />
            )}
        </>
    );
};

export default SearchForm;