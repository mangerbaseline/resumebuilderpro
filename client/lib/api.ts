// // import axios from 'axios';

// // const api = axios.create({
// //     baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
// //     headers: {
// //         'Content-Type': 'application/json',
// //     },
// // });

// // api.interceptors.request.use((config) => {
// //     const token = localStorage.getItem('token');
// //     if (token) {
// //         config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// // });

// // export default api;

// import axios from "axios";

// const api = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// // Request interceptor
// api.interceptors.request.use((config) => {
//     if (typeof window !== "undefined") {
//         const token = localStorage.getItem("token");

//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//     }

//     return config;
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Type-safe Request interceptor supporting Next.js Hydration and modern Axios instances
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        // ✨ FIXED: Uses type-safe object mutations to prevent interceptor silent crashes
        config.headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
