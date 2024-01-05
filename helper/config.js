const config = {
    port: 5556,
    data_source: {
        user: "root",
        databse: "test",
        options: {
            socketTimeoutMS: 0,
            connectTimeoutMS: 0,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    },
}

module.exports = config;