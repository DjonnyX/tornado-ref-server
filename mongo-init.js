db.createUser(
    {
        user: "tornado",
        pwd: "password",
        roles:[
            {
                role: "readWrite",
                db:   "appdata"
            }
        ]
    }
);