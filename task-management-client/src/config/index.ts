export const config = () => {
    let emailValidator: any;
    let BASE_URL: any;

    BASE_URL = 'http://localhost:8080/' ||process.env.REACT_APP_API_URL;

    return {
        BASE_URL, 
        emailValidator,
    };
};
