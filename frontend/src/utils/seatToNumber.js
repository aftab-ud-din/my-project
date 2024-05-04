const convertToLinearIndices = (seats,col) => {
    const colsPerRow = col; // Assume a fixed number of columns per row
    return seats.map(seat => {
        const parts = seat.split('-');
        const row = parseInt(parts[0]);
        const col = parseInt(parts[1]);
        return (row - 1) * colsPerRow + (col - 1)+1; // Calculate linear index
    });
}

// Example array of seat identifiers (all from the first row)


export default convertToLinearIndices;