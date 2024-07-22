const config = {
    baseApiUrl: "https://localhost:7001/api/v1"
}

const numberFormatter = Intl.NumberFormat("en-US", {
    currency: 'GBP',
    notation: 'compact',
    maximumFractionDigits: 0
});

export default config;
export { numberFormatter };