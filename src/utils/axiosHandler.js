import axios from 'axios';
import get from 'lodash/get';


const axiosInstance = axios.create({
    httpsAgent: {
        rejectUnauthorized: false
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
}
);

const transformError = (error) => {
    console.log(error)
    let status = get(error, 'response.status');
    let message = get(error, 'response.data.error.message');
    let success = get(error, 'response.data.error.success');
    if (status === 401) {
        console.log('Unauthorized')
        message = message || 'Unauthorized';
        success = false
    }
    if (status === 403) {
        console.log('Forbidden')
        message = 'Forbidden';
        success = false
    }
    if (status === 404) {
        console.log('Not Found')
        message = message || 'Not Found';
        success = false
    }
    if (status === 500) {
        console.log('Internal Server Error')
        message = 'Internal Server Error';
        success = false
    }
    if (status === 503) {
        console.log('Service Unavailable')
        message = 'Service Unavailable';
        success = false
    }
    return { status, message, success };
};

axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(transformError(error));
}
);

const removeUndefinedObject = (obj) => {
    return Object.keys(obj).reduce((acc, key) => {
        if (obj[key] !== undefined) {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
};

export const getHttp = (url, params) => {
    return axiosInstance.get(url, { params })
        .then((response) => response.data)
        .catch((error) => {
            throw transformError(error);
        });
};

export const postHttp = async (url, data) => {
    try {
        const response = await axiosInstance.post(url, data);
        return response.data
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const putHttp = (url, data) => {
    axiosInstance.put(url, data).then((response) => {
        return response
    }
    ).catch((error) => {
        transformError(error)

    })
}

export const deleteHttp = (url) => {
    axiosInstance.delete(url).then((response) => {
        return response
    }
    ).catch((error) => {
        transformError(error)

    })
}



export default axiosInstance;