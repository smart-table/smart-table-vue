export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function defaultTableState() {
    return {
        sort: {},
        slice: {page: 1},
        filter: {},
        search: {},
    };
};
