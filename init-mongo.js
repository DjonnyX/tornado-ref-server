Db.createUser(
    {
        user: "ts-admin",
        pwd: "63723",
        roles: [
            {
                role: "readWrite",
                db: "ticket-squid",
            }
        ],
    }
);