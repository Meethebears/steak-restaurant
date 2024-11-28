export default {
    development:{
        hostBackend: 'http://localhost:5000/api',
        host: 'http://localhost:3000',
        basePath:''
    },
    production:{
        hostBackend: process.env.NEXT_PUBLIC_HOST_BACKEND,
        host: process.env.NEXT_PUBLIC_HOST,
        basePath:''
    }
}[process.env.NODE_ENV || 'development']