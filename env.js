const variables = {
    development: {
        //private: AIzaSyDGmkQlFOcnhX4xg8hlRBTFph4yYKAS0fE
        googleApiKey: 'AIzaSyD-ZPcMh4YKvZJSo-H2C7ESf2PEDJWlcEc'
    },
    production: {
        googleApiKey: 'xyz'
    }
};
 
const getEnvVariables = () => {
    if (__DEV__) {
        return variables.development; // return this if in development mode
    }
    return variables.production; // otherwise, return this
};
 
export default getEnvVariables; // export a reference to the function