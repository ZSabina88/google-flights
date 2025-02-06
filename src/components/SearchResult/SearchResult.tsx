import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Airport {
    id: string;
    entityId: string;
    name: string;
}

interface CityAirports {
    city: string;
    airports: Airport[];
}

interface AirportTableProps {
    data: {
        data: {
            filterStats: {
                airports: CityAirports[]
            }
        }

    }

}

const SearchResult: React.FC<AirportTableProps> = ({ data }) => {

    const airportsData = data?.data?.filterStats?.airports ?? [];
    console.log("data", airportsData);

    if (!airportsData || airportsData.length === 0) {
        return <p className='mt-10'>No airports data available</p>;
    }

    return (
        <TableContainer className='mt-10 px-16' component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>City</strong></TableCell>
                        <TableCell><strong>Airport Name</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {airportsData.map((cityData, index) =>
                        cityData.airports.map((airport, idx) => (
                            <TableRow key={`${index}-${idx}`}>
                                <TableCell>{idx === 0 ? cityData.city : ''}</TableCell>
                                <TableCell>{airport.name}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default SearchResult
    ;